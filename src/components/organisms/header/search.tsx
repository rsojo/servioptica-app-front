import { Link, useNavigate } from "react-router-dom";
import ColumnAtom from "../../atoms/column";
import ContainerAtom from "../../atoms/container";
import GridAtom from "../../atoms/grid";
import RowAtom from "../../atoms/row";
import TextAtom from "../../atoms/text";
import BackgroundVideo from "../../atoms/video";

import LogoServioptica from "../../../assets/img/logo_servioptica@2x.webp";
import BkGeneral from "../../../assets/img/bkGeneral.webp";
import bkGeneralVideo from "../../../assets/videos/bkGeneral.mp4";

import PersonIcon from "@mui/icons-material/Person";
import { ButtonAtom, InputTextAtom, SpaceAtom, TitleAtom } from "../../atoms";
import { BASE_COLORS } from "../../../style/constants";
import { useState } from "react";

export const SearchHeader = () => {
  const navetgate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);

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
          <ColumnAtom flex={3} style={{ minWidth: 0 }}></ColumnAtom>
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
                height={124}
              />
            </Link>
            <TextAtom
              type="small"
              style={{ color: BASE_COLORS.blue, textAlign: "center" }}
            >
              UN LABORATORIO DEL GRUPO ESSILORLUXOTTICA
            </TextAtom>
          </ColumnAtom>
          <ColumnAtom
            flex={3}
            alignItems="flex-end"
            style={{ color: BASE_COLORS.blue, minWidth: 300 }}
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
                  border: `1px solid ${BASE_COLORS.blue}`,
                }}
              >
                <PersonIcon style={{ color: BASE_COLORS.blue }} />
              </GridAtom>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
        <SpaceAtom v={48} />
        <GridAtom
          style={{ width: "100%", marginBottom: -50 }}
          alignItems="center"
          gap={4}
        >
          <TitleAtom
            style={{
              color: BASE_COLORS.blue,
              fontSize: 20,
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
                  setSearchValue(value as string);
                }}
              />
            </ColumnAtom>
            <ColumnAtom style={{ flex: "none" }}>
              <ButtonAtom
                disabled={!searchValue}
                onClick={() => {
                  navetgate(`/order-tracking/${searchValue}`);
                  console.log("Buscar");
                }}
                style={{ minWidth: 173 }}
              >
                Buscar
              </ButtonAtom>
            </ColumnAtom>
          </RowAtom>
        </GridAtom>
        <SpaceAtom v={88} />
      </ContainerAtom>
    </header>
  );
};
