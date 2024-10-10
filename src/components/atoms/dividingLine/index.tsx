import "./style.css";

type DividingLineAtomType = {
  orientation?: 'h' | 'v';
  style?: any;
  className?: string;
  show?: boolean;
};

export const DividingLineAtom = ({
  orientation,
  style,
  className,
  show = true,
}: DividingLineAtomType) => {
  return (
    <span
      className={`dividingLineAtom ${
        orientation === "h" ? "horizontalOrientation" : "vertivalOrientation"
      } ${className}`}
      style={{ ...style, display: show ? 'block' : 'none' }}
    ></span>
  );
};

export default DividingLineAtom;
