import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const SeccionBandera = (props) => {
  if (!props.icon) {
    // console.log("no hay icono");
  }

  return (
    <View
      style={[
        styles.seccionBandera,
        {
          backgroundColor: props.color,
        },
      ]}
    >
      {props.icon ? (
        <Image
          resizeMode={props.resizeMode || "cover"}
          source={props.icon}
          style={styles.icon}
        />
      ) : null}
      {props.icon ? null : <Text>{props.titulo}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  seccionBandera: {
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default SeccionBandera;
