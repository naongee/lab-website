'use client';

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function renderAuthors(authorsStr, piName) {
  if (!piName) return authorsStr;

  const tokens = authorsStr.split(", ");

  return tokens.map((token, i) => (
    <span key={i}>
      {token.startsWith(piName) ? (
        <strong>
          <u>{token}</u>
        </strong>
      ) : (
        token
      )}
      {i < tokens.length - 1 ? ", " : ""}
    </span>
  ));
}

export default function PublicationsClient({ googleScholar, covers, list }) {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");
  const timerRef = useRef(null);

  useEffect(() => {
    if (!highlightId) return;

    const el = document.getElementById(`pub-${highlightId}`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    // Re-trigger animation
    el.classList.remove("pub-highlight");
    void el.offsetWidth;
    el.classList.add("pub-highlight");

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      el.classList.remove("pub-highlight");
    }, 3000);
  }, [highlightId]);

  return (
    <>
      {/* ── Journal Covers ── */}
      <div
        style={{
          width: "100%",
          height: "195px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: 0,
          margin: 0,
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          lineHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0",
            width: "max-content",
            height: "100%",
            margin: "0 auto",
            alignItems: "stretch",
          }}
        >
          {covers.map((cover) => (
            <div
              key={cover.id}
              className="cover-item"
              style={{
                flex: "0 0 auto",
                width: "130px",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                margin: 0,
                padding: 0,
              }}
            >
              <Image
                src={cover.image}
                alt={cover.journal || "Cover art"}
                fill
                sizes="130px"
                style={{
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Publication List ── */}
      <div
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          padding: "2.5rem 2rem 4rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "0.4rem",
            color: "var(--text)",
          }}
        >
          Publications
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Please check for the most up-to-date list:{" "}
          <a
            href={googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            Google Scholar ↗
          </a>
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            marginBottom: "2rem",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {list.map((pub) => (
            <div
              key={pub.id}
              id={`pub-${pub.id}`}
              className="pub-item"
            >
              <p
                style={{
                  marginBottom: "0.3rem",
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontWeight: 400,
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                  }}
                >
                  [{pub.id}] {pub.title}
                </span>
              </p>

              <p
                style={{
                  fontSize: "0.84rem",
                  color: "var(--text)",
                  marginBottom: "0.2rem",
                }}
              >
                {renderAuthors(pub.authors, pub.pi)}
              </p>

              <p
                style={{
                  fontSize: "0.84rem",
                }}
              >
                <strong
                  style={{
                    color: pub.venueColor || "var(--red)",
                    fontWeight: 700,
                  }}
                >
                  {pub.venue}
                </strong>

                {pub.details && (
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontWeight: 300,
                    }}
                  >
                    {" "}
                    {pub.details}
                  </span>
                )}

                {pub.note && (
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      marginLeft: "0.4rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                    }}
                  >
                    {pub.note}
                  </span>
                )}

                {pub.pdf && (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: "0.5rem",
                      color: "var(--accent2)",
                      fontWeight: 500,
                    }}
                  >
                    [pdf]
                  </a>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
