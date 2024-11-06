import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { appStoreAtom } from "../../../store/Auth";
import { useAtom } from "jotai";

export const DashHeader = () => {
  const [, setAppStore] = useAtom(appStoreAtom);
  const navetgate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
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
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
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
            <ColumnAtom flex={10}>
              <InputTextAtom
                field={{ id: "search_orders", placeholder: "Nº de Pedido" }}
                onChangeCallback={(value) => {
                  setSearchValue(value as string);
                  console.log(value);
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
      </ContainerAtom>
    </header>
  );
};
