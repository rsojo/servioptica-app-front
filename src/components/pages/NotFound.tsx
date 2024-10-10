// src/components/pages/NotFound.tsx
import React from "react";
import GridAtom from "../atoms/grid";
import ContainerAtom from "../atoms/container";
import ButtonAtom from "../atoms/button";
import { useNavigate } from "react-router-dom";
import TextAtom from "../atoms/text";
import TitleAtom from "../atoms/title";

const NotFound: React.FC = () => {
  const navigation = useNavigate();
  return (
    <ContainerAtom>
      <GridAtom
        gap={8}
        justifyContent="center"
        alignItems="center"
        p={2}
        style={{ height: "57vh", minHeight: 400 }}
      >
        <GridAtom>
          <TitleAtom type="h1" style={{ textAlign: "center", width: "100%" }}>
            404 - Página no encontrada
          </TitleAtom>
          <TextAtom
            type="body"
            style={{ textAlign: "center", width: "100%", opacity: 0.7 }}
          >
            Lo sentimos, la página que busca no existe.
          </TextAtom>
        </GridAtom>
        <ButtonAtom onClick={() => navigation("/")}>Ir al inicio</ButtonAtom>
      </GridAtom>
    </ContainerAtom>
  );
};

export default NotFound;
