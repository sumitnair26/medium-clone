import { Appbar } from "./Appbar"
import { Blog } from "../hooks/index"
import { Avatar } from "./BlogCard";


export const FullBlog = ({blog}: {blog: Blog}) => {
   return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-h-xl pt-12">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 17 March 2024
                    </div>
                    <div className="pt-4 content-evenly">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-2">
                            <Avatar name={blog.author.name || "Sumit Nair"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Sumit Nair"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Some Random text here for author as we are not yet fetching this details from backend.
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
}