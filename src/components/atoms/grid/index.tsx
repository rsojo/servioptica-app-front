import Grid from "@mui/material/Grid2";
import { GridAtomProps } from "./type";

export const GridAtom = ({
  children,
  style,
  direction,
  justifyContent,
  alignItems,
  m,
  p,
  pt,
  pb,
  pl,
  pr,
  gap,
  className,
}: Partial<GridAtomProps>) => {
  return (
    <Grid
      spacing={gap ?? 0}
      p={p}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      m={m ?? 0}
      container
      direction={direction ?? "column"}
      justifyContent={justifyContent ?? "flex-start"}
      alignItems={alignItems ?? "flex-start"}
      className={className}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default GridAtom;
