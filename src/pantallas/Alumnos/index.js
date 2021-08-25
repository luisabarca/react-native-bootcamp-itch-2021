import React from "react";
import { View, Text } from "react-native";

import LogoItch from "../../componentes/Logo";
import styles from './styles';

const Alumnos = () => {
  return (
    <View style={styles.contenedor}>
      <LogoItch />

      <Text>Bienvenido alumno registrado</Text>
    </View>
  );
};

export default Alumnos;