import ContainerAtom from "../../../atoms/container";
import ColumnAtom from "../../../atoms/column";
import RowAtom from "../../../atoms/row";
import LogoServioptica from "../../../../assets/img/logo_servioptica@2x.webp";
import BkGeneral from "../../../../assets/img/bkGeneral.webp";
import bkGeneralVideo from "../../../../assets/videos/bkGeneral.mp4";
import BackgroundVideo from "../../../atoms/video";
import GridAtom from "../../../atoms/grid";
import TextAtom from "../../../atoms/text";
import PersonIcon from "@mui/icons-material/Person";
import './style.css'
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ position: "relative", display: "flex" }}>
      <GridAtom
        alignItems="center"
        justifyContent="center"
        style={{
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <BackgroundVideo poster={BkGeneral} videoUrl={bkGeneralVideo} />
      </GridAtom>
      <ContainerAtom style={{ zIndex: 2 }}>
        <RowAtom className="HeaderRow">
          <ColumnAtom flex={3} style={{ minWidth: 0 }}></ColumnAtom>
          <ColumnAtom
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap={3}
            style={{ minWidth: 300 }}
          >
            <img
              src={LogoServioptica}
              alt={"Logo Servioptica"}
              width={294}
              height={124}
            />
            <TextAtom
              type="small"
              style={{ color: "var(--mainBtnColor)", textAlign: "center" }}
            >
              UN LABORATORIO DEL GRUPO ESSILORLUXOTTICA
            </TextAtom>
          </ColumnAtom>
          <ColumnAtom
            flex={3}
            alignItems="flex-end"
            style={{ color: "var(--mainBtnColor)", minWidth: 300 }}
          >
            <RowAtom
              alignItems="center"
              gap={2}
              style={{ width: 280, justifyContent: "center" }}
            >
              <TextAtom style={{ textAlign: "center" }}>
                Acceso de Administrador
              </TextAtom>
              <GridAtom
                p={1}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 120,
                  border: "1px solid var(--mainBtnColor)",
                }}
              >
                <PersonIcon style={{ color: "var(--mainBtnColor)" }} />
              </GridAtom>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
      </ContainerAtom>
    </header>
  );
};

export default Header;
