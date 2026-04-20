import { Link } from "react-router-dom";
import ColumnAtom from "../../atoms/column";
import ContainerAtom from "../../atoms/container";
import GridAtom from "../../atoms/grid";
import RowAtom from "../../atoms/row";
import BackgroundVideo from "../../atoms/video";

import LogoServioptica from "../../../assets/img/logo_servioptica_2026.png";
import BkGeneral from "../../../assets/img/bkGeneral.webp";
import bkGeneralVideo from "../../../assets/videos/bkGeneral.mp4";

export const LoginHeader = () => {
  return (
    <header style={{ position: "relative", display: "flex" }}>
      <GridAtom
        alignItems="center"
        justifyContent="center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <BackgroundVideo poster={BkGeneral} videoUrl={bkGeneralVideo} />
        <span
          style={{
            width: "100%",
            height: 120,
            background: "linear-gradient(0deg, #ffffff, #ffffff00)",
            position: "absolute",
            bottom: 0,
          }}
        />
      </GridAtom>
      <ContainerAtom style={{ zIndex: 2, marginBottom: 10 }}>
        <RowAtom className="HeaderRow">
          <ColumnAtom
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap={3}
            style={{ minWidth: 300 }}
          >
            <Link to={"/"}>
              <img
                src={LogoServioptica}
                alt={"Logo Servioptica"}
                width={294}
                height={165}
              />
            </Link>
          </ColumnAtom>
        </RowAtom>
      </ContainerAtom>
    </header>
  );
};
