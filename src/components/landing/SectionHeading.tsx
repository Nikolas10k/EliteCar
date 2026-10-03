import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div data-reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-bright ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-bright" />
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-zinc-400">{description}</p>}
    </div>
  );
}
