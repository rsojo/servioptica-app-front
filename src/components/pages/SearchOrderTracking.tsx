import React from "react";
import { ColumnAtom, ContainerAtom, GridAtom, SpaceAtom } from "../atoms";
import { SwiperAtom } from "../atoms/swiper";
import testImg from "../../assets/img/testBannerImg.webp";

const SearchOrderTracking: React.FC = () => {
  const data = [
    { img: testImg },
    { img: testImg },
    { img: testImg },
    { img: testImg },
    { img: testImg },
    { img: testImg },
    { img: testImg },
  ];

  const sliderDta = data.map((item, index) => {
    return (
      <ColumnAtom key={index + 1} style={{ width: "100%" }} gap={4}>
        <img
          src={item.img}
          alt="Test Img"
          style={{ objectFit: "contain", width: "100%" }}
        />
      </ColumnAtom>
    );
  });

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
      <GridAtom gap={4} style={{ width: "100%" }} alignItems="center">
        <span
          style={{
            borderBottom: "1px solid #DEDEDE",
            width: "100%",
            marginBottom: 40,
          }}
        />
        <SwiperAtom data={sliderDta} slidesPerView={3} spaceBetween={36} />
      </GridAtom>
    </ContainerAtom>
  );
};

export default SearchOrderTracking;
