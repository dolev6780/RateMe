import { useUserContext } from "./useUserContext";

export const useSignout = () => {
const {dispatch} = useUserContext();
const signout = () => {
    localStorage.removeItem('user');
    
    dispatch({type: "SIGNOUT"})

}
    return {signout};
}