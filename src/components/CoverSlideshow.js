'use client';

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AUTO_SLIDE_MS = 5000;

export default function CoverSlideshow({ covers }) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const total = covers?.length || 0;

  const go = useCallback(
    (next) => {
      if (!covers || total === 0) return;
      setCurrent((next + total) % total);
    },
    [covers, total]
  );

  // 이미지 미리 로딩해서 넘어갈 때 버벅임 줄이기
  useEffect(() => {
    if (!covers || covers.length === 0) return;

    covers.forEach((cover) => {
      if (cover.image) {
        const img = new window.Image();
        img.src = cover.image;
      }
    });
  }, [covers]);

  // 자동 슬라이드
  useEffect(() => {
    if (!covers || covers.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % covers.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [covers]);

  if (!covers || covers.length === 0) return null;

  const cover = covers[current];

  const handleClick = (clickedCover) => {
    if (clickedCover.pubId) {
      router.push(`/publications?highlight=${clickedCover.pubId}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* Main image + arrows */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Prev */}
        {covers.length > 1 && (
          <button
            onClick={() => go(current - 1)}
            style={{
              position: "absolute",
              left: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "var(--text)",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
              transition: "background 0.18s",
            }}
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {/* Slide viewport */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            background: "var(--bg-alt)",
          }}
        >
          {/* Slide track */}
          <div
            style={{
              display: "flex",
              width: `${covers.length * 100}%`,
              height: "100%",
              transform: `translateX(-${current * (100 / covers.length)}%)`,
              transition: "transform 0.55s ease-in-out",
            }}
          >
            {covers.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                style={{
                  position: "relative",
                  width: `${100 / covers.length}%`,
                  height: "100%",
                  flex: "0 0 auto",
                  cursor: item.pubId ? "pointer" : "default",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.journal || "Research highlight"}
                  fill
                  sizes="(max-width: 820px) 100vw, 400px"
                  style={{
                    objectFit: "contain",
                    padding: "8px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        {covers.length > 1 && (
          <button
            onClick={() => go(current + 1)}
            style={{
              position: "absolute",
              right: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "var(--text)",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
              transition: "background 0.18s",
            }}
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>

      {/* Journal label */}
      <p
        style={{
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        {cover.journal}
      </p>

      {/* Dots */}
      {covers.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "6px",
          }}
        >
          {covers.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === current ? "20px" : "7px",
                height: "7px",
                borderRadius: "4px",
                border: "none",
                background: i === current ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s, background 0.3s",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
