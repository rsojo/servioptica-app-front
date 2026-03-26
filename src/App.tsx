// src/App.tsx
import React, { useEffect, useRef } from 'react';
import AppRouter from './router/AppRouter';
import { MessageProvider } from './context/MessageContext';
import { useAtom } from 'jotai';
import { persistAppStoreAtom } from './store/Auth';
import { getMe } from './api/Auth';

const SessionBootstrap: React.FC = () => {
  const [appStore, setAppStore] = useAtom(persistAppStoreAtom);
  const validatedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const token = appStore.auth?.access_token;
    const document = appStore.auth?.document;

    if (!token) {
      validatedTokenRef.current = null;
      return;
    }

    if (validatedTokenRef.current === token) {
      return;
    }

    validatedTokenRef.current = token;

    getMe(token).then((response) => {
      if (response.code === 401 || response.error) {
        setAppStore({ auth: null, user: null });
        return;
      }

      if (response.data) {
        setAppStore({
          auth: {
            access_token: token,
            admin: Boolean(response.data.admin),
            rol: response.data.admin ? 'admin' : 'user',
            document: response.data.user?.document || document || '',
            auth_source: response.data.auth_source,
            user_type: response.data.type,
          },
          user: response.data.user
            ? {
                id: response.data.user.id,
                name: response.data.user.name || '',
                email: response.data.user.email || '',
                document: response.data.user.document,
                oidc: response.data.oidc,
              }
            : null,
        });
      }
    });
  }, [appStore.auth?.access_token, appStore.auth?.document, setAppStore]);

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
