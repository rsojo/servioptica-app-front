import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
  loading,
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
      disabled={disabled || loading}
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
      <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: "0.5rem" }}>
        {loading && <CircularProgress color="inherit" size={18} />}
        {children}
      </span>
    </Button>
  );
};
export default ButtonAtom;
