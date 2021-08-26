import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_STATUS } from "./constants";

export const firebaseConfig = {
  apiKey: "AIzaSyCN_HQl9rLa2IsoJixR33F-5f0MqjzT9Cc",
  authDomain: "cursotec2021.firebaseapp.com",
  projectId: "cursotec2021",
  storageBucket: "cursotec2021.appspot.com",
  messagingSenderId: "431286485857",
  appId: "1:431286485857:web:00e82aa6bb589d8f007b20",
  measurementId: "G-LYG1T4VT6J",
};


const guardarLocal  = async (clave, valor) => {
  await AsyncStorage.setItem(clave, valor);
};

const leerLocal  = async (clave) => {
  return await AsyncStorage.getItem(clave);
};

/**
 * Establece un usuario con sesión activa.
 */
export const setUsuarioConSesionActiva = async () => {
  await guardarLocal(SESSION_STATUS, 'si');
};

/**
 * Establece un usuario con sesión activa.
 */
 export const setUsuarioSinSesionActiva = async () => {
  await AsyncStorage.removeItem(SESSION_STATUS);
};

/**
 * Obtiene el status de sesión de un usuario.
 */
 export const obtenUsuarioStatusUsuario = async () => {
  return await leerLocal(SESSION_STATUS);
};

/**
 * Verifica si el usuario tiene sesión activa.
 * 
 * @returns 
 */
export const esUsuarioConSesionActiva = async () => {
  const valor = await leerLocal(SESSION_STATUS);

  return valor == 'si';
};