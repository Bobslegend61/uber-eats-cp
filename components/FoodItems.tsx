import React from "react";
import { FlatList, View } from "react-native";
import tw from "../lib/tailwind";
import FoodItem from "./FoodItem";

const prices: number[] = [20.99, 5.99, 13.0, 2.55, 50.0, 17.59, 28.44];

export interface Food {
  name: string;
  id: string;
  description: string;
  tag: string[];
  image: string;
  ingredient: { amount: number; unit: string; name: string }[];
  step: { description: string }[];
  notes: string;
  ingredientGroup: any[];
  price: number;
}

const reciepes: Food[] = require("../assets/reciepe.json");

interface Props {
  restaurant: any;
}
const FoodItems: React.FC<Props> = ({ restaurant }) => {
  return (
    <View style={tw`flex-1 mt-2`}>
      <FlatList
        data={reciepes}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FoodItem restaurant={restaurant} food={item} />
        )}
      />
    </View>
  );
};

export default FoodItems;
