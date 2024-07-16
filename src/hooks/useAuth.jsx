import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const storedIdentifier = localStorage.getItem("identifier");
    const token = localStorage.getItem("token");
    if (storedIdentifier && token) {
      fetchUserData(storedIdentifier, token)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setUser(null); // Clear user state if fetching fails
          setLoading(false);
        });
    } else {
      setUser(null); // No stored identifier, clear user state
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (identifier, token) => {
    try {
      const response = await axiosPublic.get(`/user/${identifier}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  };

  return { user, setUser, loading };
};

export default useAuth;
