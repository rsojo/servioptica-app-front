import { Link } from "react-router-dom";
import ColumnAtom from "../../atoms/column";
import RowAtom from "../../atoms/row";
import GridAtom from "../../atoms/grid";
import ButtonAtom from "../../atoms/button";
import BgHomeL from "../../../assets/img/bgHomeL.webp";
import BgHomeR from "../../../assets/img/bgHomeR.webp";
import "./style.css";

export const BannerHomeAdmin = () => {
  return (
    <RowAtom
      style={{
        minHeight: 500,
        flexFlow: "wrap",
        alignItems: "center",
      }}
    >
      <ColumnAtom
        flex={1}
        style={{
          minWidth: 300,
          minHeight: 500,
          position: "relative",
          overflow: "hidden",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Link to={"/dashboard-admin"} className="BigCtaHome">
          <GridAtom
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <img
              style={{
                objectPosition: "center",
                height: "100%",
                minWidth: "100%",
                objectFit: "cover",
              }}
              src={BgHomeL}
              alt="Imagen de fundo"
            />
          </GridAtom>
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
              Dashboard
            </ButtonAtom>
          </GridAtom>
        </Link>
      </ColumnAtom>
      <ColumnAtom
        flex={1}
        style={{
          minWidth: 300,
          minHeight: 500,
          position: "relative",
          overflow: "hidden",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Link to={"/dashboard-promo"} className="BigCtaHome">
          <GridAtom
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <img
              style={{
                objectPosition: "center",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={BgHomeR}
              alt="Imagen de fundo"
            />
          </GridAtom>
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
              Administración Promociones
            </ButtonAtom>
          </GridAtom>
        </Link>
      </ColumnAtom>
    </RowAtom>
  );
};
