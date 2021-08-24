import React, { useEffect } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Share from 'expo-sharing';
import firebase from 'firebase/app';

import LogoItch from './src/componentes/Logo';
import SeccionBandera from './src/componentes/SeccionBandera';
import aguila from './assets/aguila.png';
import styles from './App.styles';

function BanderaContenedor(props) {
  return (
    <View style={{
      width: '100%',
      marginTop: 10,
    }}>
      {props.children}
    </View>
  )
}

const SeccionVerde = () => {
  return <SeccionBandera titulo="Verde" color="green" />
}

function BanderaMexico() {
  return (
    <BanderaContenedor>
      <SeccionVerde />
      <SeccionBandera titulo="Blanco" color="white" icon={aguila} resizeMode="cover" />
      <SeccionBandera titulo="Rojo" color="red" />
    </BanderaContenedor>
  )
}

function BanderaItalia() {
  return (
    <BanderaContenedor>
      <SeccionVerde />
      <SeccionBandera titulo="Blanco" color="white" />
      <SeccionBandera titulo="Rojo" color="red" />
    </BanderaContenedor>
  )
}

export default function App() {
  // Montaje
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCN_HQl9rLa2IsoJixR33F-5f0MqjzT9Cc",
      authDomain: "cursotec2021.firebaseapp.com",
      projectId: "cursotec2021",
      storageBucket: "cursotec2021.appspot.com",
      messagingSenderId: "431286485857",
      appId: "1:431286485857:web:00e82aa6bb589d8f007b20",
      measurementId: "G-LYG1T4VT6J"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // desmontaje
    return () => {
      // 
    }
  }, []);

  const manejaCompartir = async () => {
    await Share.shareAsync('./assets/aguila.png', {
      dialogTitle: 'Visita la página web del ITCH',
      mimeType: 'image/jpg',
    });

    console.log('Compartiendo finaliza...');
  };

  return (
    <View style={styles.contenedor}>
      <LogoItch />

      <TouchableOpacity 
        onPress={() => {
          console.log('Viva México');
        }}
        style={{
          width: '100%',
        }}
      >
        <BanderaMexico />
      </TouchableOpacity>
      
      <Button title="Compartir" onPress={manejaCompartir} />
    </View>
  );
}
