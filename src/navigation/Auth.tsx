import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthentication } from "../hooks/useAuthentication";

import { Login, SignUp } from "../screens";
import { useScreenOptions } from "../hooks";

const Stack = createStackNavigator();

export default function Auth() {
  const screenOptions = useScreenOptions();
  useAuthentication();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={screenOptions.stack}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
