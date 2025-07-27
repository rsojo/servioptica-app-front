import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import GridAtom from "../grid";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + ' CustomBullet"></span>';
  },
};

export const SwiperAtom = ({
  data,
  slidesPerView,
  spaceBetween
}: {
  data: Array<any>;
  slidesPerView?: number;
  spaceBetween?: number;
}) => {
  return (
    <Swiper
      style={{ width: "100%" }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={spaceBetween || 50}
      slidesPerView={slidesPerView || 1}
      navigation
      pagination={pagination} // Activar paginación por puntos clicables
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000, // milisegundos entre slides
        disableOnInteraction: false, // sigue reproduciendo aunque el usuario interactúe
      }}
      onSwiper={(swiper: any) => {}}
      onSlideChange={() => {}}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index + 1}>
            <GridAtom
              alignItems="center"
              justifyContent="center"
              style={{ width: "100%", height: "100%", paddingBottom: 40 }}
            >
              {item}
            </GridAtom>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
