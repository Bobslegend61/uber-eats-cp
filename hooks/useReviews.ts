import { YELP_API_KEY } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = (id: string) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    let unmounted = false;
    const getReviews = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios({
          url: `https://api.yelp.com/v3/businesses/${id}/reviews`,
          method: "GET",
          cancelToken: cancelTokenSource.token,
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        });

        if (!unmounted) {
          setReviews(data.reviews);
          setLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          setError("Unable to fetch restaurant reviews.");
          setLoading(false);
        }
      }
    };

    getReviews();
    return () => {
      unmounted = true;
      cancelTokenSource.cancel();
    };
  }, [id]);
  return {
    reviews,
    loading,
    error,
  };
};

export default useReviews;
