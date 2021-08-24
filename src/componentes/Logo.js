import React from "react";
import { Image } from "react-native";

const LogoItch = () => (
    <Image
      source={{
        uri: "http://www.itchilpancingo.edu.mx/images/otros/65389.jpg",
      }}
      style={{
        width: 120,
        height: 120,
      }}
      resizeMode="cover"
    />
);

export default LogoItch;