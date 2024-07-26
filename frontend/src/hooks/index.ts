import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
 

export const useBlog = ({id}: {id: string}) =>{
    const [blog, setBlog] = useState();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
        }).then(response =>{
            
            setBlog(response.data.blogs);
            setLoading(false);
        })
    },[id])
    
    return {
        blog,
        loading,
    }
}
export const useBlogs = () =>{
    const [blogs, setBlogs] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
        }).then(response =>{
            
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])
    
    return {
        blogs,
        loading,
    }
}