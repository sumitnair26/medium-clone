import { ChangeEvent, useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput,signinInput } from "@sumitnair26/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Auth = ({type}: {type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name:"",
        email:"",
        password:""
    });
    const [buttonDisabled, setDisabled] = useState(false);
    let  success  = signupInput.safeParse(postInputs);
    async function sendRequest() {
        setDisabled(true);
    if (type==="signin") {
        let success  =  signinInput.safeParse(postInputs);
    } 
    if (!success.success) {
        setDisabled(false);
        console.log('error occured');
        toast.error('Opps!!!! Validation Failed');
        return;
    }
    try {
        const response = await axios.post(`${BACKEND_URL}api/v1/user/${type==="signup"?"signup":"signin"}`,
            postInputs
        ,{
            headers: {
              'Content-Length': postInputs.length
            }
          });
        const jwt = response.data.jwt;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    } catch (e) {
        console.log(e);
    }
    setDisabled(false);
    }

    return <div className="h-screen flex justify-center flex-col" >
            <div className="flex justify-center">
                <div>
                        <ToastContainer />
                        <div className="px-10">
                            <div className="text-3xl fond-extrabold">
                                Create an account
                            </div>
                            <div className="text-slate-400">
                                {type==="signin"? "Don't have an account?":"Already have an account?"}
                                <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}> {type === "signin"? "sign up": "Sign in"} </Link> 
                            </div>
                        </div>
                        <div className="pt-5">
                            { type==="signup"?<LabelledInput label="Name" placeholder="Sumit Nair" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value,        
                                })
                            }} /> : null }
                            <LabelledInput label="Email" placeholder="sumit.nair26@gmail.com" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    email:e.target.value,        
                                })
                            }} />
                            <LabelledInput label="Password" type="password" placeholder="********" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    password:e.target.value,        
                                })
                            }} />
                        </div>
                        <button disabled={buttonDisabled} onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type==="signup"? "Sign up" : "Sign in"} </button>
                </div>
            </div>
          </div>
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return <div>
         <div>
            <label  className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}

/*
                <div>
                    <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
                    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
                </div>

*/