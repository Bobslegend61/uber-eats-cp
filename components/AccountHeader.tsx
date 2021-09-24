import moment from "moment";
import React from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";
import { IUserState } from "../slices/authSlice";
import UberText from "./UberText";

interface Props {
  theme: string;
  auth: IUserState;
}

const AccountHeader: React.FC<Props> = ({ theme, auth }) => {
  return (
    <View style={tw`justify-between py-3 bg-${theme}-accent px-4`}>
      <UberText
        twStyle={tw`text-${theme}-primary text-lg mb-5`}
        csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
      >
        Account
      </UberText>
      <View>
        <UberText
          twStyle={tw`text-${theme}-primary`}
          csStyle={{ fontFamily: "OpenSans_400Regular" }}
        >
          {`Good ${
            moment().format("a") === "am"
              ? " Morning, "
              : Number(moment().format("H")) >= 16
              ? " Evening, "
              : " Afternoon, "
          } ${auth.user?.firstName} ${auth.user?.lastName}`}
        </UberText>
        <UberText twStyle={tw`text-${theme}-primary text-xs`}>
          {`${auth.user?.email}`}
        </UberText>
      </View>
    </View>
  );
};

export default AccountHeader;
