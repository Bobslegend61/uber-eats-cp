import User from "../classes/User";
import { storeData } from "../lib";
import useGeneral from "./useGeneral";

const useAccount = (id: string) => {
  const { auth } = useGeneral();

  const toogleTheme = async () => {
    const authUser = new User(id);
    const isDark = auth.user?.darkMode ? false : true;

    await storeData("theme", JSON.stringify(isDark));

    await authUser.updateProfile({ darkMode: isDark });
  };
  return {
    toogleTheme,
  };
};

export default useAccount;
