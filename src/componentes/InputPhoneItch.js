import React from "react";
import InputItch from "./InputItch";

const InputPhoneItch = (props) => {
  // Límite de caracteres, por defecto es 10.
  const limit = props.max || 10;

  const onChange = (text) => {
    let phone = text;

    // No debe superar el limit.
    if (phone.length > limit) {
      phone = text.substring(0, limit);
    }

    props.alCambiarTexto(phone);
  };

  return (
    <InputItch {...props} alCambiarTexto={onChange} keyboardType="phone-pad" />
  );
};

export default InputPhoneItch;
