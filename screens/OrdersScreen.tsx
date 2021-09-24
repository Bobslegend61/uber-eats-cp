import moment from "moment";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import UberText from "../components/UberText";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useOrders from "../hooks/useOrders";
import tw from "../lib/tailwind";

const OrdersScreen = () => {
  const { theme } = useGeneral();
  const { loading, orders } = useOrders();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`bg-${theme}-accent p-3`}>
          <UberText
            twStyle={tw`text-${theme}-primary text-lg`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Orders
          </UberText>
        </View>

        {loading ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator color={appTheme?.[theme].primary} />
          </View>
        ) : null}

        {orders.length > 0
          ? orders.map((order: any) => (
              <View key={order.id}>
                <View style={tw`my-2 px-3`}>
                  <UberText
                    twStyle={tw`text-lg text-${theme}-primary`}
                    csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                  >
                    {moment(order.createdAt.toDate()).format(
                      "DD/MM/YYYY HH:mm",
                    )}
                  </UberText>
                </View>
                {order.items.map((restaurant: any) => (
                  <View key={restaurant.id} style={tw`mx-2 p-2 mb-2 rounded`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <UberText
                        twStyle={tw`text-lg text-${theme}-primary`}
                        csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                      >
                        {restaurant.name}
                      </UberText>
                    </View>
                    <View style={tw` shadow-lg`}>
                      {restaurant.items.map((food: any, i: number) => (
                        <CartItem
                          key={i}
                          restaurant={restaurant}
                          food={food}
                          orders={true}
                        />
                      ))}
                      <View
                        style={tw`flex-row items-center justify-between px-2 py-3 bg-${theme}-accent rounded-b-lg`}
                      >
                        <UberText
                          twStyle={[tw`mx-2 text-${theme}-primary`]}
                          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                        >
                          Subtotal
                        </UberText>
                        <UberText
                          twStyle={[tw`mx-2 text-${theme}-primary`]}
                          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                        >
                          $
                          {restaurant.items
                            .map((item) => item.price * item.quantity)
                            .reduce((a, b) => a + b, 0)
                            .toFixed(2)}
                        </UberText>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))
          : null}
      </SafeAreaView>
    </View>
  );
};

export default OrdersScreen;
