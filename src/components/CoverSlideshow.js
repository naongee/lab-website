'use client';

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AUTO_SLIDE_MS = 5000;
const FADE_MS = 500;

export default function CoverSlideshow({ covers }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const router = useRouter();
  const fadeTimerRef = useRef(null);

  const total = covers?.length || 0;

  const go = useCallback(
    (next) => {
      if (!covers || total === 0 || fading) return;

      setFading(true);

      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        setCurrent((next + total) % total);

        requestAnimationFrame(() => {
          setFading(false);
        });
      }, FADE_MS);
    },
    [covers, total, fading]
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
      go(current + 1);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [covers, current, go]);

  // 타이머 정리
  useEffect(() => {
    return () => {
      clearTimeout(fadeTimerRef.current);
    };
  }, []);

  if (!covers || covers.length === 0) return null;

  const cover = covers[current];

  const handleClick = () => {
    if (cover.pubId) {
      router.push(`/publications?highlight=${cover.pubId}`);
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
              zIndex: 2,
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

        {/* Image */}
        <div
          onClick={handleClick}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            background: "var(--bg-alt)",
            cursor: cover.pubId ? "pointer" : "default",
          }}
        >
          <Image
            key={cover.image}
            src={cover.image}
            alt={cover.journal || "Research highlight"}
            fill
            sizes="(max-width: 820px) 100vw, 400px"
            style={{
              objectFit: "contain",
              padding: "8px",
              opacity: fading ? 0 : 1,
              transform: fading ? "scale(0.985)" : "scale(1)",
              transition: `opacity ${FADE_MS}ms ease-in-out, transform ${FADE_MS}ms ease-in-out`,
            }}
          />
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
              zIndex: 2,
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
          opacity: fading ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
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
