import "./style.css";

export type TextAtomProps = {
  children: React.ReactNode;
  style: React.CSSProperties;
  className: string;
  type: "body" | "small" | "big";
  color: string;
};

export const TextAtom = ({
  children,
  style,
  className,
  type,
  color,
}: Partial<TextAtomProps>) => {
  return (
    <p
      className={`${className} textAtom style_${type ?? "body"}`}
      style={{ ...style, color: color ?? style?.color }}
    >
      {children}
    </p>
  );
};

export default TextAtom;
