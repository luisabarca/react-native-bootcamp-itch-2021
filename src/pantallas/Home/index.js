import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, SafeAreaView, Button } from "react-native";
import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';

import LogoItch from "../../componentes/Logo";
import styles from './styles';
import { logout } from "../../utils/firestore";

const Noticia = ({datos}) => {
  return (
    <View style={{
      flex: 1,
      width: '100%',

    }}>
      <Image source={{
        uri: datos.thumbnailUrl,
      }} style={{
        flex: 1,
        height: 120,
      }} />
    </View>
  )
};

const Home = () => {
  const db = firebase.firestore();
  const [aviso, setAviso] = useState({
    titulo: '',
    aviso: '',
  });
  const [noticias, setNoticias] = useState([]);
  
  // Cuando la pantalla, obtener datos de un REST API.
  useEffect(() => {  
    fetch('https://jsonplaceholder.typicode.com/photos').then(async (response) => {
      const datos = await response.json();

      setNoticias(datos.slice(0, 5));
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  // Cuando carga la pantalla, obtener datos de firestore.
  useEffect(() => {  
    // db.collection("avisos").doc("aviso-principal").get().then((aviso) => {
    //   setAviso(aviso.data());
    // }).catch((error) => {
    //   console.log(error);
    // });

    // Observador que ejecuta un callback cada vez que recibimos un cambio de Firestore.
    // Actualiza la variable de estado y provoca un nuevo render.
    db.collection("avisos").doc("aviso-principal").onSnapshot(((docAviso) => {
      setAviso(docAviso.data());
    }));
  }, []);

  const renderNoticia = ({item}) => {
    return (
      <Noticia key={`noticia-${item.id}`} datos={item} />
    )
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <LogoItch />

      <Button title="Salir" onPress={onLogout} />

      {/* {
        noticias.length > 0 &&
        <View>
          <Text>{noticias[0].title}</Text>
        </View>
      } */}
      
      {
        aviso && 
        <React.Fragment>
          <Text style={{
            fontWeight: '700',
            fontSize: 21,
          }}>{aviso.titulo}</Text>
          <Text style={{
            backgroundColor: '#f9f9f9',
            fontSize: 18,
            padding: 10,
          }}>{aviso.aviso}</Text>
        </React.Fragment>
      }

      {
        noticias.length > 0 ? 
        <FlatList 
          style={{
            flex: 1,
            width: '100%',
          }}
          data={noticias}
          renderItem={renderNoticia}
        /> : <ActivityIndicator />
      }
      
{/* 
      <ScrollView style={{
        flex: 1,
        height: 500,
        width: '100%',
      }}>
      {
        noticias.map((noticia) => {
          return 
        })
      }
      </ScrollView> */}
      
    </SafeAreaView>
  );
};

export default Home;