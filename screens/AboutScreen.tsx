import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";
import About from "../components/About";
import AboutBottomSheet from "../components/AboutBottomSheet";
import FoodItems from "../components/FoodItems";
import { appTheme } from "../config";
import useBottomSheet from "../hooks/useBottomSheet";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";

const AboutScreen = () => {
  const { theme } = useGeneral();
  const { params } = useRoute();
  const {
    bottomSheetModalRef,
    snapPoints,
    handlePresentModalPress,
    handleSheetChanges,
  } = useBottomSheet();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme} />
      {/* About */}
      <About
        restaurant={params?.restaurant}
        handleModal={handlePresentModalPress}
      />

      {/* food items */}
      <FoodItems restaurant={params?.restaurant} />

      {/* BottomSheet */}
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleStyle={{
              backgroundColor: appTheme?.[theme].primary,
            }}
            handleIndicatorStyle={{
              backgroundColor: appTheme?.[theme].accent,
            }}
          >
            <AboutBottomSheet restaurant={params?.restaurant} />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default AboutScreen;
