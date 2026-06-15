import newsData from "../../../data/news.json";
import Image from "next/image";

export default function NewsPage() {
  const { featured, items } = newsData;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>

      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text)" }}>
        BIRD News
      </h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Latest updates from the lab
      </p>
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "2rem" }} />

      {/* Featured Cards */}
      {featured && featured.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}>
          {featured.map((item) => (
            <div key={item.id} className="news-card">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 600px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.1rem 1.2rem" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.35rem", fontWeight: 600, letterSpacing: "0.04em" }}>
                  {item.date}
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.55, marginBottom: "0.7rem", fontWeight: 500 }}>
                  {item.title}
                </p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 500 }}>
                    {item.linkLabel || "Link"} ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "1.8rem" }} />

      {/* News list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id} className="news-item">
            <strong style={{ fontWeight: 700, color: "var(--accebt)" }}>
              {item.date}
            </strong>{" "}
            {item.text}
          </li>
        ))}
      </ul>

    </div>
  );
}
