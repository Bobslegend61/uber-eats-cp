import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CartScreen from "../screens/CartScreen";
import PaymentSuccess from "../screens/PaymentSuccess";

const screens: {
  name: string;
  component: React.FC;
}[] = [
  {
    name: "CartScreen",
    component: CartScreen,
  },
  {
    name: "PaymentSuccessScreen",
    component: PaymentSuccess,
  },
];

const CartStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default CartStack;
