import React from "react";
import { StyleSheet, View, Text, PermissionsAndroid } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    //userInfo, se podria declarar asi si se fuera a utilizar. Este metodo se llama dobel structiring
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextIsLoading
  } = props;

  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    const resultPermissionCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galería");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen"
        );
      } else {
        //siempre se pasa el UID para que sobreescriba el avatar y no agregue una img nueva

        uploadImage(result.uri, uid).then(() => {
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    setTextIsLoading("Actualizando avatar");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true); //para refrescar la info del user cuadno se actualiza el avatar
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al recuperar la img del servidor");
      });
  };
  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/285/abott@adorable.png"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Social login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
