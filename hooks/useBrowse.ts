import { YELP_API_KEY } from "@env";
import axios from "axios";
import { useState } from "react";

const useBrowse = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const userScrolling = async ({ nativeEvent }: any) => {
    if (isCloseToBottom(nativeEvent)) {
      setPage((prev: number) => prev + 1);
    }
  };

  return {
    page,
    userScrolling,
    searchTerm,
    setSearchTerm,
  };
};

export default useBrowse;
