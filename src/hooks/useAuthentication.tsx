import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { StackActions ,useNavigation} from "@react-navigation/native";

export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const navigation = useNavigation();

  if (auth) {
    const currentStack = navigation.getState().routes[0].name;
    const navigateStack = auth.currentUser ? "Menu" : "Auth";

    if (navigateStack !== currentStack) {
        navigation.dispatch(StackActions.replace(navigateStack));
    }
  }

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
