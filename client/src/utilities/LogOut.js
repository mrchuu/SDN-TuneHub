import { useDispatch } from "react-redux";
import {logOut} from "../redux/auth.js"
export default function LogOut() {
    const dispatch = useDispatch();
    const clearToken = () =>{
        clearCo
    }
    const clearAuthInfo = () =>{
        dispatch(logOut());
    }
}
