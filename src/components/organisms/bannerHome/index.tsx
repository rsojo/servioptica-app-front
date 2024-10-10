import { Link } from "react-router-dom";
import ColumnAtom from "../../atoms/column";
import RowAtom from "../../atoms/row";
import GridAtom from "../../atoms/grid";
import ButtonAtom from "../../atoms/button";
import "./style.css";

export const BannerHome = () => {
  return (
    <RowAtom
      style={{
        height: "calc(100vh - 240px)",
        minHeight: 400,
        flexFlow: "wrap",
      }}
    >
      <ColumnAtom flex={1} style={{ minWidth: 310 }}>
        <Link to={"/login"} className="BigCtaHome">
          <GridAtom style={{ flex: 1 }} />
          <GridAtom
            style={{ flex: 1 }}
            justifyContent="center"
            alignItems="center"
          >
            <ButtonAtom
              variant="outlined"
              style={{ pointerEvents: "none" }}
              onClick={() => {}}
            >
              Inicio de sesión Óptica
            </ButtonAtom>
          </GridAtom>
        </Link>
      </ColumnAtom>
      <ColumnAtom flex={1} style={{ minWidth: 310 }}>
        <Link to={"/login"} className="BigCtaHome">
          <GridAtom style={{ flex: 1 }} />
          <GridAtom
            style={{ flex: 1 }}
            justifyContent="center"
            alignItems="center"
          >
            <ButtonAtom
              onClick={() => {}}
              variant="outlined"
              style={{ pointerEvents: "none" }}
            >
              Seguimiento de pedidos
            </ButtonAtom>
          </GridAtom>
        </Link>
      </ColumnAtom>
    </RowAtom>
  );
};
