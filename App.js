import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';

import { firebaseConfig, guardarPushToken, setUsuarioConSesionActiva, setUsuarioSinSesionActiva } from './src/utils';
import Login from './src/pantallas/Login';
import Home from './src/pantallas/Home';
import Alumnos from './src/pantallas/Alumnos';
import Loading from './src/pantallas/Loading';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Alumnos" component={Alumnos} />
    </Tab.Navigator>
  )
}

export default function App() {
  // Referencia al NavigationContainer
  const navigatorRef = useRef(null);

  // Función llamada cuando la sesión del usuario cambia.
  const alCambiarSesion = (usuario) => {
    // Si el usuario es null es que no tiene sesión.
    if (!usuario) {
      setUsuarioSinSesionActiva();
      navigatorRef.current.navigate('Login');
    } else {
      // Usuario con sesión
      setUsuarioConSesionActiva();
      // Mandar a la pantalla principal
      navigatorRef.current.navigate('Principal');
    }
  };

  // Montaje
  useEffect(() => {
    // Verifica que no esté duplicada.
    if (firebase.apps.length === 0) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    // Observa cuando la sesión del usuario ha cambiado.
    firebase.auth().onAuthStateChanged(alCambiarSesion);

    // desmontaje
    return () => {
      // código para limpieza.
    }
  }, []);

  useEffect(() => {
    const runAsync = async () => {
      // Checamos que permiso tenemos.
      const permiso = await Notifications.getPermissionsAsync();

      // No tengo permiso para mandar notificaciones.
      if (!permiso.granted) {
        // Mostrar la pantalla para que el usuario nos otorgue el permiso.
        await Notifications.requestPermissionsAsync();
      }

      // Si es un teléfono real obtenemos el push token.
      if (Constants.isDevice) {
        const token = await Notifications.getExpoPushTokenAsync();
        await guardarPushToken(token.data);
      }

      // Agregamos notificación para ser mostrada en Navidad.
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'ITCH',
          body: 'Feliz navidad',
          badge: 1,
          sound: true,
        },
        trigger: {
          date: new Date(2021, 12, 24, 23, 59, 59),
        },
      });
    };

    // Nos registramos para leer las notificaciones cuando la app está en primer plano o activa.
    const subscription = Notifications.addNotificationReceivedListener((notificacion) => {
      console.log('Notificación recibida', notificacion);

      if (notificacion && notificacion.request.content.data.accion == 'redirect') {
        navigatorRef.current.navigate(notificacion.request.content.data.ruta);
      }
    });

    // Cuando el usuario da click en la notificacion
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(({notification}) => {
      console.log('Notificación recibida desde segundo plano', notification);

      if (notification && notification.request.content.data.accion == 'redirect') {
        navigatorRef.current.navigate(notification.request.content.data.ruta);
      }
    });

    runAsync();

    // Limpieza: Cerramos la subscripción
    return () => {
      Notifications.removeNotificationSubscription(subscription);
      Notifications.removeNotificationSubscription(backgroundSubscription);
    }
  }, []);

  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
