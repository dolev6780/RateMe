import { useState } from "react";
import axios from "axios";

export const useCreatePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const createPost = async (postPic, content, userName) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/api/post/createpost", {
        postPic,
        content,
        userName,
      });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while updating the profile.");
      console.error("Update Profile Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading, error };
}
