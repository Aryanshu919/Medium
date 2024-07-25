interface BlogCardProps {
    authorName : string,
    title: string,
    content : string,
    publishedDate : string,

}

export const BlogCard =({authorName, title, content, publishedDate} : BlogCardProps) =>{
    return <div className="border border-slate-200 pb-4">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
            </div>
            <div className="font-e pl-2">{authorName} </div> 
            <div className="flex justify-center flex-col ml-2">
                <Circle />
            </div>
            <div className="pl-2 text-sm font-thin">{publishedDate}</div>
            
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.slice(0,100) + "... "}
        </div>
        <div className="text-gray-500 text-xs font-light">
            {`${Math.ceil(content.length / 100)} min read `}
        </div>
    </div>
}

function Circle(){
    return <div className="bg-gray-400 w-1 h-1 rounded-full">
    </div>
}

function Avatar({name} : {name: string}){
    return <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden 
    bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-xs text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
    </div>
}