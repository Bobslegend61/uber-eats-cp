import { YELP_API_KEY } from "@env";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";

const useActionBottomSheet = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [details, setDetails] = useState<any>(null);
  const [openDays, setOpenDays] = useState<
    { is_overnight: boolean; start: string; end: string; day: number }[]
  >([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showFullScreenImage, setShowFullScreenImage] =
    useState<boolean>(false);

  const dayOfWeek =
    Number(moment().format("d")) === 0 ? 6 : Number(moment().format("d")) - 1;

  const datesOfWeek = [];
  for (let i = 0; i <= 6; i++) {
    if (i === 3) {
      datesOfWeek.push(moment().format("DD"));
    } else if (i < 3) {
      datesOfWeek.push(
        moment()
          .subtract(3 - i, "days")
          .format("DD"),
      );
    } else {
      datesOfWeek.push(
        moment()
          .add(i - 3, "days")
          .format("DD"),
      );
    }
  }

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    let unmounted = false;
    const getRestaurantDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios({
          url: `https://api.yelp.com/v3/businesses/${id}`,
          method: "GET",
          cancelToken: cancelTokenSource.token,
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        });

        if (!unmounted) {
          setOpenDays(data?.hours[0]?.open);
          setDetails(data);
          setLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          setError("Unable to fetch restaurant details.");
          setLoading(false);
        }
      }
    };

    getRestaurantDetails();
    return () => {
      unmounted = true;
      cancelTokenSource.cancel();
    };
  }, [id]);

  return {
    loading,
    error,
    details,
    imageIndex,
    showFullScreenImage,
    setImageIndex,
    openDays,
    setShowFullScreenImage,
    dayOfWeek,
    datesOfWeek,
  };
};

export default useActionBottomSheet;
