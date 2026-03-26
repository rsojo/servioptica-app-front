import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ContainerAtom from "../atoms/container";
import GridAtom from "../atoms/grid";
import TextAtom from "../atoms/text";
import { ButtonAtom } from "../atoms";
import { useAtom } from "jotai";
import { persistAppStoreAtom } from "../../store/Auth";
import { getMe, oidcCallback, oidcStart } from "../../api/Auth";
import { useMessage } from "../../hooks/useMessage";

const OIDC_DEBUG_MODE = false;

const OidcCallback: React.FC = () => {
  const [, setAppStore] = useAtom(persistAppStoreAtom);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { errorSnackMessage, successSnackMessage } = useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(!OIDC_DEBUG_MODE);
  const [errorText, setErrorText] = useState<string>("");
  const [backendResponse, setBackendResponse] = useState<any>(null);

  const hashParams = useMemo(() => {
    const hash = window.location.hash?.replace("#", "") || "";
    return new URLSearchParams(hash);
  }, []);

  const persistSessionAndGo = useCallback(async (props: {
    accessToken: string;
    tokenType?: string;
    admin?: boolean;
    document?: string;
    name?: string;
    email?: string;
    id?: number;
  }) => {
    try {
      const meResponse = await getMe(props.accessToken);
      const profile = meResponse.data;

      setAppStore({
        auth: {
          access_token: props.accessToken,
          rol: profile?.admin ? "admin" : "user",
          admin: Boolean(profile?.admin),
          document: profile?.user?.document || props.document || "",
          auth_source: profile?.auth_source || "oidc_client",
          user_type: profile?.type,
        },
        user: {
          id: profile?.user?.id || props.id,
          name: profile?.user?.name || props.name || "",
          email: profile?.user?.email || props.email || "",
          document: profile?.user?.document || props.document,
          oidc: profile?.oidc,
        },
      });

      successSnackMessage("Inicio de sesión OpenID exitoso.");
      navigate(profile?.admin ? "/dashboard-admin" : "/dashboard", { replace: true });
    } catch (error: any) {
      const message = error?.message || "No fue posible finalizar el login OIDC.";
      setErrorText(message);
      errorSnackMessage(message);
      setIsLoading(false);
    }
  }, [errorSnackMessage, navigate, setAppStore, successSnackMessage]);

  const getCallbackPayload = useCallback(() => {
    const queryCode = searchParams.get("code");
    const queryState = searchParams.get("state");
    const hashCode = hashParams.get("code");
    const hashState = hashParams.get("state");

    return {
      code: queryCode || hashCode || "",
      state: queryState || hashState || "",
    };
  }, [hashParams, searchParams]);

  const runBackendCallback = useCallback(async () => {
    const payload = getCallbackPayload();

    if (!payload.code || !payload.state) {
      const message = "No llegaron parámetros code/state desde OpenID.";
      setErrorText(message);
      errorSnackMessage(message);
      return;
    }

    setIsLoading(true);
    setErrorText("");

    const response = await oidcCallback(payload);
    setBackendResponse(response);

    if (response.error || !response.data?.access_token) {
      const message = response.message || "No fue posible completar el callback OIDC.";
      setErrorText(message);
      errorSnackMessage(message);
      setIsLoading(false);
      return;
    }

    await persistSessionAndGo({
      accessToken: response.data.access_token,
      tokenType: response.data.token_type,
      admin: response.data.admin,
      document: response.data.user?.document,
      name: response.data.user?.name,
      email: response.data.user?.email,
      id: response.data.user?.id,
    });

    setIsLoading(false);
  }, [errorSnackMessage, getCallbackPayload, persistSessionAndGo]);

  useEffect(() => {
    if (OIDC_DEBUG_MODE) {
      setIsLoading(false);
      return;
    }

    const oidcError = searchParams.get("error");
    const oidcErrorDescription = searchParams.get("error_description");

    if (oidcError) {
      const message = oidcErrorDescription
        ? `${oidcError}: ${oidcErrorDescription}`
        : `Error OpenID: ${oidcError}`;
      setErrorText(message);
      errorSnackMessage(message);
      setIsLoading(false);
      return;
    }

    const accessToken =
      searchParams.get("access_token") || hashParams.get("access_token");
    const tokenType =
      searchParams.get("token_type") || hashParams.get("token_type") || "Bearer";
    const adminFromQuery =
      searchParams.get("admin") || hashParams.get("admin") || "false";
    const documentFromQuery =
      searchParams.get("document") || hashParams.get("document") || undefined;

    if (accessToken) {
      void persistSessionAndGo({
        accessToken,
        tokenType,
        admin: adminFromQuery === "true",
        document: documentFromQuery,
      });
      return;
    }

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      setErrorText("Callback OIDC inválido: faltan parámetros code/state.");
      errorSnackMessage("Error en callback OIDC.");
      setIsLoading(false);
      return;
    }

    oidcCallback({ code, state }).then((response) => {
      if (response.error || !response.data?.access_token) {
        setErrorText(response.message || "No fue posible completar el login OpenID.");
        errorSnackMessage(response.message || "No fue posible completar el login OpenID.");
        setIsLoading(false);
        return;
      }

      void persistSessionAndGo({
        accessToken: response.data.access_token,
        tokenType: response.data.token_type,
        admin: response.data.admin,
        document: response.data.user?.document,
        name: response.data.user?.name,
        email: response.data.user?.email,
        id: response.data.user?.id,
      });
    });
  }, [errorSnackMessage, hashParams, persistSessionAndGo, searchParams]);

  const retryOpenId = async () => {
    setIsLoading(true);
    setErrorText("");
    const returnTo = `${window.location.origin}/oidc/callback`;
    const response = await oidcStart(returnTo);

    if (response.error || !response.data?.authorization_url) {
      const message = response.message || "No fue posible iniciar OpenID.";
      errorSnackMessage(message);
      setErrorText(message);
      setIsLoading(false);
      return;
    }

    window.location.assign(response.data.authorization_url);
  };

  return (
    <ContainerAtom style={{ minHeight: 420 }}>
      <GridAtom alignItems="center" justifyContent="center" style={{ minHeight: 420 }} gap={3}>
        {OIDC_DEBUG_MODE && (
          <GridAtom gap={2} style={{ width: "100%", maxWidth: 920, padding: "20px" }}>
            <TextAtom style={{ fontWeight: 700 }}>OIDC Callback - Modo Debug</TextAtom>
            <TextAtom type="small">Revisa los datos recibidos desde OpenID antes de enviarlos al backend.</TextAtom>

            <pre
              style={{
                width: "100%",
                maxHeight: 240,
                overflow: "auto",
                background: "#0d1117",
                color: "#c9d1d9",
                padding: "12px",
                borderRadius: 8,
                fontSize: 12,
              }}
            >
{JSON.stringify(
  {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    query: Object.fromEntries(searchParams.entries()),
    hashParams: Object.fromEntries(new URLSearchParams((window.location.hash || "").replace("#", "")).entries()),
    callbackPayload: getCallbackPayload(),
  },
  null,
  2
)}
            </pre>

            <GridAtom style={{ width: "100%" }} gap={2}>
              <ButtonAtom onClick={runBackendCallback} disabled={isLoading}>
                Enviar callback al backend
              </ButtonAtom>
              <ButtonAtom variant="outlined" onClick={retryOpenId} disabled={isLoading}>
                Reintentar login OIDC
              </ButtonAtom>
            </GridAtom>

            {backendResponse && (
              <pre
                style={{
                  width: "100%",
                  maxHeight: 240,
                  overflow: "auto",
                  background: "#0d1117",
                  color: "#c9d1d9",
                  padding: "12px",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
{JSON.stringify(backendResponse, null, 2)}
              </pre>
            )}
          </GridAtom>
        )}

        {isLoading && (
          <>
            <CircularProgress />
            <TextAtom>Procesando autenticación OpenID...</TextAtom>
          </>
        )}

        {!isLoading && Boolean(errorText) && (
          <>
            <TextAtom>{errorText}</TextAtom>
            <ButtonAtom onClick={retryOpenId}>Reintentar login OIDC</ButtonAtom>
            <ButtonAtom variant="outlined" onClick={() => navigate("/login", { replace: true })}>
              Ir a login administrador
            </ButtonAtom>
          </>
        )}
      </GridAtom>
    </ContainerAtom>
  );
};

export default OidcCallback;
