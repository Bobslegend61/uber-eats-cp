import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useRestaurantInfo from "../hooks/useRestaurantInfo";
import tw from "../lib/tailwind";
import UberText from "./UberText";

interface RestaurantItemProps {
  restaurant: any;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ restaurant }) => {
  const { theme, navigation } = useGeneral();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AboutScreen", {
          restaurant,
        })
      }
      style={tw`bg-${theme}-accent pb-2 mb-3`}
    >
      <RestaurantImage theme={theme} imageUri={restaurant.image_url} />
      <RestaurantInfo theme={theme} restaurant={restaurant} />
    </TouchableOpacity>
  );
};

interface Props {
  theme?: "light" | "dark";
  imageUri?: string;
  restaurant?: any;
}

const RestaurantInfo: React.FC<Props> = ({ theme, restaurant }) => {
  return (
    <View style={tw`p-2 flex-row items-center justify-between`}>
      <View>
        <UberText
          twStyle={tw`text-lg text-${theme!}-primary`}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          {restaurant.name}
        </UberText>
        <UberText twStyle={tw`text-${theme!}-primary text-xs`}>
          {(restaurant.distance / 1000).toFixed(2)} km . (15-20min)
        </UberText>
      </View>
      <TouchableOpacity
        style={tw`bg-${theme!} w-8 h-8 items-center justify-center rounded-full`}
      >
        <UberText twStyle={tw`text-${theme!}-primary`}>
          {restaurant.rating}
        </UberText>
      </TouchableOpacity>
    </View>
  );
};

const RestaurantImage: React.FC<Props> = ({ imageUri }) => (
  <>
    <ImageBackground
      source={{
        uri: imageUri,
      }}
      resizeMode="cover"
      style={tw`w-full h-60`}
    >
      <TouchableOpacity style={tw` mt-3 self-end mr-3 `}>
        <Icon name="heart-outline" type="ionicon" size={25} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  </>
);

export default RestaurantItem;
