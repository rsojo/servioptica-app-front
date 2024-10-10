import { GridDirection } from "@mui/material";

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

export interface GridAtomProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  direction: GridDirection;
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
};