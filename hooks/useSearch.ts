import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { setLocation } from "../slices/locationSlice";
import useGeneral from "./useGeneral";
import axios from "axios";
import { GOOGLE_API_KEY } from "@env";

const useSearch = () => {
  const { dispatch, location } = useGeneral();
  const searchRef = useRef(null);

  useEffect(() => {
    const searchTerm = searchRef?.current?.getAddressText();
    if (!searchTerm && location) {
      searchRef.current?.setAddressText(location);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { data } = await axios({
          method: "GET",
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`,
        });

        const address = data.results[0].formatted_address;
        dispatch(setLocation(address));
        searchRef?.current?.setAddressText(address);
      } catch (e) {
        // fail silently
      }
    })();
  }, []);

  const onSearchButtonClicked = () => {
    const searchTerm = searchRef?.current?.getAddressText();
    if (searchTerm === location) return;
    dispatch(setLocation(searchTerm));
  };

  return {
    searchRef,
    onSearchButtonClicked,
  };
};

export default useSearch;
