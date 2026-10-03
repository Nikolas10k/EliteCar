type EliteLogoProps = {
  /** Prefixo único para ids do SVG quando houver mais de um logo na página. */
  id: string;
  animated?: boolean;
  className?: string;
};

/**
 * Logo Elite Car Veículos em SVG: silhueta do carro (traço prata + teto vermelho)
 * com o nome em cromado. Vetorial para ficar nítido em qualquer tamanho e animável por partes.
 */
export function EliteLogo({ id, animated = false, className }: EliteLogoProps) {
  const a = (cls: string) => (animated ? cls : undefined);

  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Elite Car Veículos">
      <defs>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#e6e6eb" />
          <stop offset="0.52" stopColor="#7d7d86" />
          <stop offset="0.7" stopColor="#f3f3f6" />
          <stop offset="1" stopColor="#a4a4ad" />
        </linearGradient>
        <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6f6f78" stopOpacity="0" />
          <stop offset="0.25" stopColor="#c9c9d0" />
          <stop offset="0.7" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bdbdc4" />
        </linearGradient>
        <linearGradient id={`${id}-red`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a0400" stopOpacity="0" />
          <stop offset="0.3" stopColor="#e10600" />
          <stop offset="0.75" stopColor="#ff3a2c" />
          <stop offset="1" stopColor="#c40500" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <text
            x="362"
            y="226"
            textAnchor="middle"
            fontFamily="var(--font-russo)"
            fontSize="94"
            transform="skewX(-11)"
          >
            ELITE CAR
          </text>
        </clipPath>
      </defs>

      {/* Linha prata inferior (capô / lateral) */}
      <path
        className={a("logo-swoosh")}
        fill={`url(#${id}-silver)`}
        d="M28 176 C120 146 228 132 340 130 C430 128 505 132 566 141 L560 151 C488 145 410 143 336 145 C230 148 128 158 28 176 Z"
      />
      {/* Teto vermelho */}
      <path
        className={a("logo-swoosh logo-swoosh--roof")}
        fill={`url(#${id}-red)`}
        d="M150 132 C232 80 352 58 462 70 C516 76 560 90 592 110 L586 124 C552 104 512 94 462 89 C362 78 252 92 150 132 Z"
      />
      {/* Aerofólio / lanterna traseira */}
      <path
        className={a("logo-swoosh logo-swoosh--tail")}
        fill="#e10600"
        d="M532 122 L612 100 L606 120 L548 134 Z"
      />

      {/* Nome em cromado */}
      <g className={a("logo-word")}>
        <text
          x="362"
          y="226"
          textAnchor="middle"
          fontFamily="var(--font-russo)"
          fontSize="94"
          transform="skewX(-11)"
          fill={`url(#${id}-chrome)`}
          stroke="#0b0b0c"
          strokeWidth="3"
          paintOrder="stroke"
        >
          ELITE CAR
        </text>
        {animated && (
          <g clipPath={`url(#${id}-clip)`}>
            <rect
              className="animate-shine"
              x="40"
              y="140"
              width="160"
              height="110"
              fill={`url(#${id}-shine)`}
              opacity="0.7"
            />
          </g>
        )}
      </g>

      <text
        className={a("logo-sub")}
        x="372"
        y="272"
        textAnchor="middle"
        fontFamily="var(--font-russo)"
        fontSize="30"
        letterSpacing="13"
        transform="skewX(-11)"
        fill="#e10600"
      >
        VEICULOS
      </text>
    </svg>
  );
}
