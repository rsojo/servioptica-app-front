import { useMemo } from "react";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../atoms";
import { SwiperAtom } from "../../atoms/swiper";
import { BASE_COLORS } from "../../../style/constants";

export const SliderDash = ({
  data,
}: {
  data: Array<{ description: string; title: string; img: string }>;
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
              {item.img && <GridAtom style={{minHeight: 180}}>
                <img
                  src={item.img}
                  alt="Test Img"
                  style={{ objectFit: "contain", width: "100%" }}
                />
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
