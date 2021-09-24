import { GOOGLE_API_KEY } from "@env";
import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useSearch from "../hooks/useSearch";
import tw from "../lib/tailwind";
import { setGeometry, setLocation } from "../slices/locationSlice";
import UberText from "./UberText";

const SearchBar = () => {
  const { theme, dispatch } = useGeneral();
  const { searchRef, onSearchButtonClicked } = useSearch();
  return (
    <View style={tw`mt-4 flex-row items-center justify-between`}>
      <GooglePlacesAutocomplete
        ref={searchRef}
        placeholder="Search"
        onPress={(data) => {
          dispatch(setLocation(data?.description));
        }}
        fetchDetails={true}
        debounce={200}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        textInputProps={{
          placeholderTextColor: appTheme?.[theme].primary,
        }}
        styles={{
          textInput: {
            backgroundColor: appTheme?.[theme].DEFAULT,
            color: appTheme?.[theme].primary,
            borderRadius: 20,
            marginTop: 4,
            fontFamily: "OpenSans_600SemiBold",
          },
          textInputContainer: {
            backgroundColor: appTheme?.[theme].DEFAULT,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
          description: {
            fontFamily: "OpenSans_400Regular",
            color: appTheme?.[theme].primary,
          },
          row: {
            backgroundColor: appTheme?.[theme].accent,
          },
        }}
        renderLeftButton={() => (
          <Icon
            name="location-outline"
            size={24}
            type="ionicon"
            color={appTheme?.[theme].primary}
            style={{ marginLeft: 20 }}
          />
        )}
        renderRightButton={() => (
          <TouchableOpacity
            onPress={onSearchButtonClicked}
            style={[
              tw`flex-row items-center py-2 px-3 bg-${theme}-accent rounded-full`,
              { marginRight: 10 },
            ]}
          >
            <Icon
              name="time"
              type="ionicon"
              size={15}
              color={appTheme?.[theme].primary}
            />
            <UberText
              twStyle={tw`text-xs ml-1 text-${theme}-primary`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              Search
            </UberText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchBar;
