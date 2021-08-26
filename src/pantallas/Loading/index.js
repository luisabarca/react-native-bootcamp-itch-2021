import React, { useEffect } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  esUsuarioConSesionActiva,
} from "../../utils";
import fondo from "./7Aniversario.jpeg";

const Loading = () => {
  // Hook de la libreria react navigation.
  const navigation = useNavigation();

  useEffect(() => {
    const runAsync = async () => {
      let destino = "Login";

      if (await esUsuarioConSesionActiva()) {
        destino = "Principal";
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: destino,
          },
        ],
      });
    };

    runAsync();
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      resizeMethod="resize"
      source={fondo}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </ImageBackground>
  );
};

export default Loading;
