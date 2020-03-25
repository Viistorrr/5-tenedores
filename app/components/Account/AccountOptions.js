import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";

export default function AccountOptions() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const menuOptions = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => {
        console.log("Change displayName");
        selectedComponent(); //ejecuta la funcion
      }
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => {
        console.log("Change Email");
      }
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#CCC",
      iconNameRight: "chevron-right",
      iconColorRight: "#CCC",
      onPress: () => {
        console.log("Change Password");
      }
    }
  ];

  const selectedComponent = () => {
    setIsVisibleModal(true);
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
      <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        <View>
          <Text>Texto desde la modal Overlay</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItems: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
