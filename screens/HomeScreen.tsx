import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import RestaurantList from "../components/RestaurantList";
import SearchBar from "../components/SearchBar";
import useGeneral from "../hooks/useGeneral";
import useHomeScreen from "../hooks/useHomeScreen";
import tw from "../lib/tailwind";

const HomeScreen = () => {
  const { theme } = useGeneral();
  const { page, userScrolling } = useHomeScreen();
  return (
    <SafeAreaView style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View style={tw`px-2 bg-${theme}-accent py-4`}>
        {/* Header Tabs */}
        <HeaderTabs />

        {/* Search Bar */}
        <SearchBar />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={userScrolling}
        scrollEventThrottle={400}
      >
        {/* Categories */}
        <Categories />

        {/* Restaurants list */}
        <RestaurantList page={page} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
