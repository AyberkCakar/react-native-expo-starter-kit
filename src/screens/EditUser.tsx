import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { StorageService } from "../services";
import Icon from "@expo/vector-icons/FontAwesome5";

import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Input, Image, Text } from "../components";
import { IUser } from "../models/user.model";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase";
import uuid from "react-native-uuid";

import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

interface Image {
  uri?: string;
}

const EditUser = () => {
  const { t } = useTranslation();
  const { isDark } = useData();
  const navigation = useNavigation();
  const toast = useToast();

  const [imageUri, setImageUri] = useState<Image>({
    uri: "",
  });

  const [uploading, setUploading] = useState(false);
  const [disabledUpload, setDisabledUpload] = useState(false);

  const selectImage = async () => {
    let response: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageUri({ uri: response.uri });
    setDisabledUpload(false);
  };

  const uploadImage = async () => {
    const blob: any = await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUri?.uri, true);
      xhr.send(null);
    });

    setUploading(true);
    setDisabledUpload(false);

    const storageRef = ref(storage, uuid.v4() as string);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleChange({ image: downloadURL });
          setUploading(false);
          setDisabledUpload(true);
          blob.close();
        });
      }
    );
  };

  const [user, setUser] = useState<IUser>({
    uid: "",
    name: "",
    email: "",
    twitter: undefined,
    instagram: undefined,
    facebook: undefined,
    github: undefined,
    title: undefined,
    aboutMe: undefined,
    image: undefined,
  });
  const { assets, colors, gradients, sizes } = useTheme();

  useEffect(() => {
    async function getCurrentUser() {
      const user = (await StorageService.getStorageObject("user")) as IUser;
      const docRef = doc(firestore, "users", user.uid as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data() as IUser);
      }
    }

    getCurrentUser();
  }, []);

  const editUser = async (user: any) => {
    let id = toast.show(t("user.savingChanges"));
    try {
      await setDoc(doc(firestore, "users", user.uid), user)
        .then(() => {
          toast.update(id, t("user.changesSaved"), { type: "success" });
        })
        .catch(() =>
          toast.update(id, t("user.changesCouldNotBeSaved"), { type: "danger" })
        );
    } catch (error) {}
  };

  const handleChange = useCallback(
    (value) => {
      setUser((state) => ({ ...state, ...value }));
    },
    [setUser]
  );

  function userDataChanged(): IUser {
    return {
      ...user,
      twitter:
        user?.twitter && user?.twitter !== "" ? user?.twitter : undefined,
      instagram:
        user?.instagram && user?.instagram !== "" ? user?.instagram : undefined,
      facebook:
        user?.facebook && user?.facebook !== "" ? user?.facebook : undefined,
      github: user?.github && user?.github !== "" ? user?.github : undefined,
      title: user?.title && user?.title !== "" ? user?.title : undefined,
      aboutMe:
        user?.aboutMe && user?.aboutMe !== "" ? user?.aboutMe : undefined,
    };
  }

  const handleEditUser = useCallback(async () => {
    await editUser(user);
    await StorageService.setStorageObject("user", userDataChanged());
  }, [user]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Button
            row
            flex={0}
            marginLeft={10}
            justify="flex-start"
            onPress={() => navigation.goBack()}
          >
            <Image
              radius={0}
              width={10}
              height={18}
              color={isDark ? colors.white : colors.black}
              source={assets.arrow}
              transform={[{ rotate: "180deg" }]}
            />
            <Text
              p
              color={isDark ? colors.white : colors.black}
              marginLeft={sizes.s}
            >
              {t("user.editUser")}
            </Text>
          </Button>
        </Block>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: sizes.padding }}
        >
          <Block paddingHorizontal={sizes.sm}>
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.name") + "*"}
              placeholder={t("common.namePlaceholder") + "*"}
              disabled
              value={user.name}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.email") + "*"}
              placeholder={t("common.emailPlaceholder") + "*"}
              value={user.email}
              disabled
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.title")}
              placeholder={t("common.titlePlaceholder")}
              value={user.title}
              onChangeText={(value) => handleChange({ title: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.instagram")}
              placeholder={t("common.instagramPlaceholder")}
              value={user.instagram}
              onChangeText={(value) => handleChange({ instagram: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.twitter")}
              placeholder={t("common.twitterPlaceholder")}
              value={user.twitter}
              onChangeText={(value) => handleChange({ twitter: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.facebook")}
              placeholder={t("common.facebookPlaceholder")}
              value={user.facebook}
              onChangeText={(value) => handleChange({ facebook: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.github")}
              placeholder={t("common.githubPlaceholder")}
              value={user.github}
              onChangeText={(value) => handleChange({ github: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              multiline={true}
              numberOfLines={10}
              style={{ height: 200, textAlignVertical: "top" }}
              label={t("common.aboutMe")}
              placeholder={t("common.aboutMePlaceholder")}
              value={user.aboutMe}
              onChangeText={(value) => handleChange({ aboutMe: value })}
            />
            <View style={styles.imageContainer}>
              {imageUri.uri !== "" ? (
                <Image
                  source={{ uri: imageUri.uri }}
                  width={200}
                  height={200}
                />
              ) : user.image ? (
                <Image source={{ uri: user.image }} width={200} height={200} />
              ) : (
                <Image source={assets.anonymous} width={200} height={200} />
              )}
            </View>

            {!uploading && disabledUpload && (
              <Text color="white" marginTop={5} marginBottom={-10} center>
                <Icon name={"check"} color={"white"} />
                {" " + t("user.imageUploaded")}
              </Text>
            )}

            <Block marginTop={20} row justify="center">
              <Button
                width={170}
                marginRight={20}
                onPress={selectImage}
                gradient={gradients.dark}
              >
                <Text bold white transform="uppercase">
                  {t("user.pickAnImage")}
                </Text>
              </Button>
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Circle size={32} indeterminate={true} />
                </View>
              ) : (
                <Button
                  onPress={uploadImage}
                  width={10}
                  gradient={gradients.dark}
                  disabled={disabledUpload}
                >
                  <Icon name={"upload"} size={15} color={"white"} />
                </Button>
              )}
            </Block>
            <Button
              onPress={handleEditUser}
              marginVertical={sizes.sm}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
            >
              <Text bold white transform="uppercase">
                {t("common.saveChanges")}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  progressBarContainer: {
    marginTop: 5,
  },
});
