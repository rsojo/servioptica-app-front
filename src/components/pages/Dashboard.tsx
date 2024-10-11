// src/components/Dashboard.tsx
import React from "react";
//import { useLocation } from "react-router-dom";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  SpaceAtom,
  TextAtom,
  TitleAtom,
} from "../atoms";
import DataTable from "../atoms/table";
import { BASE_COLORS } from "../../style/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import testImg from "../../assets/img/testBannerImg.webp";
import "swiper/css";
const Dashboard: React.FC = () => {
  //const location = useLocation();
  //const searchParams = new URLSearchParams(location.search);
  // const id = searchParams.get("id"); // Obtener el parámetro "id" si está presente

  return (
    <ContainerAtom style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <SpaceAtom v={40} />
      <RowAtom gap={5} style={{ minHeight: 400, flexFlow: 'wrap', maxWidth: 1440 }} p={3}>
        <ColumnAtom flex={7} style={{minWidth: 300}}>
          <GridAtom style={{ width: "100%" }}>
            <DataTable />
          </GridAtom>
        </ColumnAtom>
        <ColumnAtom flex={5} style={{minWidth: 300}}>
          <GridAtom style={{ width: "100%" }}>
            <TextAtom type="small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
              eleifend erat, eu posuere magna. Morbi justo urna, dignissim sit
              amet suscipit a, euismod sed orci. Phasellus dapibus erat vel ex
              ultrices tempus. Donec pretium, dolor id pellentesque luctus,
              massa elit mollis dolor, vitae consequat ipsum mauris vitae sem.
              In posuere, tortor quis placerat malesuada, odio justo tristique
              justo, ac placerat turpis ex id urna. Duis consequat pulvinar sem
              vitae pretium. Quisque molestie varius mi a imperdiet. Vestibulum
              eget sollicitudin massa. Curabitur condimentum sem quis massa
              ultricies vulputate. Donec porttitor gravida commodo. Donec et sem
              lacus. Integer maximus ut lacus sed dignissim. Duis aliquet
              pharetra augue, et varius nisi iaculis ut. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Fusce sed tellus orci. Curabitur risus orci, feugiat ac
              odio ac, lobortis vehicula nulla.
            </TextAtom>
          </GridAtom>
          <SpaceAtom v={40} />
          <GridAtom style={{ width: "100%" }}>
            <TitleAtom type="h3" style={{ color: BASE_COLORS.blue }}>
              Promociones
            </TitleAtom>
          </GridAtom>
          <SpaceAtom v={40} />
          <GridAtom style={{ width: "100%"}}>
            <Swiper
            style={{width: '100%'}}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination
              scrollbar={{ draggable: true }}
              onSwiper={(swiper: any) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <GridAtom alignItems="center" justifyContent="center" style={{width: '100%'}}>
                  <img
                    src={testImg}
                    alt="Test Img"
                    style={{ objectFit: "contain", width: '100%' }}
                  />
                </GridAtom>
              </SwiperSlide>
              <SwiperSlide>
                <GridAtom alignItems="center" justifyContent="center" style={{width: '100%'}}>
                  <img
                    src={testImg}
                    alt="Test Img"
                    style={{ objectFit: "contain", width: '100%' }}
                  />
                </GridAtom>
              </SwiperSlide>
            </Swiper>
          </GridAtom>
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default Dashboard;
