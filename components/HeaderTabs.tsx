import React from "react";
import { View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import { setRestaurantType } from "../slices/restaurantTypeSlice";
import UberText from "./UberText";

const tabs: ["all", "delivery", "pickup", "restaurant_reservation"] = [
  "all",
  "delivery",
  "pickup",
  "restaurant_reservation",
];

const HeaderTabs = () => {
  const { theme, restaurantType, dispatch } = useGeneral();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={tabs}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item}
          style={tw`py-2 px-5 ${
            restaurantType === item
              ? `bg-${theme}-primary`
              : `bg-${theme}-accent`
          } rounded-full mx-2`}
          onPress={() => dispatch(setRestaurantType(item))}
        >
          <UberText
            twStyle={tw`capitalize ${
              restaurantType === item
                ? `text-${theme}`
                : `text-${theme}-primary`
            }`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            {item.split("_").join(" ")}
          </UberText>
        </TouchableOpacity>
      )}
    />
  );
};

export default HeaderTabs;
