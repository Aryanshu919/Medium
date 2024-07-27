import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar, Circle } from "./BlogCard"

export const FullBlog = ({ blog } : { blog : Blog }) =>{
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-lg">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 26 July, 2024 
                    </div>
                    <div className="pt-3">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-sm text-gray-500">Author</div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-2">
                            <Avatar name={blog.author.name || "A"}/>
                        </div>
                        <div>
                            <div className="text-sm font-bold pt-2">{blog.author.name || "Anonymous"}</div>
                            <div className="text-xs pt-2 text-slate-500">Master of mirth, purveyour of puns, and
                                the tunniest person in the kingdom.
                            </div>
                        </div>
                    </div>
                </div>    
                
            </div>        
        </div>
    </div>
}
