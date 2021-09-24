import User from "../classes/User";
import { timestamp } from "../firebase.config";
import { toast } from "../lib";
import { setActivityLoader } from "../slices/activityLoader";
import { resetCart } from "../slices/cartSlice";
import useGeneral from "./useGeneral";
import { CommonActions } from "@react-navigation/native";

const useCart = () => {
  const {
    auth: { user },
    cart,
    dispatch,
    navigation,
  } = useGeneral();

  const purchase = async () => {
    try {
      dispatch(setActivityLoader(true));
      const authUser = new User(user?.id!);

      const orderData = {
        userId: user?.id,
        createdAt: timestamp(),
        totalAmount: cart
          .flatMap((item) =>
            item.items.map((product) => product.quantity * product.price),
          )
          .reduce((a, b) => a + b, 0)
          .toFixed(2),
        items: cart,
      };

      //   await authUser.placeOrder(orderData);
      dispatch(resetCart());
      dispatch(setActivityLoader(false));

      navigation.dispatch({
        ...CommonActions.navigate("PaymentSuccessScreen"),
      });
      //   navigation.navigate("PaymentSuccessScreen");
    } catch (error: any) {
      dispatch(setActivityLoader(true));
      toast(error.message);
    }
  };

  return {
    purchase,
  };
};

export default useCart;
