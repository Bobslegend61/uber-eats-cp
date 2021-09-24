import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import UberText from "./UberText";

interface Props {
  restaurant: any;
  handleModal: any;
}
const About: React.FC<Props> = ({ restaurant, handleModal }) => {
  const { theme, navigation, makePhoneCall, openBrowser } = useGeneral();
  return (
    <View>
      <ImageBackground
        source={{
          uri: restaurant.image_url,
        }}
        resizeMode="cover"
        style={tw`w-full h-60`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`self-start rounded-full w-10 h-10 mt-12 shadow-lg ml-3 items-center justify-center bg-${theme}-primary`}
        >
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={30}
            color={appTheme?.[theme].DEFAULT}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={tw`p-3 bg-${theme}-accent`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-1`}>
            <UberText
              twStyle={tw`text-xl text-${theme}-primary`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              {restaurant.name}
            </UberText>
            <View style={tw`flex-row items-center`}>
              <Icon
                name="location"
                type="ionicon"
                size={15}
                color={appTheme?.[theme].primary}
              />
              <UberText twStyle={tw`text-${theme}-primary text-xs ml-1`}>
                {restaurant?.location?.display_address[0]},{" "}
                {restaurant?.location?.display_address[1]},{" "}
                {restaurant?.location?.state}, {restaurant?.location?.country}
              </UberText>
            </View>
          </View>
          <View style={tw`flex-row`}>
            {restaurant?.phone ? (
              <TouchableOpacity
                onPress={() =>
                  makePhoneCall(
                    `tel:${restaurant?.phone}`,
                    restaurant?.display_phone,
                  )
                }
                style={tw`bg-${theme} rounded-full p-2 mr-1`}
              >
                <Icon
                  name="call"
                  type="ionicon"
                  size={25}
                  color={appTheme?.[theme].primary}
                />
              </TouchableOpacity>
            ) : null}
            {restaurant?.url ? (
              <TouchableOpacity
                onPress={() => openBrowser(restaurant?.url)}
                style={tw`bg-${theme} rounded-full p-2 mr-1`}
              >
                <Icon
                  name="globe"
                  type="ionicon"
                  size={25}
                  color={appTheme?.[theme].primary}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={handleModal}
              style={tw`bg-${theme} rounded-full p-2`}
            >
              <Icon
                name="eye"
                type="ionicon"
                size={25}
                color={appTheme?.[theme].primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default About;
