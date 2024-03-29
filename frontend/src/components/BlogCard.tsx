import * as React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-md cursor-pointer">
        <div className="flex">
            <div className="flex">
                <Avatar name={authorName} />
            </div>
            <div className="font-extralight pl-2 text-sm justify-center flex-col">
                {authorName} 
            </div>
            <div className="flex justify-center flex-col pl-2 justify-center flex-col">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm justify-center flex-col">
                {publishedDate}
            </div>
        </div>
        <div className="tet-xl font-semibold pt-2">
            {title}
        </div>
        <div className="tet-xl font-thin justify-evenly">
            {content.slice(0, 100) + "....."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length /100)} minute(s) read`}
        </div>
        {/* <div className="bg-slate-200 h-1 w-full">

        </div> */}
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-q rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size="small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size ==="small" ?"w-6 h-6": "w-10 h-10" } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size==="small" ? "text-xs": "text-md"}  text-xs  text-gray-600 dark:text-gray-300 `}>{name[0]}</span>
</div>
}