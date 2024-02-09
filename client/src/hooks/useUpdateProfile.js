import { useState } from "react";
import { useUserContext } from './useUserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useUserContext();

  const updateProfile = async (profilePic, firstName, lastName, userName, email, gender, dateOfBirth) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/profile/updateprofile", {
        profilePic,
        firstName,
        lastName,
        userName,
        email,
        gender,
        dateOfBirth,
      });

      const updatedProfile = response.data;
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      dispatch({ type: "SET_PROFILE", payload: updatedProfile });
      
      // Redirect to the profile page after successful update
     // navigate(`/profile/${updatedProfile._id}`);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while updating the profile.");
      console.error("Update Profile Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
}
