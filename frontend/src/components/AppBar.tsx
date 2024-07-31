import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Logout } from "./Logout"

export const AppBar = () => {
    
    return <div className="flex border-b justify-between py-2 cursor-pointer px-10">
    <Link to ={`/blogs`}>
                <div className="font-bold mt-2"> 
                    Medium 
                </div>
            </Link>        
            <div className="flex">
            <Link to={"/publish"} >
                <button type="button" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 
                focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 mr-4 
                ">Create</button>
            </Link>   
            <div className="flex mt-2">
                <Logout />
                 
            </div>         
           </div>
        </div>
    
}