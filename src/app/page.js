import lab from "../../data/lab.json";
import pubData from "../../data/publications.json";
import newsData from "../../data/news.json";
import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "../components/HeroSlideshow";
import CoverSlideshow from "../components/CoverSlideshow";
import ScrollReveal from "../components/ScrollReveal";
import IntroOverlay from "../components/IntroOverlay";

export default function Home() {
  const recentNews = newsData.items.slice(0, 6);

  return (
    <>
      <IntroOverlay />

      {/* ── HERO ── */}
      <section style={{
        width: "100%", minHeight: "520px", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}>
        <HeroSlideshow slides={lab.heroSlides} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(160deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.38) 60%,rgba(43,87,154,0.35) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "#fff", padding: "2rem 1.5rem", maxWidth: "860px" }}>
          <h1 className="hero-title" style={{
            fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 100,
            letterSpacing: "0.12em", lineHeight: 1.25, marginBottom: "0.9rem",
            textShadow: "0 2px 18px rgba(0,0,0,0.4)",
          }}>
            <strong style={{ fontWeight: 500 }}>B</strong>IO-
            <strong style={{ fontWeight: 500 }}>I</strong>NTERACTIVE{" "}
            <strong style={{ fontWeight: 500 }}>R</strong>OBOT{" "}
            <strong style={{ fontWeight: 500 }}>D</strong>ESIGN LAB
          </h1>
          <p className="hero-sub" style={{
            fontSize: "clamp(0.88rem,1.8vw,1.05rem)", fontWeight: 300,
            letterSpacing: "0.06em", opacity: 0.9, lineHeight: 1.55,
            maxWidth: "620px", margin: "0 auto 1.8rem",
          }}>
            at Korea Institute of Science and Technology (KIST)
          </p>
          <div className="hero-btn" style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/research" className="btn-primary" style={{
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.45)",
            }}>Our Research</Link>
            <Link href="/people" className="btn-primary" style={{
              background: "rgba(43,87,154,0.80)", border: "1px solid rgba(43,87,154,0.6)",
            }}>Meet the Team</Link>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.55)", fontSize: "1.4rem", zIndex: 2,
          animation: "fadeInUp 1.2s 1s ease both",
        }}>↓</div>
      </section>

      {/* ── INTRO ── */}
      <ScrollReveal delay={0}>
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--accent)", fontWeight: 500, lineHeight: 1.6, marginBottom: "1.2rem" }}>
            {lab.title1}
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.9 }}>
            {lab.description1}
          </p>
        </section>
      </ScrollReveal>

      {/* ── MEET THE TEAM ── */}
      <ScrollReveal delay={200}>
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem 2rem 3rem" }}>
          <div style={{
            background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: "8px",
            overflow: "hidden", display: "flex", alignItems: "stretch", flexWrap: "wrap",
          }}>
            <div className="meet-team-photo">
              <Image
                src="/Team photo.jpg"
                alt="BIRD Lab team"
                fill
                sizes="(max-width: 860px) 100vw, 350px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div style={{
              flex: 1, minWidth: "220px", padding: "1.8rem 2rem",
              display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.8rem",
            }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)" }}>Meet the Team!</h2>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                We are a group of scientists, researchers, and students interested in topics ranging
                from metamaterials, soft electronics, soft robots, biomedical engineering, and AI.
              </p>
              <div>
                <Link href="/people" className="btn-primary">Click Here →</Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── RESEARCH HIGHLIGHTS + RECENT NEWS + JOIN OUR GROUP ── */}
      <ScrollReveal delay={400}>
        <section style={{ padding: "1rem 2rem 4rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="home-highlights-grid">

              {/* LEFT: Research Highlights */}
              <div>
                <h2 style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                  color: "var(--text-muted)", textTransform: "uppercase",
                  marginBottom: "1.4rem", paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{ color: "var(--accent)", marginRight: "0.4rem" }}>●</span>
                  Research Highlights
                </h2>
                <CoverSlideshow covers={pubData.covers} />
                <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
                  <Link href="/publications" style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 500 }}>
                    View all publications →
                  </Link>
                </div>
              </div>

              {/* RIGHT: Recent News + Join Our Group */}
              <div style={{ display: "flex", flexDirection: "column" }}>

                {/* News */}
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                    color: "var(--text-muted)", textTransform: "uppercase",
                    marginBottom: "1.4rem", paddingBottom: "0.5rem",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <span style={{ color: "var(--accent)", marginRight: "0.4rem" }}>●</span>
                    Recent News
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {recentNews.map((item) => (
                      <li key={item.id} className="home-news-item">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "1.2rem" }}>
                    <Link href="/news" style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 500 }}>
                      View all news →
                    </Link>
                  </div>
                </div>

                {/* Join Our Group */}
                <div style={{ marginTop: "1.8rem", flexShrink: 0 }}>
                  <Link href="/opportunities" style={{ display: "block", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ position: "relative", width: "100%", height: "130px" }}>
                      <Image
                        src="/recruitment.jpg"
                        alt="Join our group"
                        fill
                        sizes="(max-width: 820px) 100vw, 50vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, rgba(0,0,0,0.52) 0%, rgba(43,87,154,0.42) 100%)",
                      }} />
                      <div className="join-group-inner">
                        <div>
                          <h2 style={{
                            fontSize: "1.1rem", fontWeight: 700, color: "#fff",
                            letterSpacing: "0.04em", textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                            marginBottom: "0.2rem",
                          }}>Join Our Group</h2>
                          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                            We are looking for motivated students and researchers.
                          </p>
                        </div>
                        <span style={{
                          flexShrink: 0, padding: "0.4rem 1.1rem",
                          border: "1.5px solid rgba(255,255,255,0.75)", borderRadius: "4px",
                          color: "#fff", fontSize: "0.78rem", fontWeight: 600,
                          letterSpacing: "0.05em", backdropFilter: "blur(6px)",
                          background: "rgba(255,255,255,0.12)", whiteSpace: "nowrap",
                        }}>
                          See Opportunities →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
