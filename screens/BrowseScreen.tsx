import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantList from "../components/RestaurantList";
import { appTheme } from "../config";
import useBrowse from "../hooks/useBrowse";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";

const BrowseScreen = () => {
  const { theme } = useGeneral();
  const { searchTerm, setSearchTerm, page, userScrolling } = useBrowse();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView>
        <View style={tw`flex-row items-center justify-between`}>
          <Input
            placeholder="Food, restaurants, name (Starbucks"
            autoCompleteType="name"
            onChangeText={(text) => setSearchTerm(text)}
            leftIcon={{
              name: "search",
              type: "ionicon",
              size: 20,
              color: appTheme?.[theme].primary,
            }}
            value={searchTerm}
            placeholderTextColor="gray"
            inputContainerStyle={tw`bg-${theme}-accent rounded-full px-3 border-0`}
            inputStyle={[
              tw`ml-3 text-${theme}-primary text-xs`,
              { fontFamily: "OpenSans_600SemiBold" },
            ]}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          //   onScroll={userScrolling}
          //   scrollEventThrottle={400}
        >
          {/* Restaurants list */}
          <RestaurantList page={page} browse={true} search={searchTerm} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BrowseScreen;
