import { createClient } from "@supabase/supabase-js";

/**
 * 服务端专用：使用 SERVICE_ROLE_KEY 绕过 RLS，用于写入 inquiries 等
 * 仅在 API Routes / Server Actions 中使用，不要暴露到客户端
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL");
  return createClient(url, key);
}
