"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23e2e8f0'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E";

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const list = images.length > 0 ? images : [PLACEHOLDER];
  const mainSrc = list[activeIndex];
  const isDataUrl = mainSrc.startsWith("data:");

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--muted)]">
        {isDataUrl ? (
          <img
            src={mainSrc}
            alt={alt}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={mainSrc}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {list.map((src, i) => {
            const isData = src.startsWith("data:");
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                  activeIndex === i ? "border-[var(--accent)]" : "border-[var(--border)] hover:border-[var(--primary)]"
                }`}
              >
                {isData ? (
                  <img src={src} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="relative block h-full w-full">
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
