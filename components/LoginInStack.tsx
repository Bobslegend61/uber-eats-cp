import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

interface Screen {
  name: string;
  component: React.FC;
}

const screens: Screen[] = [
  {
    name: "LoginScreen",
    component: LoginScreen,
  },
  {
    name: "RegisterScreen",
    component: RegisterScreen,
  },
];

const LoginInStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
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

export default LoginInStack;
