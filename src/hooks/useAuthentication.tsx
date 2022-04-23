import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { StackActions, useNavigation } from "@react-navigation/native";

export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setNavigateStack();
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  async function setNavigateStack() {
    if (auth) {
      const currentStack = await navigation.getState().routes[0].name;
      const navigateStack = auth.currentUser ? "Menu" : "Auth";

      if (navigateStack !== currentStack) {
        await navigation.dispatch(StackActions.replace(navigateStack));
      }
    }
  }

  return {
    user,
  };
}
