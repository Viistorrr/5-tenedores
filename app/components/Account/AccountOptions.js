import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePassowrdForm";

export default function AccountOptions() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const menuOptions = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("displayName") //ejecuta la funcion
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("email") //ejecuta la funcion
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => selectedComponent("password") //ejecuta la funcion
    }
  ];

  const selectedComponent = key => {
    switch (key) {
      case "displayName":
        setRenderComponent(<ChangeDisplayNameForm />);
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(<ChangeEmailForm />);
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(<ChangePasswordForm />);
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItems}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItems: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
