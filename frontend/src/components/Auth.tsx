import { SignupInput } from "@01xaryan/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type} : {type: "signin" | "signup"}) => {
    
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email : "",
        password: "",
    })

    async function sendRequest(){
       try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
      
        const jwt = response.data.jwt;
       
        localStorage.setItem("token", jwt);
        navigate("/blogs")
       } catch (error) {
        console.log(error);
            alert("Error while signing up")
       }
    }

    return <div className="flex h-screen justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400 ">
                    {type === "signup" ? "Already have an account?" : "Don't have any account"} 
                        <Link to={type ==="signin" ? "/signup" : "/signin"} className="underline pl-2 font-light">
                            { type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                </div>
            </div>
            <div className="pt-8">
                {type === "signup" ? <LabelledInput label="Username" placeholder="Enter you Username" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} /> : null}    

                <LabelledInput label="Email" placeholder="abc@gamil.com" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />      

                <LabelledInput label="Password" placeholder="password" type="password" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
                <button type="button" onClick={sendRequest} className="w-full mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none
                 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2
                  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  {type === "signup" ? "Sign up" : "Sign in"}
                </button>

                </div>
             </div>   
        </div>            
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}
function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
    return<div>
    <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
    <input  type={type || "text"} id="first_name" onChange = {onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={ placeholder } required />
</div>
}