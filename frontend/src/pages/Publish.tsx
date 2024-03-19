import { ChangeEvent, useState } from "react";
import axios from "../../node_modules/axios/index";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    return <div>
                <Appbar />
                <div className="flex justify-center pt-8">
                    <div className="max-w-screen-lg w-full">
                    <ToastContainer />
                        <input onChange={(e)=>{
                            setTitle(e.target.value)
                        }} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Title" />
                        <TextEditor onChange={(e)=>setContent(e.target.value)} />
                        <button onClick={async()=>{
                                if (!title || !content) {                                    
                                        toast.error('Opps!!!! Title & Content Mandatory.');
                                    return;
                                }
                               const response = await axios.post(`${BACKEND_URL}api/v1/blog`,{
                                    title,
                                    content }, {
                                        headers:{
                                            Authorization: localStorage.getItem(`token`)
                                    }
                                });
                                if (response) {
                                    navigate(`/blog/${response.data.id}`)
                                }else{
                                    alert('Something went wrong');
                                }
                            }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
                                Publish post
                        </button>
                    </div>
                </div>
            </div>
}


function TextEditor({onChange}: {onChange: {e:ChangeEvent<HTMLTextAreaElement>}}) {
    return <div className="mt-2">
        <div className="w-full mb-4 border">
            <div className="flex items-center justify-between ">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label for="editor" className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows="8" className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 pl-2" placeholder="Write an article..." required />
                </div>
             </div>
        </div>
        </div>

    
}