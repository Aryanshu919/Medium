import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";

  
export const Blog = () =>{
    const {id} = useParams();
    const { blog, loading } = useBlog({
        id : id || "",  
    });
    if(loading){
        return <div>
            <Loader/>
        </div>
    }
    return <div> 
           <FullBlog blog = {blog} /> 
        </div>
}