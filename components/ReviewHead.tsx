import React from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import UberText from "./UberText";

interface Props {
  review: any;
}
const ReviewHead: React.FC<Props> = ({ review }) => {
  const { theme } = useGeneral();
  return (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center`}>
        <Avatar
          rounded
          size="small"
          source={{
            uri: review?.user?.image_url,
          }}
        />
        <UberText
          twStyle={tw`text-${theme}-primary mx-3`}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          {review?.user?.name}
        </UberText>
      </View>
      <TouchableOpacity>
        <Icon
          name="ellipsis-vertical"
          type="ionicon"
          size={20}
          color={appTheme?.[theme].primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReviewHead;
