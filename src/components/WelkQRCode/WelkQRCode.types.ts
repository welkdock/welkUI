import type { CSSProperties } from "react";

export interface WelkQRCodeProps {
  url: string;
  variant?: "default" | "card";
  title?: string;
  subtitle?: string;
  cardColor?: CSSProperties["backgroundColor"];
  originalCode?: boolean;
}
