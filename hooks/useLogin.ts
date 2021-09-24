import { useState } from "react";
import User from "../classes/User";
import { firebase } from "../firebase.config";
import { toast } from "../lib";
import { setActivityLoader } from "../slices/activityLoader";
import useGeneral from "./useGeneral";
const useLogin = () => {
  const { dispatch } = useGeneral();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const login = async () => {
    dispatch(setActivityLoader(true));
    try {
      if (!email || !password) throw { message: "All fields are required." };
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.toLocaleLowerCase(), password);
      dispatch(setActivityLoader(false));
    } catch (error: any) {
      toast(error?.message || "Error occured, please try again.");
      dispatch(setActivityLoader(false));
    }
  };

  const register = async () => {
    dispatch(setActivityLoader(true));
    try {
      if (!email || !password || !firstName || !lastName || !confirmPassword)
        throw { message: "All fields are required." };
      if (password !== confirmPassword)
        throw { message: "Password does not match." };
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const authUser = new User(user?.uid!);
      await authUser.createProfile({
        firstName,
        lastName,
        email: email.toLocaleLowerCase(),
      });
      dispatch(setActivityLoader(false));
    } catch (error: any) {
      toast(error?.message || "Error occured, please try again.");
      dispatch(setActivityLoader(false));
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    login,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    confirmPassword,
    setConfirmPassword,
    resetFields,
    register,
  };
};

export default useLogin;
