import { ReactElement } from "react";
import './style.css'

export type LabelAtomProps = {
  children: React.ReactNode;
  htmlFor?: string;
  important?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
};


export const LabelAtom = ({
  htmlFor,
  children,
  important=false,
  style,
  className,
  disabled,
}: Partial<LabelAtomProps>): ReactElement => {
  return (
    <label htmlFor={htmlFor ?? ""} style={style} className={`LabelAtom ${className} ${disabled ? 'disabled' : ''}`}>
      {children}{important ? <span>*</span> : ''}
    </label>
  );
};

export default LabelAtom;