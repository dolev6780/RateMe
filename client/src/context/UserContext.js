import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { user: action.payload };
    case "SIGNUP":
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch({type:"SIGNIN", payload: user});
    }
  },[])
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
