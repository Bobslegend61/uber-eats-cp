import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useRestaurants from "../hooks/useRestaurants";
import tw from "../lib/tailwind";
import RestaurantItem from "./RestaurantItem";
import UberText from "./UberText";

interface Props {
  page: number;
}
const RestaurantList: React.FC<Props> = ({ page }) => {
  const { theme, restaurantType } = useGeneral();
  const { loading, error, reload, restaurants } = useRestaurants(page);
  return (
    <>
      {restaurants.length > 0
        ? restaurants
            .filter((restaurant: any) =>
              restaurantType === "all"
                ? restaurant
                : restaurant?.transactions?.includes(restaurantType),
            )
            .map((restaurant: any) => (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))
        : null}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={appTheme?.[theme].primary}
          style={tw`my-3`}
        />
      ) : null}
      {error ? (
        <View style={tw`mt-10 items-center justify-center`}>
          <UberText twStyle={tw`text-${theme}-primary font-bold`}>
            {error}
          </UberText>
          <TouchableOpacity
            onPress={reload}
            style={tw`py-2 px-5 mt-2 bg-${theme}-primary rounded-full flex-row items-center`}
          >
            <Icon
              name="reload-outline"
              type="ionicon"
              size={20}
              color={appTheme?.[theme].DEFAULT}
            />
            <UberText
              twStyle={tw`text-${theme} ml-2`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              Reload
            </UberText>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default RestaurantList;
