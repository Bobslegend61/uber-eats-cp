import { useState } from "react";

const useHomeScreen = () => {
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
  };
};

export default useHomeScreen;
