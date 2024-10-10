import { ButtonHTMLAttributes, MouseEventHandler } from "react";

type BtnVariant = "text" | "contained" | "outlined";
type BtnAditionalsVariant = "linkStyle" | "ghostStyle" | "selectStyle" | 'listStyle';
type BtnSize = "small" | "large" | "medium";
export type BtnColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type ButtonAtomProps = {
  focus?: boolean;
  endIcon?: any;
  size?: BtnSize;
  startIcon?: any;
  color?: BtnColor;
  disabled?: boolean;
  variant?: BtnVariant;
  ariaDescribedby?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  adVariant?: BtnAditionalsVariant;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};
