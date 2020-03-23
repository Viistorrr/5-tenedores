import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Loading from "../Loading";
import { withNavigation } from "react-navigation";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, sethideRepeatPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las constraseñas no son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              //toastRef.current.show("Usuario creado correctamente");
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              if (password.length <= 5)
                toastRef.current.show(
                  "La contraseña debe tener al menos 6 caracteres"
                );
              else
                toastRef.current.show(
                  "Error al crear la cuenta. Intentelo mas tarde"
                );
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => sethideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainterRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando Cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainterRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "#00a680"
  }
});
