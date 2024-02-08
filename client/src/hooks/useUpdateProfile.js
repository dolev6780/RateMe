import { useState } from "react";
import {useUserContext} from './useUserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();
  const updateProfile = (profilePic, firstName, lastName, userName, email, gender, dateOfBirth) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("/api/profile/updateprofile", {
        profilePic,
        firstName,
        lastName,
        userName,
        email,
        gender,
        dateOfBirth,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        localStorage.setItem("profile", JSON.stringify(res.data));
        dispatch({ type: "SET_PROFILE", payload: res.data });
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  };

  return { updateProfile, isLoading, error };
}