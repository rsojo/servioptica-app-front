import React, { useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContainerAtom from "../atoms/container";
import GridAtom from "../atoms/grid";
import TextAtom from "../atoms/text";
import { getMe, oidcStart } from "../../api/Auth";

const OidcLanding: React.FC = () => {
  const navigate = useNavigate();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    getMe().then(async (response) => {
      if (response.code !== 401) {
        navigate("/", { replace: true });
        return;
      }

      const returnTo = `${window.location.origin}/oidc/callback?silent=1`;
      const oidcResponse = await oidcStart(returnTo, { silent: true });

      if (!oidcResponse.error && oidcResponse.data?.authorization_url) {
        window.location.assign(oidcResponse.data.authorization_url);
        return;
      }

      navigate("/", { replace: true });
    });
  }, [navigate]);

  return (
    <ContainerAtom style={{ minHeight: 420 }}>
      <GridAtom alignItems="center" justifyContent="center" style={{ minHeight: 420 }} gap={3}>
        <CircularProgress />
        <TextAtom>Validando sesión OpenID...</TextAtom>
      </GridAtom>
    </ContainerAtom>
  );
};

export default OidcLanding;
