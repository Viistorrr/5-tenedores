import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

export default function AccountOptions() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  menuItems: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
