"use client";

interface Props {
  dark: boolean;
  size?: number;
}

export default function PearlLogo({ dark, size = 26 }: Props) {
  // Use unique ID prefix per mode to avoid gradient collision when both exist in DOM
  const id = dark ? "pl-d" : "pl-l";

  if (dark) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        overflow="visible"
        aria-hidden="true"
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <radialGradient id={`${id}-g`} cx="40%" cy="36%" r="62%" fx="32%" fy="28%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="12%"  stopColor="#f4f4f4" />
            <stop offset="40%"  stopColor="#b0b0b0" />
            <stop offset="72%"  stopColor="#505050" />
            <stop offset="100%" stopColor="#141414" />
          </radialGradient>
          <radialGradient id={`${id}-s1`} cx="30%" cy="24%" r="16%" fx="30%" fy="24%">
            <stop offset="0%"   stopColor="rgba(255,255,255,1)" />
            <stop offset="40%"  stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id={`${id}-s2`} cx="36%" cy="30%" r="42%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.38)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id={`${id}-r`} cx="70%" cy="76%" r="28%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.9)" />
          </filter>
        </defs>
        <circle cx="13" cy="13" r="12" fill={`url(#${id}-g)`}  filter={`url(#${id}-sh)`} />
        <circle cx="13" cy="13" r="12" fill={`url(#${id}-s2)`} />
        <circle cx="13" cy="13" r="12" fill={`url(#${id}-r)`}  />
        <ellipse cx="9"   cy="7.5" rx="4.5" ry="2.5" fill={`url(#${id}-s1)`} />
        <ellipse cx="7.5" cy="6"   rx="1.8" ry="1"   fill="rgba(255,255,255,0.9)" />
      </svg>
    );
  }

  // Light mode — Black Pearl with iridescent rim
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      overflow="visible"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="36%" r="62%" fx="32%" fy="28%">
          <stop offset="0%"   stopColor="#9090a8" />
          <stop offset="14%"  stopColor="#545468" />
          <stop offset="42%"  stopColor="#202030" />
          <stop offset="72%"  stopColor="#0a0a14" />
          <stop offset="100%" stopColor="#000004" />
        </radialGradient>
        <radialGradient id={`${id}-s1`} cx="30%" cy="24%" r="16%" fx="30%" fy="24%">
          <stop offset="0%"   stopColor="rgba(220,225,255,1)" />
          <stop offset="40%"  stopColor="rgba(220,225,255,0.75)" />
          <stop offset="100%" stopColor="rgba(220,225,255,0)" />
        </radialGradient>
        <radialGradient id={`${id}-s2`} cx="36%" cy="30%" r="42%">
          <stop offset="0%"   stopColor="rgba(180,185,230,0.28)" />
          <stop offset="100%" stopColor="rgba(180,185,230,0)" />
        </radialGradient>
        <radialGradient id={`${id}-r1`} cx="72%" cy="70%" r="32%">
          <stop offset="0%"   stopColor="rgba(60,210,220,0.22)" />
          <stop offset="100%" stopColor="rgba(60,210,220,0)" />
        </radialGradient>
        <radialGradient id={`${id}-r2`} cx="18%" cy="78%" r="26%">
          <stop offset="0%"   stopColor="rgba(150,90,230,0.18)" />
          <stop offset="100%" stopColor="rgba(150,90,230,0)" />
        </radialGradient>
        <filter id={`${id}-sh`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor="rgba(10,10,30,0.035)" />
        </filter>
      </defs>
      <circle cx="13" cy="13" r="12" fill={`url(#${id}-g)`}  filter={`url(#${id}-sh)`} />
      <circle cx="13" cy="13" r="12" fill={`url(#${id}-s2)`} />
      <circle cx="13" cy="13" r="12" fill={`url(#${id}-r1)`} />
      <circle cx="13" cy="13" r="12" fill={`url(#${id}-r2)`} />
      <ellipse cx="9"   cy="7.5" rx="4.5" ry="2.5" fill={`url(#${id}-s1)`} />
      <ellipse cx="7.5" cy="6"   rx="1.8" ry="1"   fill="rgba(230,232,255,0.8)" />
    </svg>
  );
}
