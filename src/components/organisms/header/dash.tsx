import { Link } from "react-router-dom";
import {
  ButtonAtom,
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  InputTextAtom,
  RowAtom,
  SpaceAtom,
  TextAtom,
  TitleAtom,
} from "../../atoms/";

import LogoServioptica from "../../../assets/img/logo_servioptica@2x.webp";
import bkDash from "../../../assets/img/bkDash-01.webp";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_COLORS } from "../../../style/constants";

export const DashHeader = () => {
  return (
    <header style={{ position: "relative", display: "flex"}}>
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
           overflow: 'hidden',
        }}
      >
        <img
          src={bkDash}
          style={{ objectFit: "cover", height: "100%", width: "105%" }}
          width={1920}
          height={300}
          alt="imagen del banner"
        />
      </GridAtom>
      <ContainerAtom style={{ zIndex: 2, marginBottom: 10 }}>
        <RowAtom className="HeaderRow" style={{flexFlow: 'wrap'}}>
          <ColumnAtom
            flex={3}
            alignItems="center"
            justifyContent="center"
            gap={2}
            style={{ minWidth: 300 }}
          >
            <Link to={"/"}>
              <img
                style={{ objectFit: "contain" }}
                src={LogoServioptica}
                alt={"Logo Servioptica"}
                width={215}
                height={91}
              />
            </Link>
            <TextAtom
              type="small"
              style={{
                color: "var(--mainBtnColor)",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              UN LABORATORIO DEL GRUPO ESSILORLUXOTTICA
            </TextAtom>
          </ColumnAtom>
          <ColumnAtom
            flex={9}
            alignItems="flex-end"
            style={{ color: "var(--mainBtnColor)", minWidth: 300 }}
          >
            <RowAtom
              alignItems="center"
              gap={2}
              style={{ width: 280, justifyContent: "center" }}
            >
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
              <TextAtom style={{ textAlign: "center" }}>Óptica TXT 01</TextAtom>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
        <SpaceAtom v={48} />
        <GridAtom style={{ width: "100%", marginBottom: -50 }} alignItems="center" gap={2}>
          <TitleAtom
            style={{
              color: BASE_COLORS.blue,
              fontSize: 30,
              textAlign: "center",
              textShadow: "0px 3px 6px #FFFFFF",
              fontWeight: 900,
            }}
          >
            Consulta de Pedido
          </TitleAtom>
          <RowAtom
            alignItems="center"
            gap={2}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <ColumnAtom flex={10}>
              <InputTextAtom
                field={{ id: "search_orders", placeholder: "Nº de Pedido" }}
                onChangeCallback={(value) => {
                  console.log(value);
                }}
              />
            </ColumnAtom>
            <ColumnAtom style={{flex: 'none'}}>
              <ButtonAtom
                onClick={() => {
                  console.log("Buscar");
                }}
                style={{ minWidth: 173 }}
              >
                Buscar
              </ButtonAtom>
            </ColumnAtom>
          </RowAtom>
        </GridAtom>
      </ContainerAtom>
    </header>
  );
};
