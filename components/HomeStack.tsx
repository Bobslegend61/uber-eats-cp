import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AboutScreen from "../screens/AboutScreen";
import HomeScreen from "../screens/HomeScreen";
import Reviews from "../screens/Reviews";

interface Screen {
  name: string;
  component: React.FC;
}

const screens: Screen[] = [
  {
    name: "HomeScreen",
    component: HomeScreen,
  },
  {
    name: "AboutScreen",
    component: AboutScreen,
  },
  {
    name: "ReviewsScreen",
    component: Reviews,
  },
];

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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

export default HomeStack;
