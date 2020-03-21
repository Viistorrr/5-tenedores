import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";

export default function MyAccount() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true); //Si usuario no esta logeado hace false
    });
  }, []);

  if (login === null) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (login) {
    return (
      <View>
        <Text>usuario Logeado...</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>usuario NO Logeado...</Text>
    </View>
  );
}
