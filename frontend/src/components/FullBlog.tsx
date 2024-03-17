import { Appbar } from "./Appbar"
import { Blog } from "../hooks/index"


export const FullBlog = ({blog}: {blog: Blog}) => {
    console.log(blog);
   return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-h-2xl">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 17 March 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">

                </div>
            </div>
        </div>
    </div>
}