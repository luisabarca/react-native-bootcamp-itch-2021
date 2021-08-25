import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';

import { firebaseConfig } from './src/utils';
import Login from './src/pantallas/Login';
import Home from './src/pantallas/Home';
import Alumnos from './src/pantallas/Alumnos';

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
  // Montaje
  useEffect(() => {
    // Verifica que no esté duplicada.
    if (firebase.apps.length === 0) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    // desmontaje
    return () => {
      // código para limpieza.
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
