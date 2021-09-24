import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import UberText from "./UberText";

interface Props {
  review: any;
}

const ReviewRateDate: React.FC<Props> = ({ review }) => {
  const { theme } = useGeneral();
  return (
    <View style={tw`flex-row items-center mt-2`}>
      <View style={tw`flex-row items-center`}>
        {[...Array(5).keys()].map((num) => (
          <Icon
            key={num}
            name="star"
            type="ionicon"
            size={13}
            color={
              num <= Math.ceil(review?.rating)
                ? appTheme?.[theme].secondary
                : appTheme?.[theme].accent
            }
          />
        ))}
        {`${review.rating}`.length > 1 ? (
          <Icon
            name="star-half"
            type="ionicon"
            size={13}
            color={appTheme?.[theme].secondary}
          />
        ) : null}
      </View>
      <UberText twStyle={tw`text-xs ml-3 text-${theme}-primary`}>
        {moment(review?.time_created).format("MM/DD/YY")}
      </UberText>
    </View>
  );
};

export default ReviewRateDate;
