import type { CSSProperties, ReactNode } from "react";

export interface WelkDatePickerProps {
  label: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  id?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  required?: boolean;
  circularMarking?: boolean;
  circularMarkingColor?: CSSProperties["color"];
  showTodaysDate?: boolean;
  className?: string;
}
