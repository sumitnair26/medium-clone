import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { signupInput } from "@sumitnair26/medium-common";
export const Auth = (type: {type:"signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<signupInput>({
        name:"",
        username:"",
        password:""
    })
    return <div className="h-screen flex justify-center flex-col" >
            <div className="flex justify-center">
                <div>
                        <div className="px-10">
                            <div className="text-3xl fond-extrabold">
                                Create an account
                            </div>
                            <div className="text-slate-400">
                                Already have an account?
                                <Link className="pl-2 underline" to={"/signin"}> Login </Link> 
                            </div>
                        </div>
                        <div className="pt-5">
                            <LabelledInput label="Name" placeholder="Sumit Nair" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value,        
                                })
                            }} />
                            <LabelledInput label="Email" placeholder="sumit.nair26@gmail.com" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value,        
                                })
                            }} />
                            <LabelledInput label="Password" type="password" placeholder="********" onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value,        
                                })
                            }} />
                        </div>
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