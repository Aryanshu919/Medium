import { BiSolidLogOut } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
export const  Logout =() =>{
    const navigate = useNavigate();
    function logOutHandler(){
        localStorage.removeItem("token");
        navigate("/signin");
    }
    return <div>
        <BiSolidLogOut onClick={logOutHandler} className="w-8 h-8 hover:shadow-lg hover:opacity-65"/>
    </div>
}