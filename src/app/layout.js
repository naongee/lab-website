import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeProvider";
import lab from "../../data/lab.json";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "BIRD Lab @ KIST",
  description: lab.description1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={inter.variable}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" }}>
        <ThemeProvider>

          {/* ── HEADER ── */}
          <Header />

          {/* ── MAIN ── */}
          <main className="page-enter" style={{ flex: 1 }}>
            {children}
          </main>

          {/* ── FOOTER ── */}
          <footer style={{ padding: "2rem 1.5rem" }}>
            <div style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.85 }}>
                <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.2rem" }}>
                  BIRD Lab | Bio-Interactive Robot Design Laboratory
                </p>
                <p>{lab.addressLine1}</p>
                <p>{lab.addressLine2}</p>
                <p>
                  <strong>Tel:</strong> {lab.phone}&nbsp;&nbsp;|&nbsp;&nbsp;
                  <strong>E-mail:</strong>{" "}
                  <a href={"mailto:" + lab.email} style={{ color: "var(--accent)" }}>{lab.email}</a>
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <Image src="/lab-logo1-orig.png" alt="BIRD Lab" width={200} height={70} style={{ objectFit: "contain", height: "64px", width: "auto" }} />
                <Image src="/kist-ci.png" alt="KIST" width={200} height={70} style={{ objectFit: "contain", height: "64px", width: "auto" }} />
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "1.2rem" }}>
              {"©"}{new Date().getFullYear()} {lab.copyright}. All rights reserved.
            </div>
          </footer>

        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
