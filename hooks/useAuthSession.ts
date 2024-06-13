import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error("Failed to fetch user:", error);
          dispatch(clearAuth());
          localStorage.removeItem("token");
        }
      } else {
        dispatch(clearAuth());
      }
    };

    checkUserSession();
  }, [dispatch]);
  
  return user;
};

export default useAuthSession;
