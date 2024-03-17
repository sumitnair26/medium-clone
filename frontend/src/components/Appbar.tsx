import { Avatar } from "./BlogCard";
import React from 'react';

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4" >
        <div className="flex flex-col justify-center">
            Medium Clone
        </div>
        <div>
            <Avatar name="Sumit" size="big" />
        </div>
    </div>
}