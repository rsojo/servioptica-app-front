type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right"
  | "safe"
  | "unsafe"
  | "stretch";

export interface ColumnAtomProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  direction: 'column' | 'column-reverse';
  justifyContent: FlexAlignType;
  alignItems: FlexAlignType;
  m: number;
  p: number;
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  gap: number;
  className: string;
  flex: number;
};