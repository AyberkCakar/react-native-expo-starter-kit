import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Image, Text } from "../components";

import { IUser } from "../models/user.model";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

const UserCard = ({ user }) => {
  const { assets, colors, sizes } = useTheme();
  const { t } = useTranslation();

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
          <Button row justify="center" marginBottom={sizes.s}>
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
  const { sizes } = useTheme();
  const navigation = useNavigation();
  const [userCard, setUserCard] = useState<any[]>([]);

  useEffect(() => {
    async function getUsers() {
      const userList: any[] = [];
      const citiesRef = collection(firestore, "users");

      //TODO: Add
      const q = query(citiesRef, where("github", "==", "AyberkCakar"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userList.push(<UserCard key={doc.id} user={doc.data() as IUser} />);
      });

      setUserCard(userList);
    }

    getUsers();
  }, []);

  return (
    <Block safe>
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
  modal: {
    maxHeight: 250,
    height: 250,
  },
  cardHeight: {
    height: 114,
  },
  cardWidth100: {
    width: "100%",
  },
  carouselWitdh: {
    width: "100%",
  },
});
