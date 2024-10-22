import { atom } from "jotai";

interface Auth {
  access_token: string;
  rol: string;
}

interface UserData {
  name: string;
  email: string;
}

interface AppStoreAtom {
  auth: Auth | null;
  user: UserData | null;
}

const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos
const STORAGE_KEY = "appStoreAtom";

// Función para obtener el estado del almacenamiento local
const getStoredAppState = (): AppStoreAtom => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (!storedState) return { auth: null, user: null };

  const parsedState = JSON.parse(storedState);
  const { timestamp, state } = parsedState;

  // Comprobar si la data ha expirado
  const now = new Date().getTime();
  if (now - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(STORAGE_KEY);
    return { auth: null, user: null };
  }

  return state;
};

// Función para guardar el estado en el almacenamiento local con marca de tiempo
const storeAppState = (state: AppStoreAtom) => {
  const timestamp = new Date().getTime();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ state, timestamp })
  );
};

// Creación del átomo con estado inicial desde localStorage
export const appStoreAtom = atom<AppStoreAtom>(getStoredAppState());

export const persistAppStoreAtom = atom(
  (get) => get(appStoreAtom), 
  (get, set, newState: AppStoreAtom) => {
    set(appStoreAtom, newState);  
    storeAppState(newState); 
  }
);
