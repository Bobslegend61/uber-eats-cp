import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import cartReducer, { addToCart, removeFromCart } from "../slices/cartSlice";
import UberText from "./UberText";

interface Props {
  restaurant: any;
  food: any;
  orders?: boolean;
}

const CartItem: React.FC<Props> = ({ restaurant, food, orders }) => {
  const { theme, dispatch } = useGeneral();
  return (
    <View
      style={tw`mt-1 py-3 border-b border-${theme}-accent flex-row items-center justify-between`}
    >
      <ImageBackground
        source={{ uri: food.image }}
        resizeMode="cover"
        style={tw`w-20 h-16 rounded`}
      >
        <UberText
          twStyle={[tw`bg-${theme}-accent self-end p-1 text-${theme}-primary`]}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          ${food.price}
        </UberText>
      </ImageBackground>
      <UberText twStyle={tw`text-${theme}-primary`}>{food.name}</UberText>
      {orders ? null : (
        <View style={tw`items-center justify-between`}>
          <View style={tw`flex-row items-center justify-between`}>
            <TouchableOpacity
              onPress={() => {
                if (food.quantity > 1) {
                  dispatch(
                    addToCart({
                      id: restaurant.id,
                      name: restaurant.name,
                      image: restaurant.image_url,
                      item: {
                        id: food.id,
                        name: food.name,
                        quantity: food.quantity - 1,
                        price: food.price,
                        image: food.image,
                      },
                    }),
                  );
                }
              }}
              style={tw`bg-${theme}-accent py-1 px-2 rounded-full items-center`}
            >
              <Icon
                name="remove"
                type="ionicon"
                size={14}
                color={appTheme?.[theme].primary}
              />
            </TouchableOpacity>
            <UberText
              twStyle={[tw`mx-2 text-${theme}-primary`]}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              {food.quantity}
            </UberText>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  addToCart({
                    id: restaurant.id,
                    name: restaurant.name,
                    image: restaurant.image_url,
                    item: {
                      id: food.id,
                      name: food.name,
                      quantity: food.quantity + 1,
                      price: food.price,
                      image: food.image,
                    },
                  }),
                );
              }}
              style={tw`bg-${theme}-accent py-1 px-2 rounded-full items-center`}
            >
              <Icon
                name="add"
                type="ionicon"
                size={14}
                color={appTheme?.[theme].primary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                removeFromCart({
                  id: restaurant.id,
                  itemId: food.id,
                }),
              )
            }
            style={tw`mt-3`}
          >
            <UberText
              twStyle={tw`text-${theme}-primary`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              Remove
            </UberText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartItem;
