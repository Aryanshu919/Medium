import { Avatar } from "./BlogCard"
export const AppBar = () => {
    return <div className="flex border-b justify-between py-2 px-10">
        <div> 
            Medium 
        </div>        
        <div>
            <Avatar name ="aryan" />
        </div>
    </div>
}