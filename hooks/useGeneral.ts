import { useNavigation } from "@react-navigation/core";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import { firebase } from "../firebase.config";
import { selectActivityLoader } from "../slices/activityLoader";
import { selectUser } from "../slices/authSlice";
import { selectCart } from "../slices/cartSlice";
import { selelctLocation } from "../slices/locationSlice";
import { selelctRestaurantType } from "../slices/restaurantTypeSlice";
import { selelctTheme } from "../slices/themeSlice";
import { useAppDispatch, useAppSelector } from "./useReduxDispatchAndSelector";

const useGeneral = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const restaurantType = useAppSelector(selelctRestaurantType);
  const theme = useAppSelector(selelctTheme);
  const location = useAppSelector(selelctLocation);
  const cart = useAppSelector(selectCart);
  const loading = useAppSelector(selectActivityLoader);
  const auth = useAppSelector(selectUser);

  const makePhoneCall = async (url: string, number: string) => {
    try {
      const canOpenUrl = await Linking.canOpenURL(url);
      if (!canOpenUrl) throw new Error("Unable to place your call.");
      await Linking.openURL(url);
    } catch (error: any) {
      Alert.alert(
        "Call",
        `${error.message}. Please make sure you have the phone app installed. - ${number}`,
        [{ text: "OK" }],
      );
    }
  };

  const openBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return {
    openBrowser,
    makePhoneCall,
    logout,
    dispatch,
    restaurantType,
    theme,
    location,
    auth,
    navigation,
    cart,
    loading,
  };
};

export default useGeneral;
