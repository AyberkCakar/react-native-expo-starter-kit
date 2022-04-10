import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "./Auth";
import Menu from "./Menu";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
