import { useAppDispatch, useAppSelector } from "./useReduxDispatchAndSelector";

const useGeneral = () => {
  const dispatch = useAppDispatch();

  return {
    dispatch,
  };
};

export default useGeneral;
