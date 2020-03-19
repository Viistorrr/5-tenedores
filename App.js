import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>5 Tenedores</Text>
      <Button loading={true} title="Button with icon component" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
