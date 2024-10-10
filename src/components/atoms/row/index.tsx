import Grid from "@mui/material/Grid2";
import { RowAtomProps } from "./type";

export const RowAtom = ({
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
}: Partial<RowAtomProps>) => {

  return (
    <Grid
      gap={gap ?? 0}
      p={p}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      m={m ?? 0}
      container
      direction={direction ?? "row"}
      justifyContent={justifyContent ?? "flex-start"}
      alignItems={alignItems ?? 'stretch'}
      className={className ?? ''}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default RowAtom;
