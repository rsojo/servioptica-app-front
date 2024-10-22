import { Link, useNavigate } from "react-router-dom";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  TextAtom,
} from "../../atoms";

import LogoServioptica from "../../../assets/img/logo_servioptica@2x.webp";
import bkDash from "../../../assets/img/bkDashAdmin.webp";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_COLORS } from "../../../style/constants";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export const DashHeaderAdmin = () => {
  const navetgate = useNavigate();

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
          overflow: "hidden",
        }}
      >
        <img
          src={bkDash}
          style={{ objectFit: "cover", height: "100%", width: "105%" }}
          width={1920}
          height={330}
          alt="imagen del banner"
        />
      </GridAtom>
      <ContainerAtom
        style={{ zIndex: 2, marginBottom: 10, minHeight: 330 }}
      >
        <RowAtom className="HeaderRow" style={{ flexFlow: "wrap" }}>
          <ColumnAtom
            flex={3}
            alignItems="flex-start"
            justifyContent="center"
            gap={2}
          >
            <Link to={"/home-admin"}>
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
                color: BASE_COLORS.blue,
                textAlign: "center",
                fontSize: 10,
              }}
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
              <Link
                to={"/home-admin"}
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                <GridAtom
                  p={1}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 120,
                    border: `1px solid ${BASE_COLORS.blue}`,
                  }}
                >
                  <HomeRoundedIcon style={{ color: BASE_COLORS.blue }} />
                </GridAtom>
              </Link>
              <Link
                to={"/login"}
                style={{ textAlign: "center", textDecoration: "none" }}
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
              </Link>
              <TextAtom
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: BASE_COLORS.blue,
                }}
              >
                Super Admin
              </TextAtom>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
      </ContainerAtom>
    </header>
  );
};
