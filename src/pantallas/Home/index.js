import React from "react";
import { View, Text } from "react-native";

import LogoItch from "../../componentes/Logo";
import styles from './styles';

const Home = () => {
  return (
    <View style={styles.contenedor}>
      <LogoItch />

      <Text>Bienvenido usuario registrado</Text>
    </View>
  );
};

export default Home;