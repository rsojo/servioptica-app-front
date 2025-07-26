import { useMemo } from "react";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../atoms";
import { SwiperAtom } from "../../atoms/swiper";
import { BASE_COLORS } from "../../../style/constants";
import { Link } from "react-router-dom";

export const SliderDash = ({
  data,
}: {
  data: Array<{ description: string; title: string; img: string, link?: string }>;
}) => {
  const sliderDta = useMemo(
    () =>
      data.map((item, index) => {
        return (
          <ColumnAtom key={index + 1} style={{ width: "100%" }} gap={4}>
            <ColumnAtom flex={6} style={{ width: "100%" }}>
              <TextAtom type="small">{item.description}</TextAtom>
            </ColumnAtom>
            <ColumnAtom flex={6} style={{ width: "100%" }} gap={2}>
              <TitleAtom type="h3" style={{ color: BASE_COLORS.blue }}>
                {item.title}
              </TitleAtom>
              {item.img &&
                <GridAtom style={{minHeight: 180}}>
                {item.link && item.link.length > 0 ? <Link to={item.link || "#"} target="_blank" style={{ width: "100%" }}>
                  <img
                    src={item.img}
                    alt="Test Img"
                    style={{ objectFit: "contain", width: "100%" }}
                    />
                </Link> : <img
                    src={item.img}
                    alt="Test Img"
                    style={{ objectFit: "contain", width: "100%" }}
                  />
                  }
              </GridAtom>}
            </ColumnAtom>
          </ColumnAtom>
        );
      }),
    [data]
  );

  return (
    <GridAtom style={{ width: "100%" }}>
      <SwiperAtom data={sliderDta} />
    </GridAtom>
  );
};
