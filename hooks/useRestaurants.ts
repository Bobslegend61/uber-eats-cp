import { YELP_API_KEY } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";
import useGeneral from "./useGeneral";

const useRestaurants = (page: number, browse?: boolean, search?: string) => {
  const { location } = useGeneral();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [restaurants, setRestaurants] = useState<any>([]);

  const getRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      let data: any;
      if (search) {
        data = await fetchBrowseRestaurants();
      } else {
        data = await fetchRestaurants();
      }
      setRestaurants(data);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error.description);
      } else if (error.request) {
        setError(
          "Something went wrong. Please check you connection and try again.",
        );
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  const getMoreRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      let data: any;
      if (search) {
        data = await fetchBrowseRestaurants();
      } else {
        data = await fetchRestaurants();
      }
      setRestaurants((prevRestaurants: any) => [...prevRestaurants, ...data]);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error.description);
      } else if (error.request) {
        setError(
          "Something went wrong. Please check you connection and try again.",
        );
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    const resLen = restaurants.length;
    const url =
      restaurants.length > 0
        ? `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&offset=${resLen}`
        : `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}`;
    const {
      data: { businesses },
    } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    return businesses;
  };

  const fetchBrowseRestaurants = async () => {
    const resLen = restaurants.length;
    const url =
      restaurants.length > 0
        ? `https://api.yelp.com/v3/businesses/search?term=${search}&location=${location}&offset=${resLen}`
        : `https://api.yelp.com/v3/businesses/search?term=${search}&location=${location}`;
    const {
      data: { businesses },
    } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    return businesses;
  };

  const reload = () => getRestaurants();

  useEffect(() => {
    if ((browse && !search) || loading) return;
    if ((!browse && !location) || loading) return;
    getRestaurants();
  }, [location, search]);

  useEffect(() => {
    if (page === 1 || loading || !location) return;
    getMoreRestaurants();
  }, [page]);

  return {
    loading,
    restaurants,
    error,
    reload,
    getMoreRestaurants,
  };
};

export default useRestaurants;
