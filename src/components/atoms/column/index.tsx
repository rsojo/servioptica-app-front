import Grid from "@mui/material/Grid2";
import { ColumnAtomProps } from "./type";

export const ColumnAtom = ({
  children,
  style,
  justifyContent,
  alignItems,
  direction,
  m,
  p,
  pt,
  pb,
  pl,
  pr,
  gap,
  className,
  flex,
}: Partial<ColumnAtomProps>) => {
  return (
    <Grid
      flex={flex ?? 1}
      gap={gap ?? 0}
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
      className={className ?? ''}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default ColumnAtom;
