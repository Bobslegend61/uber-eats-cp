import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import useGeneral from "./useGeneral";
import { firebase } from "../firebase.config";
import { setUser, UserData } from "../slices/authSlice";
import User from "../classes/User";
import { setTheme } from "../slices/themeSlice";
import { getData } from "../lib";

const useAuth = () => {
  const { theme, dispatch } = useGeneral();

  // Load google fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  //   Authenticate user
  const authenticateUser: () => Promise<void> = async () => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const authUser = new User(user.uid);

          authUser.watchProfile((profile: UserData | null) => {
            if (profile) {
              // check theme
              if (profile?.darkMode) {
                dispatch(setTheme("dark"));
              } else {
                dispatch(setTheme("light"));
              }

              dispatch(setUser(profile));
            } else {
              dispatch(setUser(null));
            }
          });
        } else {
          const value = await getData("theme");
          const isDark = value ? JSON.parse(value) : null;
          const theme = isDark ? "dark" : "light";
          dispatch(setTheme(theme));
          dispatch(setUser(null));
        }
      });
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
