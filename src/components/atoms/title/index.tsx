import ColumnAtom from "../column";
import RowAtom from "../row";
import { TypeTitle } from "./lib/typesTitle";
import "./style.css";

export type TitleType = "h1" | "h2" | "h3" | "h4" | "h6" | "h5" | "span";
export type TitleVariant = "body" | "big" | "small";
export type TitleWeight = "bold" | "regular" | "ligth";

export interface TitleAtomProps {
  children: React.ReactNode;
  type: TitleType;
  variant: TitleVariant;
  style: React.CSSProperties;
  className: string;
  startIcon: React.ReactNode;
  endIcon: React.ReactNode;
  weight: TitleWeight;
}

export const TitleAtom = ({
  children,
  type,
  style,
  className,
  startIcon,
  variant,
  weight,
  endIcon,
}: Partial<TitleAtomProps>) => {
  if (startIcon || endIcon) {
    return (
      <RowAtom gap={1} alignItems="center">
        {startIcon && (
          <ColumnAtom
            style={{ flex: "none", width: "auto" }}
            className="TitleIcon"
          >
            {startIcon}
          </ColumnAtom>
        )}
        <ColumnAtom style={{ flex: "none", width: "auto" }}>
          <TypeTitle
            className={`${className ?? ""} text-gray-100`}
            type={type ?? "h1"}
            style={style}
            variant={variant}
            weight={weight}
          >
            {children}
          </TypeTitle>
        </ColumnAtom>
        {endIcon && (
          <ColumnAtom
            style={{ flex: "none", width: "auto" }}
            className="TitleIcon"
          >
            {endIcon}
          </ColumnAtom>
        )}
      </RowAtom>
    );
  }
  return (
    <TypeTitle
      className={className ?? ""}
      type={type ?? "h1"}
      style={style}
      variant={variant}
      weight={weight}
    >
      {children}
    </TypeTitle>
  );
};

export default TitleAtom;
