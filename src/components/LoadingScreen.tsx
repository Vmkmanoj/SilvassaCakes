import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  brandName?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  message = "Preparing fresh & handcrafted delicacies...",
  brandName = "BiteZone.",
}) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [fadeAnim, setFadeAnim] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isLoading) {
      setShouldRender(true);
      setFadeAnim(false);
    } else {
      // Begin fade out
      setFadeAnim(true);
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // 500ms transition time
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        background: "radial-gradient(ellipse at center, #1b3d29 0%, #11261a 60%, #0a170f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        opacity: fadeAnim ? 0 : 1,
        transform: fadeAnim ? "scale(1.03)" : "scale(1)",
        pointerEvents: fadeAnim ? "none" : "all",
        transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Decorative ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(78, 149, 37, 0.25) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Card / Emblem */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "40px 32px",
          maxWidth: "420px",
          width: "90%",
        }}
      >
        {/* Animated Cake / Culinary Icon */}
        <div
          style={{
            position: "relative",
            width: "88px",
            height: "88px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rotating halo ring */}
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "2px dashed rgba(78, 149, 37, 0.6)",
              animation: "spinSlow 12s linear infinite",
            }}
          />

          {/* Glowing circle container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #163020 0%, #244e32 100%)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(78, 149, 37, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5cd133"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(78, 149, 37, 0.5))",
                animation: "pulseIcon 2.4s ease-in-out infinite",
              }}
            >
              {/* Birthday Cake SVG */}
              <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
              <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
              <path d="M2 21h20" />
              <path d="M7 8v2" />
              <path d="M12 8v2" />
              <path d="M17 8v2" />
              <path d="M7 4h.01" />
              <path d="M12 4h.01" />
              <path d="M17 4h.01" />
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            margin: "0 0 4px 0",
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          {brandName}
          <span style={{ color: "#4E9525" }}>.</span>
        </h1>

        <div
          style={{
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#8fc49e",
            fontWeight: 600,
            marginBottom: "28px",
          }}
        >
          Silvassa Cakes
        </div>

        {/* Dynamic Loading Bar */}
        <div
          style={{
            width: "220px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "45%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #4E9525 0%, #7ee651 50%, #bc1313 100%)",
              boxShadow: "0 0 12px rgba(92, 209, 51, 0.8)",
              animation: "shimmerBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
        </div>

        {/* Status Text */}
        <p
          style={{
            fontSize: "12px",
            color: "#a3b8aa",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "0.2px",
          }}
        >
          {message}
        </p>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes shimmerBar {
          0% {
            left: -45%;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulseIcon {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
};
