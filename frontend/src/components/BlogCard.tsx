import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string,
    authorName : string,
    title: string,
    content : string,
    publishedDate : string,

}

export const BlogCard =({id, authorName, title, content, publishedDate} : BlogCardProps) =>{

return <Link to={`/blog/${id}`}>
<div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
                <Avatar name={authorName}/>
            <div className="font-extralight pl-2 flex justify-center flex-col">{authorName} </div> 
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div>
            <div className="pl-2 text-sm font-thin flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "... "} 
        </div>
        <div className="text-gray-500 text-sm font-thin pt-2">
            {`${Math.ceil(content.length / 100)} min read `}
        </div>
    </div>
</Link>
}

function Circle(){
    return <div className="bg-gray-400 w-1 h-1 rounded-full">
    </div>
}

export function Avatar({name} : {name: string | "anonymous"}){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden 
    bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-xs text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
    </div>
}