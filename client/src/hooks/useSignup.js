import { useState } from "react";
import {useUserContext} from './useUserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const useSignup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useUserContext();
    const signup = (firstName, lastName, userName, email, password) => {
      setIsLoading(true);
      setError(null);
      console.log(firstName);
      axios
        .post("/api/user/signup", {
          firstName,
          lastName,
          userName,
          email,
          password,
        })
        .then((res) => {
          setIsLoading(false);
          navigate("/signin");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          console.log("error", err);
        });
    };


    return {signup, isLoading, error}

}