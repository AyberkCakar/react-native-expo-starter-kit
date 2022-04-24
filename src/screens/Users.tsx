import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Image, Text, Input } from "../components";

import { IUser } from "../models/user.model";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

const UserCard = ({ user }) => {
  const { assets, colors, sizes } = useTheme();
  const navigation = useNavigation();

  return (
    <Block marginTop={sizes.s} paddingHorizontal={15}>
      <Block>
        <Block card row>
          <Image
            width={100}
            height={100}
            source={
              user?.image
                ? {
                    uri: user?.image,
                  }
                : assets.anonymous
            }
            style={styles.cardHeight}
            radius={100}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text h5 white numberOfLines={1}>
              {user?.name}
            </Text>
            <Text p white numberOfLines={1}>
              {user?.company ? user?.company : "-"}
            </Text>
            <Text white numberOfLines={1}>
              {user?.title ? user?.title : "-"}
            </Text>
          </Block>
          <Button
            onPress={() => navigation.navigate("Profile", user)}
            row
            justify="center"
            marginBottom={sizes.s}
          >
            <Image
              width={20}
              height={40}
              source={assets.arrow}
              color={colors.primary}
            />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const Users = () => {
  const { sizes, colors } = useTheme();
  const navigation = useNavigation();
  const [userCard, setUserCard] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getUsers("");
  }, []);

  async function getUsers(search: string) {
    const userList: any[] = [];
    const usersRef = collection(firestore, "users");

    const querySnapshot = await getDocs(usersRef);

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      if (_searchUser(search, user as IUser)) {
        userList.push(<UserCard key={doc.id} user={user as IUser} />);
      }
    });

    setUserCard(userList);
  }
  const handleChange = useCallback(
    (value) => {
      getUsers(value.search.toLowerCase());
    },
    [setUserCard]
  );

  function _searchUser(search: string, user: IUser): boolean {
    const searchName = user.name ? user.name.toLowerCase().indexOf(search) : -1;
    const searchCompany = user.company
      ? user.company.toLowerCase().indexOf(search)
      : -1;
    const searchTitle = user.title
      ? user.title.toLowerCase().indexOf(search)
      : -1;

    return searchName !== -1 || searchCompany !== -1 || searchTitle !== -1;
  }

  return (
    <Block safe>
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input
          onChangeText={(value) => handleChange({ search: value })}
          search
          placeholder={t("common.search")}
        />
      </Block>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}
      >
        <Block>{userCard}</Block>
      </Block>
    </Block>
  );
};

export default Users;

const styles = StyleSheet.create({
  cardHeight: {
    height: 114,
  },
});
