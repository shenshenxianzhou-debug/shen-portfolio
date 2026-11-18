type IconProps = { id: string };

const box = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  "aria-hidden": true as const,
};

const tile: Record<string, string> = {
  ae: "Ae",
  pr: "Pr",
  ps: "Ps",
  ai: "AI",
};

export function SoftIcon({ id }: IconProps) {
  if (id === "resolve") {
    return (
      <svg {...box}>
        <circle cx="16" cy="16" r="15" fill="#161616" />
        <path d="M16 16 L16 3 A13 13 0 0 1 27.3 9.5 Z" fill="#ff5a3c" />
        <path d="M16 16 L27.3 9.5 A13 13 0 0 1 27.3 22.5 Z" fill="#ffb703" />
        <path d="M16 16 L27.3 22.5 A13 13 0 0 1 16 29 Z" fill="#7bd389" />
        <path d="M16 16 L16 29 A13 13 0 0 1 4.7 22.5 Z" fill="#3aa0ff" />
        <path d="M16 16 L4.7 22.5 A13 13 0 0 1 4.7 9.5 Z" fill="#7a5cff" />
        <path d="M16 16 L4.7 9.5 A13 13 0 0 1 16 3 Z" fill="#ff4fa3" />
        <circle cx="16" cy="16" r="4.2" fill="#161616" />
      </svg>
    );
  }
  if (id === "fcp") {
    return (
      <svg {...box}>
        <rect width="32" height="32" rx="7" fill="#1c1c1c" />
        <rect x="5" y="6" width="22" height="4.2" rx="1" fill="#ff4d3a" />
        <rect x="5" y="11.2" width="22" height="3.3" fill="#ffd60a" />
        <rect x="5" y="15.4" width="22" height="3.3" fill="#32d74b" />
        <rect x="5" y="19.6" width="22" height="3.3" fill="#0a84ff" />
        <rect x="5" y="23.8" width="22" height="2.4" fill="#bf5af2" />
      </svg>
    );
  }
  if (id === "capcut") {
    return (
      <span className="soft-ico capcut" aria-hidden>
        <i />
      </span>
    );
  }
  return (
    <span className={`soft-ico ${id}`} aria-hidden>
      {tile[id] ?? "AI"}
    </span>
  );
}

export function SkillIcon({ id }: IconProps) {
  const stroke = skillColor(id);
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
      <SkillGlyph id={id} stroke={stroke} />
    </svg>
  );
}

function skillColor(id: string) {
  if (id === "photo") return "#e07a3d";
  if (id === "edit") return "#3b78e0";
  if (id === "grade") return "#7a5cff";
  if (id === "ai") return "#129888";
  if (id === "film") return "#e04b4b";
  if (id === "direct") return "#2f9d62";
  if (id === "event") return "#d4922a";
  return "#d4537e";
}

function SkillGlyph({ id, stroke }: { id: string; stroke: string }) {
  const props = { fill: "none", stroke, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "photo") {
    return (
      <g {...props}>
        <rect x="5" y="9" width="22" height="15" rx="3" />
        <circle cx="16" cy="16.5" r="4" />
        <path d="M12 9 13.4 6.5h5.2L20 9" />
      </g>
    );
  }
  if (id === "edit") {
    return (
      <g {...props}>
        <rect x="4" y="8" width="6" height="16" rx="1" />
        <rect x="13" y="8" width="6" height="16" rx="1" />
        <rect x="22" y="8" width="6" height="16" rx="1" />
        <path d="M4 13h24M4 19h24" />
      </g>
    );
  }
  if (id === "grade") {
    return (
      <g {...props}>
        <circle cx="16" cy="16" r="9" />
        <path d="M16 7v9l6 3.5" />
        <circle cx="16" cy="16" r="1.4" fill={stroke} stroke="none" />
      </g>
    );
  }
  if (id === "ai") {
    return (
      <g {...props}>
        <path d="M16 5.5 18 12l6.5 2L18 16l-2 6.5L14 16 7.5 14 14 12 16 5.5Z" />
        <path d="M24 7.5v4M22 9.5h4" />
      </g>
    );
  }
  if (id === "film") {
    return (
      <g {...props}>
        <path d="M7 9h18v14H7z" />
        <path d="M12 9v14M20 9v14M7 13h5M7 17h5M20 13h5M20 17h5" />
      </g>
    );
  }
  if (id === "direct") {
    return (
      <g {...props}>
        <rect x="6" y="5" width="16" height="22" rx="2" />
        <path d="M10 11h8M10 16h8M10 21h5" />
        <path d="M22 20.5 26.5 25" />
      </g>
    );
  }
  if (id === "event") {
    return (
      <g {...props}>
        <rect x="5" y="10" width="18" height="13" rx="2" />
        <path d="M23 14.5 27 12.5v9L23 19.5z" />
        <path d="M9 10V7M19 10V7" />
      </g>
    );
  }
  return (
    <g {...props}>
      <rect x="10" y="4" width="12" height="24" rx="2" />
      <path d="M14 7h4" />
      <path d="M15 23h2" />
    </g>
  );
}
