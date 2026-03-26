import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerAtom from "../atoms/container";
import GridAtom from "../atoms/grid";
import TextAtom from "../atoms/text";
import { useAtom } from "jotai";
import { persistAppStoreAtom } from "../../store/Auth";
import { oidcLogoutCallback } from "../../api/Auth";

const OidcLogoutCallback: React.FC = () => {
  const navigate = useNavigate();
  const [, setAppStore] = useAtom(persistAppStoreAtom);

  useEffect(() => {
    let timer: number | undefined;

    oidcLogoutCallback()
      .catch(() => null)
      .finally(() => {
        setAppStore({ auth: null, user: null });
        localStorage.removeItem("appStoreAtom");
        timer = window.setTimeout(() => {
          navigate("/", { replace: true });
        }, 900);
      });

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [navigate, setAppStore]);

  return (
    <ContainerAtom style={{ minHeight: 300 }}>
      <GridAtom alignItems="center" justifyContent="center" style={{ minHeight: 300 }}>
        <TextAtom>Cerrando sesión...</TextAtom>
      </GridAtom>
    </ContainerAtom>
  );
};

export default OidcLogoutCallback;
