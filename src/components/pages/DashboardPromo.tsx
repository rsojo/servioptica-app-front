// src/components/Dashboard.tsx
import React from "react";
// import { useLocation } from "react-router-dom";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import DataTable from "../atoms/table";
import testImg from "../../assets/img/testBannerImg.webp";
import { SliderDash } from "../organisms/sliderDash";

const DashboardPromp: React.FC = () => {
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
          <SliderDash
            data={[
              {
                img: testImg,
                title: "Promociones",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque condimentum lacus eu dapibus. Aliquam eros augue, sagittis at quam quis, porta rhoncus lorem. Vivamus accumsan varius eros, vel varius nisi mollis in. Sed neque tellus, commodo in leo ultricies, egestas finibus diam. Quisque sed aliquam dui, in gravida diam. Nullam volutpat mi interdum, elementum lectus et, cursus magna. In aliquet in ligula sit amet facilisis. Nam iaculis aliquet velit vitae sagittis. Fusce mollis, nunc et congue placerat, lectus turpis mattis ipsum, id laoreet diam tellus sit amet quam. Nulla eu ligula nisl. Proin egestas dictum eros, et efficitur mauris consequat nec. Praesent efficitur neque urna, mattis malesuada tellus venenatis et. Proin pretium est lacus, finibus mattis augue posuere a. In ante nunc, tempus et justo eu, vulputate lacinia dolor. Nulla facilisi.",
              },
              { img: testImg, title: "Promociones", description: "hola mundo" },
              {
                img: testImg,
                title: "Promociones",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque condimentum lacus eu dapibus. Aliquam eros augue, sagittis at quam quis, porta rhoncus lorem. Vivamus accumsan varius eros, vel varius nisi mollis in. Sed neque tellus, commodo in leo ultricies, egestas finibus diam. Quisque sed aliquam dui, in gravida diam. Nullam volutpat mi interdum, elementum lectus et, cursus magna. In aliquet in ligula sit amet facilisis. Nam iaculis aliquet velit vitae sagittis. Fusce mollis, nunc et congue placerat, lectus turpis mattis ipsum, id laoreet diam tellus sit amet quam. Nulla eu ligula nisl. Proin egestas dictum eros, et efficitur mauris consequat nec. Praesent efficitur neque urna, mattis malesuada tellus venenatis et. Proin pretium est lacus, finibus mattis augue posuere a. In ante nunc, tempus et justo eu, vulputate lacinia dolor. Nulla facilisi.",
              },
            ]}
          />
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default DashboardPromp;
