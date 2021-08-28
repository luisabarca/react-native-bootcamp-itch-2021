import React, { useRef, useState, useEffect } from "react";
import { View, Button } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

import InputPhoneItch from "../../componentes/InputPhoneItch";
import LogoItch from "../../componentes/Logo";
import { firebaseConfig, obtenerPushToken, setUsuarioConSesionActiva } from '../../utils';
import styles from './Login.styles';

const Login = ({ navigation }) => {
  const db = firebase.firestore();

  // Referencia al componente reCaptcha.
  const recaptchaRef = useRef(null);
  // Guarda el teléfono que escribe el usuario.
  const [telefono, setTelefono] = useState("");
  // Guarda el código SMS que escribe el usuario.
  const [smsCodigo, setSmsCodigo] = useState("");
  // Bandera para saber si se ha enviado el SMS.
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  // Código de verificación al enviar un SMS.
  const [verificationId, setVerificationId] = useState("");

  // Observar el cambio de una variable de estado
  useEffect(() => {
    // Si aún no existe la verificación salir.
    if (verificationId.length < 1) {
      return;
    }

    // Establecemos que ya se mandó el SMS.
    setCodigoEnviado(true);
  }, [verificationId]);

  // Response al evento con el teléfono del usuario.
  const handlePhone = (text) => {
    // Actualiza la variable de estado de la App.
    setTelefono(text);
  };

  // Responde al evento del input con el código SMS.
  const handleSmsCode = (text) => {
    // Actualiza la variable de estado de la App.
    setSmsCodigo(text);
  };

  // Response al botón "Enviar SMS".
  const enviaCodigoSms = async () => {
    // Agregamos el prefijo con códifo de país al teléfono tecleado.
    const telefonoUsuario = '+52' + telefono;

    // Creamos el componente.
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    // Enviamos el SMS.
    const response = await phoneProvider.verifyPhoneNumber(
      telefonoUsuario,
      recaptchaRef.current
    );

    // Guardamos el código de verificación devuelto por firebase.
    setVerificationId(response);
  };

  // Responde al segundo botón para verificar el código SMS.
  const verificarCodigo = async () => {
    // Creamos el objeto credencial con la verificación y el código SMS
    // que teclea el usuario.
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      smsCodigo
    );

    try {
      // Iniciamos sesión
      const authResult = await firebase.auth().signInWithCredential(credential);

      // Guardar el usuario.
      setUsuarioConSesionActiva();

      // Guardar la sessión más reciente en /usuarios/7471234567
      db.collection('usuarios').doc(telefono.toString()).set({
        telefono, // telefono: telefono,
        token: await obtenerPushToken(),
        fecha: new Date(),
      });

      // Si todo sale bien, se manda a la pantalla principal.
      navigation.navigate('Principal');
    } catch (error) {
      // Mostramos el error en la consola.
      console.log(error);
    }
  };

  const manejaCompartir = async () => {
    Share.share({
      message: 'Compartiendo el curso',
      title: 'Curso 2021',
      url: 'http://www.itchilpancingo.edu.mx/',
    });
  };

  return (
    <View style={styles.contenedor}>
      <LogoItch />

      <InputPhoneItch
        valor={telefono}
        alCambiarTexto={handlePhone}
        textPorDefecto="Tu número a 10 dígitos"
        returnKeyType="done"
      />

      <Button
        title="Enviar SMS"
        onPress={enviaCodigoSms}
        disabled={!(telefono.length >= 10)}
      />

      <InputPhoneItch
        max={6}
        valor={smsCodigo}
        alCambiarTexto={handleSmsCode}
        textPorDefecto="Código SMS"
        editable={codigoEnviado}
        returnKeyType="go"
      />
      <Button
        title="Confirmar código SMS"
        onPress={verificarCodigo}
        disabled={!codigoEnviado}
      />

      {/* <Button title="Compartir" onPress={manejaCompartir} /> */}

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaRef}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
    </View>
  );
};

export default Login;