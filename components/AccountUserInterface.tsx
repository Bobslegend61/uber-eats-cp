import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Switch } from "react-native-elements";
import { appTheme } from "../config";
import useAccount from "../hooks/useAccount";
import tw from "../lib/tailwind";
import { IUserState } from "../slices/authSlice";
import UberText from "./UberText";

interface Props {
  theme: "light" | "dark";
  auth: IUserState;
}

const AccountUserInterface: React.FC<Props> = ({ theme, auth }) => {
  const { toogleTheme } = useAccount(auth.user?.id!);
  return (
    <View style={tw`py-3 px-2 mt-2 bg-${theme}-accent`}>
      <UberText
        twStyle={tw`text-${theme}-primary uppercase text-xs text-${theme}-secondary`}
        csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
      >
        User Interface
      </UberText>
      <View style={tw`mt-3 py-2 flex-row items-center justify-between`}>
        <View>
          <UberText
            twStyle={tw`text-${theme}-primary`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Use night mode
          </UberText>
          <UberText twStyle={tw`text-${theme}-primary text-xs`}>
            Get that whiteness out of my sight
          </UberText>
        </View>
        <Switch
          value={auth?.user?.darkMode}
          trackColor={{
            false: appTheme?.[theme].primary,
            true: appTheme?.[theme].primary,
          }}
          thumbColor={
            auth?.user?.darkMode
              ? appTheme?.[theme].secondary
              : appTheme?.[theme].primary
          }
          onValueChange={toogleTheme}
        />
      </View>
    </View>
  );
};

export default AccountUserInterface;
