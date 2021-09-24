import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AccountScreen from "../screens/AccountScreen";

interface Screen {
  name: string;
  component: React.FC;
}

const screens: Screen[] = [
  {
    name: "AccountScreen",
    component: AccountScreen,
  },
];

const AccountStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AccountScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, component }, i) => (
        <Stack.Screen name={name} component={component} key={i} />
      ))}
    </Stack.Navigator>
  );
};

export default AccountStack;
