import { Button } from "@mui/material";
import { ReactElement } from "react";
import "./style.css";
import { ButtonAtomProps } from "./type";

export const ButtonAtom = ({
  type,
  size,
  color,
  focus,
  style,
  onClick,
  variant,
  endIcon,
  disabled,
  children,
  adVariant,
  className,
  startIcon,
  ariaDescribedby,
}: ButtonAtomProps): ReactElement => {
  return (
    <Button
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      aria-describedby={ariaDescribedby}
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled ?? false}
      className={`
        generalBtn 
        ${color ? color + "_color" : ""} 
        ${variant ?? ""} 
        ${adVariant ?? ""} 
        ${size ? "btn_" + size : ""}
        ${className ?? ""}
        ${focus ? "focus" : ''}
        `}
      variant={variant ?? "contained"}
      style={{ ...style }}
    >
      {children}
    </Button>
  );
};
export default ButtonAtom;
