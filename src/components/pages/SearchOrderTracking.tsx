/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ColumnAtom, ContainerAtom, GridAtom, SpaceAtom } from "../atoms";
import { SwiperAtom } from "../atoms/swiper";
import { getPromotionsActives } from "../../api/Promotions";
import { CircularProgress } from "@mui/material";

const SearchOrderTracking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [promotionsData, setPromotionsData] = useState<Array<{
    img: string;
  }> | null>(null);

  const hasFetchedPromotions = useRef(false);

  const fetchPromotionsData = async () => {
    try {
      if (!promotionsData && !loading) {
        setLoading(true);
        const response = await getPromotionsActives();
        const formatingData = response.data.map((item) => ({
          img: item.img,
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

  const sliderDta = useMemo(() => {
    if (!promotionsData) return null;
    return promotionsData.map((item, index) => {
      return (
        <ColumnAtom key={index + 1} style={{ width: "100%", minHeight: 200 }} gap={4}>
          <img
            src={item.img}
            alt="Test Img"
            style={{ objectFit: "contain", width: "100%" }}
          />
        </ColumnAtom>
      );
    });
  }, [promotionsData]);

  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: 1440,
      }}
    >
      <SpaceAtom v={40} />
      <GridAtom
        gap={4}
        style={{ width: "100%", paddingBottom: 40 }}
        alignItems="center"
      >
        <span
          style={{
            borderBottom: "1px solid #DEDEDE",
            width: "100%",
            marginBottom: 40,
          }}
        />
        {loading && (
          <GridAtom
            p={5}
            style={{ minHeight: 320, width: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </GridAtom>
        )}
        {sliderDta && (
          <SwiperAtom data={sliderDta} slidesPerView={3} spaceBetween={36} />
        )}
      </GridAtom>
    </ContainerAtom>
  );
};

export default SearchOrderTracking;
