import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`u-eyebrow ${tone === "light" ? "text-paper/55" : "text-ink/45"} ${className}`}
    >
      {children}
    </p>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}

export function Shell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 ${wide ? "max-w-[1680px]" : "max-w-[1320px]"} ${className}`}
    >
      {children}
    </div>
  );
}

const btnBase =
  "group relative inline-flex items-center gap-3 overflow-hidden transition-colors duration-500";

export function Btn({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "clay";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-4 py-2.5 text-[11.5px]",
    md: "px-6 py-3.5 text-[12px]",
    lg: "px-8 py-4.5 text-[13px]",
  };
  const variants = {
    solid: "btn-sweep bg-ink text-paper hover:text-paper",
    clay: "btn-sweep bg-clay text-paper hover:text-paper",
    outline:
      "border border-ink/25 text-ink hover:border-ink/60 hover:text-ink",
    ghost: "text-ink hover:text-clay",
  };
  return (
    <Link
      href={href}
      className={`${btnBase} ${sizes[size]} ${variants[variant]} u-eyebrow rounded-full ${className}`}
    >
      <span className="relative z-2">{children}</span>
      <span className="relative z-2 transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function BtnAction({
  children,
  onClick,
  variant = "solid",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "clay" | "wa";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const sizes = {
    sm: "px-4 py-2.5 text-[11.5px]",
    md: "px-6 py-3.5 text-[12px]",
    lg: "px-8 py-4.5 text-[13px]",
  };
  const variants = {
    solid: "btn-sweep bg-ink text-paper",
    clay: "btn-sweep bg-clay text-paper",
    outline: "border border-ink/25 text-ink hover:border-ink/60",
    wa: "bg-[#1faa53] text-white hover:bg-[#17903f]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${btnBase} ${sizes[size]} ${variants[variant]} u-eyebrow rounded-full disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
    >
      <span className="relative z-2">{children}</span>
    </button>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`hairline w-full ${className}`} />;
}

export function Tag({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "clay" | "moss" | "light";
}) {
  const tones = {
    ink: "border-ink/20 text-ink/70",
    clay: "border-clay/40 text-clay",
    moss: "border-moss/40 text-moss",
    light: "border-paper/25 text-paper/70",
  };
  return (
    <span className={`u-eyebrow rounded-full border px-3 py-1.5 ${tones[tone]}`}>
      {children}
    </span>
  );
}
