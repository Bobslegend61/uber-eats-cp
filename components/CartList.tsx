import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import { removeFromCart } from "../slices/cartSlice";
import CartItem from "./CartItem";
import UberText from "./UberText";

const CartList = () => {
  const { cart, theme, navigation, dispatch } = useGeneral();
  return (
    <View style={tw`flex-1`}>
      <UberText
        csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        twStyle={tw`self-center text-lg uppercase text-${theme}-primary mb-2`}
      >
        Cart
      </UberText>
      {cart.length == 0 ? (
        <View style={tw`flex-1 items-center justify-center px-2`}>
          <Icon
            name="cart-outline"
            type="ionicon"
            size={60}
            color={appTheme?.[theme].primary}
          />

          <UberText
            twStyle={tw`my-2 text-${theme}-primary text-lg`}
            csStyle={{ fontFamily: "OpenSans_400Regular" }}
          >
            Your cart is empty.
          </UberText>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-${theme}-primary flex-row items-center mt-2 py-2 px-5 justify-center rounded-full`}
          >
            <Icon
              name="pizza-outline"
              type="ionicon"
              size={25}
              color={appTheme?.[theme].DEFAULT}
            />
            <UberText
              twStyle={tw`ml-2 text-lg text-${theme}`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              Let's find some yummy food
            </UberText>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={tw`flex-1`}>
          {cart.map((restaurant) => (
            <View key={restaurant.id} style={tw`mx-2 p-2 mb-2 rounded`}>
              <View style={tw`flex-row items-center justify-between`}>
                <UberText
                  twStyle={tw`text-lg text-${theme}-primary`}
                  csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                >
                  {restaurant.name}
                </UberText>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(removeFromCart({ id: restaurant.id }))
                  }
                  style={tw`items-center p-2 rounded-full bg-${theme}`}
                >
                  <Icon
                    name="trash-outline"
                    type="ionicon"
                    size={20}
                    color="#EF4444"
                  />
                </TouchableOpacity>
              </View>
              <View style={tw` shadow-lg`}>
                {restaurant.items.map((food, i) => (
                  <CartItem key={i} restaurant={restaurant} food={food} />
                ))}
                <View
                  style={tw`flex-row items-center justify-between px-2 py-3 bg-${theme}-accent rounded-b-lg`}
                >
                  <UberText
                    twStyle={[tw`mx-2 text-${theme}-primary`]}
                    csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                  >
                    Subtotal
                  </UberText>
                  <UberText
                    twStyle={[tw`mx-2 text-${theme}-primary`]}
                    csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                  >
                    $
                    {restaurant.items
                      .map((item) => item.price * item.quantity)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </UberText>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CartList;
