import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog{
    title: string;
    content: string;
    author:{name: string}
    id: string;
    published: string;
}

export const useBlog = ({id}: {id: string}) =>{
    const [blog, setBlog] = useState<Blog>();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
        }).then(response =>{
            
            setBlog(response.data.data);
            setLoading(false);
        })
    },[id])
    console.log(blog);
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