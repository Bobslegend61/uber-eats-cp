import { useState, useEffect } from "react";
import User from "../classes/User";
import useGeneral from "./useGeneral";

const useOrders = () => {
  const { auth } = useGeneral();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    const authUser = new User(auth.user?.id!);
    authUser.fetchOrders((docs: any) => {
      setOrders(docs);
      setLoading(false);
    });
  }, []);

  return {
    orders,
    loading,
  };
};

export default useOrders;
