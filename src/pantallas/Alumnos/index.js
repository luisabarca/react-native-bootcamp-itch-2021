import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";

import LogoItch from "../../componentes/Logo";
import { logout, useGetFirestoreAlumnos } from "../../utils/firestore";
import styles from './styles';

const Alumnos = () => {
  // custom hook.
  const items = useGetFirestoreAlumnos();

  const renderAlumno = ({item}) => {
    return (
      <View style={{
        flex: 1,
        width: '100%',
        padding: 10,
      }}>
        <ImageBackground
          source={{
            uri: item.foto,
          }}
          resizeMode="cover"
          style={{
            flex: 1,
            height: 140,
            width: '100%',
            minWidth: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{
            fontWeight: '500',
            fontSize: 16,
            color: 'white',
            padding: 10,
            backgroundColor: '#000000ee'
          }}>
            {item.nombre} {item.apellidos}
          </Text>
        </ImageBackground>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <LogoItch />

      <Text>Bienvenido alumno registrado</Text>

      <Button title="Salir" onPress={logout} />

      {
        items.length > 0 && 
        <FlatList 
          data={items}
          showsHorizontalScrollIndicator={false}
          renderItem={renderAlumno}
        />
      }

      {
        items.length < 1 && 
        <ActivityIndicator color="black" size="large" />
      }
    </SafeAreaView>
  );
};

export default Alumnos;