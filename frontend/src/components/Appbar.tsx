import { Avatar } from "./BlogCard";
import React from 'react';
import { useNavigate, Link } from "react-router-dom";

export const Appbar = () => {
    let navigate = useNavigate();
    return <div className="border-b flex justify-between px-10 py-4" >
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">       
                Medium Clone         
        </Link>
        <div className="flex">
            <Link to={`/Publish`} >
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4">New</button>
            </Link>
            <svg className="w-8 h-8 px-px text-gray-800 cursor-pointer" onClick={Logout} fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
            </svg>
            <Avatar name="Sumit" size="big" />
        </div>
    </div>

    function Logout() {
        localStorage.clear();
        return navigate('/');
    }
}

