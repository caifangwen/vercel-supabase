import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      product_id,
      name,
      email,
      company,
      country,
      phone,
      quantity,
      message,
    } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data: inquiry, error: insertError } = await supabase
      .from("inquiries")
      .insert({
        product_id: product_id || null,
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || null,
        country: country?.trim() || null,
        phone: phone?.trim() || null,
        quantity: quantity?.trim() || null,
        message: message?.trim() || null,
        status: "new",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Inquiry insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    if (adminEmail && resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "B2B Inquiry <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Inquiry${product_id ? " (Product)" : ""} - ${name}`,
        html: `
          <h2>New inquiry received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${country ? `<p><strong>Country:</strong> ${country}</p>` : ""}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${quantity ? `<p><strong>Quantity:</strong> ${quantity}</p>` : ""}
          ${product_id ? `<p><strong>Product ID:</strong> ${product_id}</p>` : ""}
          ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
        `,
      }).catch((err) => console.error("Resend error:", err));
    }

    return NextResponse.json({ success: true, id: inquiry?.id });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
