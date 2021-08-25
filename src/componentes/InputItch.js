import React from "react";
import { TextInput, View } from "react-native";

const InputItch = ({ valor, alCambiarTexto, textPorDefecto, editable, keyboardType }) => {
  // destructuring
  // const { value, onChangeText } = props;

  // const value = props.value;
  // const onChangeText = props.onChangeText;

  let isEditable = true;

  if (typeof editable != 'undefined') {
      isEditable = editable;
  }

  return (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        margin: 10,
      }}
    >
      <TextInput
        value={valor}
        placeholder={textPorDefecto || ""}
        onChangeText={alCambiarTexto}
        keyboardType={keyboardType || 'default'}
        editable={isEditable}
        style={{
          width: "100%",
          height: 48,
          borderWidth: 1,
          padding: 10,
          backgroundColor: isEditable ? '#fff' : '#ddd',
        }}
      />
    </View>
  );
};

export default InputItch;
