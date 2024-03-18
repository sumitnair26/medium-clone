import { useBlog } from "../hooks/index";
import {useParams} from "react-router-dom";
import { FullBlog } from "../components/FullBlog";

//add scalatins for loading
export const Blog = () => {
    const { id } =useParams();
    const {loading, blog} =useBlog({
        id:id || ""
    });
    if (loading) {
        return <div>
            Loading......
        </div>
    }
    return <div>
        <FullBlog blog={ blog } />
    </div>
}