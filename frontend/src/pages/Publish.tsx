import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle ] = useState("");
    const [content, setContent] = useState("");
    const navigate  = useNavigate();

    
   return <div>
        <AppBar />
        <div className="flex justify-center w-full">
            <div className="max-w-2xl w-full pt-8">
                <input onChange={(e) =>{
                    setTitle(e.target.value);
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
                <TextArea onChange = {(e) =>{
                    setContent(e.target.value)
                }}/>
                <button onClick={async() =>{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                       title,
                       content,
                    },{
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
               }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                   Publish 
               </button>
            </div>
        </div>
   </div>
}


function TextArea({onChange} : {onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void}){
    return <div>
       <div className="w-full mt-3 mb-4 border border-gray-200 rounded-lg bg-gray-5">
           <div className="px-4 py-2 bg-white rounded-t-lg ">
               <textarea onChange={onChange} rows="8" class="w-full px-0 text-sm text-gray-900 bg-white border-0" placeholder="Write a comment..." required ></textarea>
            </div>
       </div>
    </div>
   
    
}