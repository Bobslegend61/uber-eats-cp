import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

const useBottomSheet = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["18%", "75%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return {
    bottomSheetModalRef,
    snapPoints,
    handlePresentModalPress,
    handleSheetChanges,
  };
};

export default useBottomSheet;
