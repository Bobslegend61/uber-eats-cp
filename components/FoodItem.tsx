import React from "react";
import { View, Text, Image } from "react-native";
import useGeneral from "../hooks/useGeneral";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import tw from "../lib/tailwind";
import { Food } from "./FoodItems";
import UberText from "./UberText";
import { appTheme } from "../config";
import { addToCart, removeFromCart } from "../slices/cartSlice";

interface Props {
  food: Food;
  restaurant: any;
}

const FoodItem: React.FC<Props> = ({ food, restaurant }) => {
  const { theme, dispatch, cart } = useGeneral();
  return (
    <View
      style={tw`py-3 px-2 mb-2 flex-row items-center justify-between border-b border-${theme}-accent`}
    >
      {/* checkbox */}
      <BouncyCheckbox
        size={25}
        isChecked={
          cart?.find((item) => item.id === restaurant.id) &&
          cart
            ?.find((item) => item.id === restaurant.id)
            ?.items.find((product) => product.id === food.id)
            ? true
            : false
        }
        fillColor={appTheme?.[theme].secondary}
        onPress={(isChecked?: boolean) => {
          if (isChecked) {
            dispatch(
              addToCart({
                id: restaurant.id,
                name: restaurant.name,
                image: restaurant.image_url,
                item: {
                  id: food.id,
                  name: food.name,
                  quantity: 1,
                  price: food.price,
                  image: food.image,
                },
              }),
            );
          } else {
            dispatch(
              removeFromCart({
                id: restaurant.id,
              }),
            );
          }
        }}
      />
      {/* item info */}
      <View style={[tw`w-full`, { flexShrink: 1 }]}>
        <UberText
          twStyle={[tw`text-${theme}-primary`, { fontSize: 17 }]}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          {food.name}
        </UberText>
        <UberText twStyle={tw`text-${theme}-primary my-1`}>
          {food.description}
        </UberText>
        <UberText
          twStyle={tw`text-${theme}-primary`}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          ${food.price.toFixed(2)}
        </UberText>
      </View>
      {/* image */}
      <Image
        style={[tw`rounded-lg`, { width: 100, height: 100 }]}
        source={{ uri: food.image }}
        resizeMode="cover"
      />
    </View>
  );
};

export default FoodItem;
