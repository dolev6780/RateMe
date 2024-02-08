import { useUserContext } from "./useUserContext";

export const useSignout = () => {
const {dispatch} = useUserContext();
const signout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    dispatch({type: "SIGNOUT"})
    dispatch({type: "CLEAR_PROFILE"})

}
    return {signout};
}