import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import { Divider, Icon } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { appTheme } from "../config";
import useActionBottomSheet from "../hooks/useActionBottomSheet";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";
import UberText from "./UberText";
import ImageViewer from "react-native-image-zoom-viewer";
import moment from "moment";

interface Props {
  restaurant: any;
}

const weekDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AboutBottomSheet: React.FC<Props> = ({ restaurant }) => {
  const { theme, navigation } = useGeneral();
  const {
    loading,
    error,
    details,
    imageIndex,
    showFullScreenImage,
    setShowFullScreenImage,
    setImageIndex,
    openDays,
    dayOfWeek,
    datesOfWeek,
  } = useActionBottomSheet(restaurant.id);

  return (
    <>
      <ScrollView style={tw`flex-1 bg-${theme}`}>
        {/* transactions */}
        <View style={tw`items-center border-t border-b border-${theme}-accent`}>
          <FlatList
            data={restaurant?.transactions}
            keyExtractor={(restaurant) => restaurant}
            horizontal
            ItemSeparatorComponent={() => (
              <Divider
                color={appTheme?.[theme].accent}
                width={2}
                orientation="vertical"
              />
            )}
            renderItem={({ item }) => (
              <UberText
                twStyle={tw`text-${theme}-primary mr-1 capitalize py-3 px-3`}
                csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
              >
                {item.split("_").join(" ")}
              </UberText>
            )}
          />
        </View>

        <View style={tw`flex-row items-center justify-between p-5`}>
          {/* Ratings and Reviews */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewsScreen", {
                id: restaurant.id,
                name: restaurant.name,
              })
            }
            style={tw`items-center`}
          >
            <View style={tw`flex-row items-center`}>
              <UberText
                twStyle={tw`text-${theme}-primary mr-1 text-xs`}
                csStyle={{ fontFamily: "OpenSans_400Regular" }}
              >
                {restaurant.rating}
              </UberText>
              <Icon
                name="star"
                type="ionicon"
                size={20}
                color={appTheme?.[theme].primary}
              />
            </View>
            <UberText
              twStyle={tw`text-${theme}-primary mr-1 text-xs mt-1`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              {restaurant.review_count} reviews
            </UberText>
          </TouchableOpacity>
          <Divider
            color={appTheme?.[theme].accent}
            width={2}
            orientation="vertical"
          />
          {/* Distance */}
          <View>
            <Icon
              name="car-sport"
              type="ionicon"
              size={20}
              color={appTheme?.[theme].primary}
            />
            <UberText
              twStyle={tw`text-${theme}-primary mr-1 text-xs mt-1`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              {(restaurant.distance / 1000).toFixed(2)} km
            </UberText>
          </View>
          <Divider
            color={appTheme?.[theme].accent}
            width={2}
            orientation="vertical"
          />
          {/* Price level of the business */}
          <View>
            <Icon
              name="cash"
              type="ionicon"
              size={20}
              color={appTheme?.[theme].primary}
            />
            <UberText
              twStyle={tw`text-${theme}-primary mr-1 text-xs mt-1`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              {restaurant.price}
            </UberText>
          </View>
          <Divider
            color={appTheme?.[theme].accent}
            width={2}
            orientation="vertical"
          />
          {/* Open / Close */}
          <View>
            <Icon
              name={restaurant.is_closed ? "close" : "checkmark"}
              type="ionicon"
              size={20}
              color={restaurant.is_closed ? "#EF4444" : "#10B981"}
            />
            <UberText
              twStyle={tw`text-${theme}-primary mr-1 text-xs mt-1`}
              csStyle={{ fontFamily: "OpenSans_400Regular" }}
            >
              {restaurant.is_closed ? "Closed" : "Open"}
            </UberText>
          </View>
        </View>

        {/* categories */}
        <View style={tw`items-center border-t border-b border-${theme}-accent`}>
          <FlatList
            data={restaurant?.categories}
            keyExtractor={(item) => item.title}
            horizontal
            ItemSeparatorComponent={() => (
              <Divider
                color={appTheme?.[theme].accent}
                width={2}
                orientation="vertical"
              />
            )}
            renderItem={({ item }) => (
              <UberText
                twStyle={tw`text-${theme}-primary mr-1 capitalize py-3 px-3`}
                csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
              >
                {item.title}
              </UberText>
            )}
          />
        </View>

        {details && openDays ? (
          <View style={tw`mt-2`}>
            {/* Images */}
            <FlatList
              data={details?.photos}
              keyExtractor={(item) => item}
              horizontal
              ItemSeparatorComponent={() => (
                <Divider
                  color={appTheme?.[theme].accent}
                  width={2}
                  orientation="vertical"
                />
              )}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setImageIndex(index);
                    setShowFullScreenImage(true);
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    resizeMode="cover"
                    style={tw`w-32 h-48 rounded-lg mx-2`}
                  />
                </TouchableOpacity>
              )}
            />

            {/* Open days */}
            <View style={tw`mt-5`}>
              <View style={tw`flex-row items-center justify-center`}>
                <Icon
                  name="time"
                  type="ionicon"
                  size={25}
                  color={appTheme?.[theme].primary}
                />
                <UberText
                  twStyle={tw`text-${theme}-primary text-lg ml-3`}
                  csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                >
                  Open Hours
                </UberText>
              </View>
              <View style={tw`px-2 mt-3`}>
                <FlatList
                  data={weekDays}
                  keyExtractor={(item) => item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={true}
                  ItemSeparatorComponent={() => (
                    <Divider
                      color={appTheme?.[theme].accent}
                      width={2}
                      orientation="vertical"
                    />
                  )}
                  // initialScrollIndex={2}
                  renderItem={({ item, index }) => (
                    <View style={tw`mt-2`}>
                      <View
                        style={tw`items-center justify-center px-10 py-3 ${
                          dayOfWeek === index ? `bg-${theme}-primary` : ""
                        }`}
                      >
                        <UberText
                          twStyle={tw` text-lg ${
                            dayOfWeek === index
                              ? `text-${theme}`
                              : `text-${theme}-primary`
                          } `}
                          csStyle={{
                            fontFamily: "OpenSans_600SemiBold",
                            opacity: openDays
                              .map((openDay) => openDay.day)
                              .includes(index)
                              ? 1
                              : 0.5,
                          }}
                        >
                          {item}
                        </UberText>
                        <UberText
                          twStyle={tw`${
                            dayOfWeek === index
                              ? `text-${theme}`
                              : `text-${theme}-primary`
                          } text-lg`}
                          csStyle={{
                            fontFamily: "OpenSans_600SemiBold",
                            opacity: openDays
                              .map((openDay) => openDay.day)
                              .includes(index)
                              ? 1
                              : 0.5,
                          }}
                        >
                          {datesOfWeek[index]}
                        </UberText>
                      </View>
                      {openDays
                        .map((openDay) => openDay.day)
                        .includes(index) ? (
                        <View style={tw`mt-3 self-center`}>
                          <UberText
                            twStyle={tw`text-${theme}-primary mb-2`}
                            csStyle={{ fontFamily: "OpenSans_400Regular" }}
                          >
                            {openDays[index]?.start}
                          </UberText>
                          <Divider
                            color={appTheme?.[theme].accent}
                            width={3}
                            orientation="horizontal"
                          />
                          <UberText
                            twStyle={tw`text-${theme}-primary mt-2`}
                            csStyle={{ fontFamily: "OpenSans_400Regular" }}
                          >
                            {openDays[index]?.end}
                          </UberText>
                        </View>
                      ) : (
                        <View style={tw`mt-3 self-center`}>
                          <UberText
                            twStyle={tw`text-${theme}-primary`}
                            csStyle={{ fontFamily: "OpenSans_400Regular" }}
                          >
                            Closed
                          </UberText>
                        </View>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
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
              twStyle={tw`text-${theme}-primary mr-1 capitalize py-3 px-3`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              {error}
            </UberText>
          </View>
        ) : null}
      </ScrollView>
      {details ? (
        <Modal visible={showFullScreenImage} transparent={true}>
          <ImageViewer
            imageUrls={details?.photos.map((image: string) => ({
              url: image,
              width: 806,
              height: 720,
            }))}
            index={imageIndex}
            onCancel={() => setShowFullScreenImage(false)}
            enableSwipeDown
            renderFooter={(currentIndex: any) => (
              <SafeAreaView>
                <View style={tw`px-4 flex-row items-center justify-center`}>
                  <TouchableOpacity
                    onPress={() => setShowFullScreenImage(false)}
                  >
                    <Text style={tw`text-white text-lg font-bold`}>Close</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )}
            onSwipeDown={() => setShowFullScreenImage(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default AboutBottomSheet;
