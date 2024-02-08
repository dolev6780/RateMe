import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload };
    case "SIGNUP":
      return { ...state, user: null };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "CLEAR_PROFILE":
      return { ...state, profile: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    profile: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      dispatch({ type: "SIGNIN", payload: user });
    }
    if (profile) {
      dispatch({ type: "SET_PROFILE", payload: profile });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
