import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";

const useAuth = () => {
  // Load google fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
  });

  //   Authenticate user
  const authenticateUser: () => Promise<void> = async () => {
    try {
      console.log("Hello");
    } catch (error) {
      throw error;
    }
  };

  return {
    fontsLoaded,
    authenticateUser,
  };
};

export default useAuth;
