import { Container } from "@mui/material";
import React from "react";
import "./style.css";

type ContainerAtomType = {
  children: React.ReactNode;
  ref?: any;
  style?: React.CSSProperties;
  layoutType?: 1 | 2 | 3;
};
export const ContainerAtom = ({
  children,
  ref,
  layoutType,
  style,
}: ContainerAtomType) => {
  return (
    <Container
      style={style}
      className={`containerAtom ${layoutType === 3 ? "layoutTypeT3" : ""}`}
      ref={ref}
    >
      {children}
    </Container>
  );
};

export default ContainerAtom;
