"use client";

import qrcode from "qrcode-generator";
import styles from "./WelkQRCode.module.css";
import type { WelkQRCodeProps } from "./WelkQRCode.types";

function isHttpUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function WelkQRCode({
  url,
  variant = "default",
  title,
  subtitle,
  cardColor,
  originalCode = false,
}: WelkQRCodeProps) {
  if (!isHttpUrl(url)) {
    const code = (
      <p className={styles.error} role="alert">
        Enter a valid URL beginning with http:// or https://.
      </p>
    );

    if (variant === "card") {
      return (
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {code}
        </div>
      );
    }

    return code;
  }

  const qr = qrcode(0, "M");
  qr.addData(url);
  qr.make();
  const moduleCount = qr.getModuleCount();
  const quietZone = 4;
  const viewSize = moduleCount + quietZone * 2;
  const modulePath = Array.from({ length: moduleCount }, (_, row) =>
    Array.from({ length: moduleCount }, (_, column) => {
      if (!qr.isDark(row, column)) return "";
      const x = column + quietZone;
      const y = row + quietZone;
      const finderPattern =
        (row < 8 && column < 8) ||
        (row < 8 && column >= moduleCount - 8) ||
        (row >= moduleCount - 8 && column < 8);
      const timingPattern = row === 6 || column === 6;

      if (originalCode || finderPattern || timingPattern) {
        return `M${x} ${y}h1v1h-1z`;
      }

      const inset = 0.045;
      const radius = 0.22;
      const left = x + inset;
      const top = y + inset;
      const right = x + 1 - inset;
      const bottom = y + 1 - inset;
      return [
        `M${left + radius} ${top}`,
        `H${right - radius}`,
        `Q${right} ${top} ${right} ${top + radius}`,
        `V${bottom - radius}`,
        `Q${right} ${bottom} ${right - radius} ${bottom}`,
        `H${left + radius}`,
        `Q${left} ${bottom} ${left} ${bottom - radius}`,
        `V${top + radius}`,
        `Q${left} ${top} ${left + radius} ${top}`,
        "Z",
      ].join("");
    }).join(""),
  ).join("");
  const code = (
    <div className={styles.frame}>
      <svg
        className={styles.code}
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        role="img"
        aria-label={`QR code for ${url}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={viewSize} height={viewSize} fill="#ffffff" />
        <path d={modulePath} fill="#242424" />
      </svg>
    </div>
  );

  if (variant === "card") {
    return (
      <div className={styles.card} style={{ backgroundColor: cardColor }}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {code}
      </div>
    );
  }

  return code;
}
