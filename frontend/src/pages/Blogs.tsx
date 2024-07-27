import { AppBar } from "../components/AppBar"
import {  BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Loader } from "../components/Loader"

export const Blogs = () => {

    const {blogs, loading} = useBlogs();
    
    if(loading){
        return <div>
            <Loader />
            </div>
    }
    
    return <div>
    <AppBar/>
    <div className="flex justify-center">
      <div className=""> 
        {blogs.map((blog: { title: string; content: string; author: { name: string }; published: string; id: string })=> 
            <BlogCard 
            id = {blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || "anoymous"}
            publishedDate={"26 July, 2024"} />
        )}
       
      </div>
    </div> 
    </div>   
}