import { atom } from "jotai";

export interface Auth {
  access_token: string;
  admin: boolean;
  rol: string;
  document: string;
  auth_source?: "oidc_client" | "local_admin" | string;
  user_type?: string;
}

export interface UserData {
  id?: number;
  name: string;
  email: string;
  document?: string;
  oidc?: {
    id_contacto?: string;
    nit?: string;
    nombre?: string;
    razon_social?: string;
    punto?: string;
    grupo_empresarial?: string;
  };
}

export interface AppStoreAtom {
  auth: Auth | null;
  user: UserData | null;
}

const EXPIRATION_TIME = 60 * 60 * 1000; // 60m
const STORAGE_KEY = "appStoreAtom";

const getStoredAppState = (): AppStoreAtom => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (!storedState) return { auth: null, user: null };

  const parsedState = JSON.parse(storedState);
  const { timestamp, state } = parsedState;

  const now = new Date().getTime();
  if (now - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(STORAGE_KEY);
    return { auth: null, user: null };
  }

  return state;
};

const storeAppState = (state: AppStoreAtom) => {
  const timestamp = new Date().getTime();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ state, timestamp })
  );
};

export const appStoreAtom = atom<AppStoreAtom>(getStoredAppState());

export const persistAppStoreAtom = atom(
  (get) => get(appStoreAtom), 
  (get, set, newState: AppStoreAtom) => {
    set(appStoreAtom, newState);  
    storeAppState(newState); 
  }
);
