import { useState } from "react";
import {useUserContext} from './useUserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const useSignin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();
  const signin = (email, password) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("/api/user/signin", {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        dispatch({ type: "SIGNIN", payload: res.data });
        dispatch({ type: "SET_PROFILE", payload: res.data.profile });
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  };

  return { signin, isLoading, error };
}