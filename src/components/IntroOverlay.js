'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroOverlay() {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('bird-intro-shown')) {
      setPhase('gone');
      return;
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('bird-intro-shown', '1');
    }

    // Hide header during intro
    document.body.classList.add('intro-active');

    const t1 = setTimeout(() => setPhase('fade'), 1600);
    const t2 = setTimeout(() => {
      setPhase('gone');
      document.body.classList.remove('intro-active');
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.classList.remove('intro-active');
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#848484',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fade' ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >

      <div style={{
        position: 'relative',
        textAlign: 'center',
        color: '#fff',
        padding: '2rem',
        animation: 'introIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/lab-logo1.png"
            alt="BIRD Lab"
            width={240}
            height={78}
            priority
            style={{
              objectFit: 'contain',
              width: 'auto',
              height: '70px',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        <h1 style={{
          fontSize: 'clamp(1rem, 3.5vw, 1.8rem)',
          fontWeight: 300,
          letterSpacing: '0.22em',
          lineHeight: 1.4,
          marginBottom: '0.7rem',
          textTransform: 'uppercase',
        }}>
          <strong style={{ fontWeight: 800 }}>B</strong>io-
          <strong style={{ fontWeight: 800 }}>I</strong>nteractive{' '}
          <strong style={{ fontWeight: 800 }}>R</strong>obot{' '}
          <strong style={{ fontWeight: 800 }}>D</strong>esign Lab
        </h1>

        <p style={{
          fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)',
          opacity: 0.55,
          letterSpacing: '0.1em',
          fontWeight: 300,
        }}>
          Korea Institute of Science and Technology
        </p>

        <div style={{
          width: '40px',
          height: '2px',
          background: 'rgba(43,87,154,0.9)',
          margin: '1.5rem auto 0',
          borderRadius: '2px',
          animation: 'introLine 0.6s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        }} />
      </div>

      <style>{`
        @keyframes introIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes introLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
