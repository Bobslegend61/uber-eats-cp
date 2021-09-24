import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import AccountStack from "./components/AccountStack";
import CartStack from "./components/CartStack";
import HomeStack from "./components/HomeStack";
import LoginInStack from "./components/LoginInStack";
import UberText from "./components/UberText";
import { appTheme } from "./config";
import useAuth from "./hooks/useAuth";
import useGeneral from "./hooks/useGeneral";
import tw from "./lib/tailwind";
import OrdersScreen from "./screens/OrdersScreen";

interface Screen {
  name: string;
  component: React.FC;
  iconActive: string;
  iconInactive: string;
  bardge?: boolean;
}

const authScreen: Screen[] = [
  {
    name: "Login",
    component: LoginInStack,
    iconInactive: "log-in-outline",
    iconActive: "log-in",
  },
];

const screens: Screen[] = [
  {
    name: "Home",
    component: HomeStack,
    iconInactive: "home-outline",
    iconActive: "home",
  },
  {
    name: "Browse",
    component: HomeStack,
    iconInactive: "search-outline",
    iconActive: "search",
  },

  {
    name: "Orders",
    component: OrdersScreen,
    iconInactive: "receipt-outline",
    iconActive: "receipt",
  },
  {
    name: "Account",
    component: AccountStack,
    iconInactive: "person-outline",
    iconActive: "person",
  },
  {
    name: "Cart",
    component: CartStack,
    iconInactive: "cart-outline",
    iconActive: "cart",
    bardge: true,
  },
];

const AppIndex = () => {
  const { fontsLoaded, authenticateUser } = useAuth();
  const { theme, cart, loading, auth } = useGeneral();
  const Tab = createBottomTabNavigator();

  if (!fontsLoaded || !auth.loaded) {
    return (
      <AppLoading
        startAsync={authenticateUser}
        onFinish={() => console.log("Done!")}
        onError={(e) => console.log(e)}
      />
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: appTheme?.[theme!].DEFAULT,
            borderTopColor: appTheme?.[theme!].primary,
          },
        }}
      >
        {!auth.user
          ? authScreen.map(
              ({ name, component, iconInactive, iconActive, bardge }, i) => (
                <Tab.Screen
                  name={name}
                  component={component}
                  key={i}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon
                        color={appTheme?.[theme].primary}
                        type="ionicon"
                        name={focused ? iconActive : iconInactive}
                        size={25}
                      />
                    ),
                    tabBarLabelStyle: {
                      color: appTheme?.[theme].primary,
                      fontSize: 12,
                      fontFamily: "OpenSans_400Regular",
                    },
                  }}
                />
              ),
            )
          : screens.map(
              ({ name, component, iconInactive, iconActive, bardge }, i) => (
                <Tab.Screen
                  name={name}
                  component={component}
                  key={i}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon
                        color={appTheme?.[theme].primary}
                        type="ionicon"
                        name={focused ? iconActive : iconInactive}
                        size={25}
                      />
                    ),
                    tabBarLabelStyle: {
                      color: appTheme?.[theme].primary,
                      fontSize: 12,
                      fontFamily: "OpenSans_400Regular",
                    },
                    tabBarBadge: bardge
                      ? cart
                          .flatMap((item) =>
                            item.items.map((product) => product.quantity),
                          )
                          .reduce((a, b) => a + b, 0)
                      : undefined,
                    tabBarBadgeStyle: {
                      color: appTheme?.[theme!].DEFAULT,
                      backgroundColor: appTheme?.[theme!].secondary,
                      fontWeight: "bold",
                      fontSize: 10,
                    },
                  }}
                />
              ),
            )}
      </Tab.Navigator>
      <Modal visible={loading} transparent={true}>
        <View
          style={[
            tw`flex-1 items-center justify-center`,
            { backgroundColor: "rgba(0,0,0,.8)" },
          ]}
        >
          <View
            style={tw`w-1/2 px-4 py-6 bg-${theme} flex-row items-center justify-center rounded-md`}
          >
            <ActivityIndicator color={appTheme?.[theme].primary} />
            <UberText
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
              twStyle={tw`text-${theme}-primary ml-3`}
            >
              Please wait...
            </UberText>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppIndex;
