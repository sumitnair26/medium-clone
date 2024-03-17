import { Avatar } from "./BlogCard";
import React from 'react';
import { Link } from "react-router-dom";

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4" >
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">       
                Medium Clone         
        </Link>
        <div>
            <Avatar name="Sumit" size="big" />
        </div>
    </div>
}