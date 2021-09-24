import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import UberText from "./UberText";

const categories: { name: string; img: any }[] = [
  {
    name: "Pick-up",
    img: require("../assets/images/shopping-bag.png"),
  },
  {
    name: "Soft Drinks",
    img: require("../assets/images/soft-drink.png"),
  },
  {
    name: "Backery Items",
    img: require("../assets/images/bread.png"),
  },
  {
    name: "Fast Foods",
    img: require("../assets/images/fast-food.png"),
  },
  {
    name: "Deals",
    img: require("../assets/images/deals.png"),
  },
  {
    name: "Coffee & Tea",
    img: require("../assets/images/coffee.png"),
  },
  {
    name: "Desserts",
    img: require("../assets/images/desserts.png"),
  },
];

const Categories = () => {
  const { theme } = useGeneral();
  return (
    <View style={[tw`bg-${theme}-accent mb-3`, { marginTop: 10 }]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: { name, img } }) => (
          <TouchableOpacity style={tw`py-2 items-center mx-2 px-4`}>
            <Image
              source={img}
              resizeMode="contain"
              style={{ width: 50, height: 40 }}
            />
            <UberText
              twStyle={tw`mt-1 text-${theme}-primary`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              {name}
            </UberText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
