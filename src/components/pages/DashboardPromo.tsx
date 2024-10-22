/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Dashboard.tsx
import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import DataTable from "../atoms/table";
import { SliderDash } from "../organisms/sliderDash";
import { getPromotionsActives } from "../../api/Promotions";
import { CircularProgress } from "@mui/material";

const DashboardPromp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [promotionsData, setPromotionsData] = useState<Array<{
    img: string;
    title: string;
    description: string;
  }> | null>(null);

  const hasFetchedPromotions = useRef(false);

  const fetchPromotionsData = async () => {
    try {
      if (!promotionsData && !loading) {
        setLoading(true);
        const response = await getPromotionsActives();
        const formatingData = response.data.map((item) => ({
          img: item.img,
          title: item.title,
          description: item.description,
        }));
        setPromotionsData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedPromotions.current && !loading) {
      hasFetchedPromotions.current = true;
      fetchPromotionsData();
    }
  }, [loading]);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const id = searchParams.get("id"); // Obtener el parámetro "id" si está presente
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
        <ColumnAtom flex={7} style={{ minWidth: 300 }}>
          <GridAtom style={{ width: "100%" }}>
            <DataTable />
          </GridAtom>
        </ColumnAtom>
        <ColumnAtom flex={5} style={{ minWidth: 300 }}>
          {loading && (
            <GridAtom
              p={5}
              style={{ minHeight: 320, width: '100%'}}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </GridAtom>
          )}
          {promotionsData && <SliderDash data={promotionsData} />}
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default DashboardPromp;
