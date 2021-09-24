import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const toast: (message: string, options?: any) => void = (
  message,
  options,
) => {
  if (options) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      textStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },
      ...options,
    });
  } else {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      containerStyle: {
        zIndex: 1000,
      },
      textStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },
    });
  }
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
