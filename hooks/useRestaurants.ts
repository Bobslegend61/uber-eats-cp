import { YELP_API_KEY } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";
import useGeneral from "./useGeneral";

const useRestaurants = (page: number) => {
  const { location } = useGeneral();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [restaurants, setRestaurants] = useState<any>([]);

  const getRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchRestaurants();
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
      const data = await fetchRestaurants();
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
    const {
      data: { businesses },
    } = await axios({
      url: `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&offset=${
        restaurants.length > 0 ? restaurants.length : 0
      }`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    return businesses;
  };

  const reload = () => getRestaurants();

  useEffect(() => {
    if (!location || loading) return;
    getRestaurants();
  }, [location]);

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
