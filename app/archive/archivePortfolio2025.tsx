"use client";

import { useState, useEffect, useRef } from "react";
import Portfolio from "@/components/archive2025/ArchivePortfolio2025";

const SESSION_KEY = "archive_auth";

export default function ArchiveClient() {
  const [authed,  setAuthed]  = useState(false);
  const [input,   setInput]   = useState("");
  const [error,   setError]   = useState(false);
  const [shake,   setShake]   = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    else inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input }),
    });
    const { correct } = await res.json();
    setLoading(false);
    if (correct) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  }

  if (authed) return <Portfolio />;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090E",
        fontFamily: "'Red Hat Text', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "min(400px, 90vw)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F5A623",
              marginBottom: 12,
            }}
          >
            Archive
          </p>
          <h1
            style={{
              fontFamily: "'Gloock', Georgia, serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#EDEAE3",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Password required
          </h1>
          <p
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.55,
            }}
          >
            This section is private.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            animation: shake ? "archiveShake 0.45s ease" : "none",
          }}
        >
          <input
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Enter password"
            autoComplete="current-password"
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: error
                ? "1px solid rgba(239,68,68,0.6)"
                : "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#EDEAE3",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.05em",
              outline: "none",
              transition: "border-color 0.2s",
              width: "100%",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = "rgba(245,166,35,0.5)";
            }}
            onBlur={(e) => {
              if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
          {error && (
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "rgba(239,68,68,0.8)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              Incorrect password
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "1px solid #F5A623",
              background: "#F5A623",
              color: "#09090E",
              fontFamily: "'Red Hat Text', system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes archiveShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
