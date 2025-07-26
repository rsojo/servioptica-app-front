import { Link, useNavigate, useParams } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";

import bkDash from "../../../assets/img/bkDash-01.webp";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_COLORS } from "../../../style/constants";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { appStoreAtom } from "../../../store/Auth";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";


export const DashHeader = () => {
    const {id: idPedido} = useParams()
    const location = useLocation();
const isDashboardView = location.pathname.includes("/dashboard");

  
  const [appStore, setAppStore] = useAtom(appStoreAtom);

  const access_token = appStore.auth?.access_token || null;
  const idAdmin = appStore.auth?.admin || false;
  const navetgate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(idPedido || null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          height={300}
          alt="imagen del banner"
        />
      </GridAtom>
      <ContainerAtom style={{ zIndex: 2, marginBottom: 10 }}>
        <RowAtom className="HeaderRow" style={{ flexFlow: "wrap" }}>
          <ColumnAtom
            flex={3}
            alignItems="center"
            justifyContent="center"
            gap={2}
            style={{ minWidth: 300 }}
          >
              <img
                style={{ objectFit: "contain" }}
                src={LogoServioptica}
                alt={"Logo Servioptica"}
                width={215}
                height={91}
              />
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
            style={{ color: "var(--mainBtnColor)", minWidth: 60 }}
          >
            <RowAtom
              alignItems='flex-end'
              gap={2}
              style={{ justifyContent: 'flex-end' }}
            >
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e)=>appStore.auth?.access_token ? handleClick(e) : navetgate('/login')}
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
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAppStore({ auth: null, user: null });
                    localStorage.removeItem('appStoreAtom');
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
        <SpaceAtom v={48} />
        <GridAtom
          style={{ width: "100%", marginBottom: -50 }}
          alignItems="center"
          gap={2}
        >
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
            {!isDashboardView && 
              <ColumnAtom style={{ flex: "none" }}>
                <ButtonAtom
                  onClick={() => {
                    if (!access_token) return navetgate("/");
                    if (idAdmin) return navetgate("/dashboard-admin");
                    return navetgate("/dashboard");
                }}
                style={{
                  padding: 0,
                  minWidth: 40,
                  height: 40,
                  maxHeight: 40,
                  minHeight: 40,
                  width: 40,
                  backgroundColor: "#fff",
                  border: `1px solid ${BASE_COLORS.blue}`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeIcon style={{ color: BASE_COLORS.blue, fontSize: 16 }} />
              </ButtonAtom>
            </ColumnAtom>}
            <ColumnAtom flex={10}>
              <InputTextAtom
                field={{ id: "search_orders", placeholder: "Nº de Pedido" }}
                defaultValue={idPedido}
                onChangeCallback={(value) => {
                  setSearchValue(value as string);
                }}
              />
            </ColumnAtom>
            <ColumnAtom style={{ flex: "none" }}>
              <ButtonAtom
                disabled={!searchValue}
                onClick={() => {
                  console.log('onClick', 
                    searchValue,
                    idPedido,
                    idPedido === searchValue
                  )
                  if(idPedido === searchValue) {
                    window.location.replace(`/order-tracking/${searchValue}`);
                  }else{
                    navetgate(`/order-tracking/${searchValue}`);
                  }

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
