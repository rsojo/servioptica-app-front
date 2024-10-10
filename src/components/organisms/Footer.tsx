// src/components/Footer.tsx
import React from "react";
import TextAtom from "../atoms/text";
import ContainerAtom from "../atoms/container";
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer>
      <ContainerAtom style={{padding: 40}}>
        <TextAtom style={{textAlign: 'center', color: "#024F8F" }}>
          © 2024 by Servioptica | Todos los derechos Reservados. | <Link to={'/faq'} style={{color: "#024F8F" }}>Faq</Link>
        </TextAtom>
      </ContainerAtom>
    </footer>
  );
};

export default Footer;
