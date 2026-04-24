// src/App.tsx
import React, { useEffect, useRef } from 'react';
import AppRouter from './router/AppRouter';
import { MessageProvider } from './context/MessageContext';
import { useAtom } from 'jotai';
import { persistAppStoreAtom } from './store/Auth';
import { getMe, oidcStart } from './api/Auth';

const SessionBootstrap: React.FC = () => {
  const [appStore, setAppStore] = useAtom(persistAppStoreAtom);
  const validatedTokenRef = useRef<string | null>(null);
  const unauthCheckedRef = useRef(false);
  const silentAttemptedRef = useRef(false);

  const isIndexRoute = () => window.location.pathname === '/';
  const isOidcCallbackRoute = () => {
    const path = window.location.pathname;
    return (
      path === '/oidc/callback' ||
      path === '/api/auth/oidc/callback' ||
      path === '/oidc/logout/callback' ||
      path === '/api/auth/oidc/logout/callback'
    );
  };

  useEffect(() => {
    const token = appStore.auth?.access_token;
    const document = appStore.auth?.document;

    const startSilentOidc = async () => {
      if (silentAttemptedRef.current || !isIndexRoute() || isOidcCallbackRoute()) {
        return;
      }

      silentAttemptedRef.current = true;
      const returnTo = window.location.href;
      const oidcResponse = await oidcStart(returnTo, { silent: true });

      if (!oidcResponse.error && oidcResponse.data?.authorization_url) {
        window.location.assign(oidcResponse.data.authorization_url);
      }
    };

    if (!token) {
      validatedTokenRef.current = null;
      if (unauthCheckedRef.current) {
        return;
      }

      unauthCheckedRef.current = true;
      getMe().then((response) => {
        if (response.code === 401) {
          void startSilentOidc();
          return;
        }

        if (response.error) {
          setAppStore({ auth: null, user: null });
        }
      });
      return;
    }

    unauthCheckedRef.current = false;

    if (validatedTokenRef.current === token) {
      return;
    }

    validatedTokenRef.current = token;

    getMe(token).then((response) => {
      if (response.code === 401) {
        setAppStore({ auth: null, user: null });
        void startSilentOidc();
        return;
      }

      if (response.error) {
        setAppStore({ auth: null, user: null });
        return;
      }

      if (response.data) {
        const meData: any = response.data;
        const authSourceValue = String(meData.auth_source || "").toLowerCase();
        const typeValue = String(meData.type || "").toLowerCase();
        const authSourceIsLocalAdmin = authSourceValue === "local_admin";
        const typeIsAdmin = typeValue === "admin";
        const normalizedUser = meData.user || {
          id: meData.id,
          name: meData.name,
          email: meData.email,
          document: meData.document,
        };

        const isCurrentLocalAdmin =
          appStore.auth?.auth_source === "local_admin" && Boolean(appStore.auth?.admin);

        const isAdmin = isCurrentLocalAdmin
          ? true
          : (typeof meData.admin === "boolean"
              ? meData.admin
              : authSourceIsLocalAdmin || typeIsAdmin || Boolean(appStore.auth?.admin));

        setAppStore({
          auth: {
            access_token: token,
            admin: isAdmin,
            rol: isAdmin ? 'admin' : 'user',
            document: normalizedUser?.document || document || '',
            auth_source: meData.auth_source || appStore.auth?.auth_source,
            user_type: meData.type || appStore.auth?.user_type,
          },
          user: normalizedUser
            ? {
                id: normalizedUser.id,
                name: normalizedUser.name || '',
                email: normalizedUser.email || '',
                document: normalizedUser.document,
                oidc: meData.oidc,
              }
            : null,
        });
      }
    });
  }, [appStore.auth?.access_token, appStore.auth?.admin, appStore.auth?.document, setAppStore]);

  return null;
};

const App: React.FC = () => {
  return (
    <MessageProvider>
      <SessionBootstrap />
      <AppRouter />
    </MessageProvider>
  );
};

export default App;
