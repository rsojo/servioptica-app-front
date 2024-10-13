// src/components/Dashboard.tsx
import React from "react";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import DataTable from "../atoms/table";
import { Link } from "react-router-dom";
import imgBtnGoFAQ from "../../assets/img/imgBtnGoFAQ.webp";
import imgBtnGoUserAdmin from "../../assets/img/imgBtnGoUserAdmin.webp";

const DashboardOpt: React.FC = () => {
  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SpaceAtom v={40} />
      <RowAtom
        gap={10}
        style={{
          minHeight: 400,
          flexFlow: "wrap",
          maxWidth: 1440,
          width: "100%",
        }}
        p={3}
      >
        <ColumnAtom flex={8} style={{ minWidth: 300 }}>
          <GridAtom style={{ width: "100%" }}>
            <DataTable />
          </GridAtom>
        </ColumnAtom>
        <ColumnAtom flex={4} style={{ minWidth: 300 }} gap={2}>
          <Link to={"/dashboard-opt"} style={{width: '100%', maxWidth: 420}}>
            <img src={imgBtnGoFAQ} alt="Imágen btn FAQ" width={651} style={{width: '100%'}}/>
          </Link>
          <Link to={"/dashboard-opt"} style={{width: '100%', maxWidth: 420}}>
            <img src={imgBtnGoUserAdmin} alt="Imágen btn FAQ" width={651} style={{width: '100%'}}/>
          </Link>
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default DashboardOpt;
