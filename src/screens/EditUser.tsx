import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { StorageService } from "../services";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Input, Image, Text } from "../components";
import { IUser } from "../models/user.model";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const EditUser = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const toast = useToast();

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
        .catch((err) => toast.update(id, t("user.changesCouldNotBeSaved"), { type: "danger" }));
    } catch (error) {}
  };

  const handleChange = useCallback(
    (value) => {
      setUser((state) => ({ ...state, ...value }));
    },
    [setUser]
  );

  const handleEditUser = useCallback(async () => {
    await editUser(user);
    await StorageService.setStorageObject("user", user);
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
              color={colors.white}
              source={assets.arrow}
              transform={[{ rotate: "180deg" }]}
            />
            <Text p white marginLeft={sizes.s}>
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
