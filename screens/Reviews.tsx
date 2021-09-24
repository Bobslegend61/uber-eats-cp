import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ReviewHead from "../components/ReviewHead";
import ReviewRateDate from "../components/ReviewRateDate";
import UberText from "../components/UberText";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useReviews from "../hooks/useReviews";
import tw from "../lib/tailwind";

const Reviews = () => {
  const { params } = useRoute();
  const { loading, error, reviews } = useReviews(params?.id);
  const { theme, navigation } = useGeneral();
  return (
    <SafeAreaView style={tw`flex-1 px-3 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      {/* header */}
      <View
        style={tw`flex-row items-center justify-between p-3 border-b border-${theme}-accent bg-${theme}-accent`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={30}
            color={appTheme?.[theme].primary}
          />
        </TouchableOpacity>
        <View>
          <UberText
            twStyle={tw`text-${theme}-primary text-lg self-end`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Reviews
          </UberText>
          <UberText twStyle={tw`text-${theme}-primary`}>
            {params?.name}
          </UberText>
        </View>
      </View>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(review) => review.id}
          renderItem={({ item }) => (
            <View style={tw`my-4 mx-3`}>
              {/* Review head */}
              <ReviewHead review={item} />
              {/* Rate date */}
              <ReviewRateDate review={item} />
              {/* text */}
              <UberText
                twStyle={tw`mt-2 text-xs text-${theme}-primary`}
                csStyle={{ fontFamily: "OpenSans_400Regular" }}
              >
                {item.text}
              </UberText>
              {/* review helpfull */}
              <View style={tw`flex-row mt-2 items-center justify-between`}>
                <UberText twStyle={tw`mt-2 text-xs text-${theme}-primary`}>
                  Was this review helpful?
                </UberText>
                <View style={tw`flex-row items-center`}>
                  <TouchableOpacity
                    style={tw`py-1 mx-1 px-3 rounded-full border border-${theme}-primary items-center justify-center`}
                  >
                    <UberText twStyle={tw`text-xs text-${theme}-primary`}>
                      Yes
                    </UberText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`py-1 mx-1 px-3 rounded-full border border-${theme}-primary items-center justify-center`}
                  >
                    <UberText twStyle={tw`text-xs text-${theme}-primary`}>
                      No
                    </UberText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : null}

      {/* loading */}
      {loading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator color={appTheme?.[theme].primary} />
        </View>
      ) : null}

      {/* error */}
      {error ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <UberText
            csStyle={{ fontFamily: "OpenSans_400Regular" }}
            twStyle={tw`text-${theme}-primary`}
          >
            {error}
          </UberText>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Reviews;
