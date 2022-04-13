import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home, Notification } from "../screens";
import { useScreenOptions, useTranslation } from "../hooks";

const Stack = createStackNavigator();

export default function Screens() {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t("navigation.home") }}
      />

        <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: t("navigation.notification") }}
      />
    </Stack.Navigator>
  );
}
