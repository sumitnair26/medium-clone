import React from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useBlogs } from '../hooks/index';

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if (loading) {
        return <div className='flex justify-center'>
            <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className='flex justify-center'>
            <div>
                    {blogs.map(blog => <BlogCard 
                    authorName={blog.author.name || "Sumit"} 
                    title={blog.title}
                    id={blog.id}
                    content={blog.content} 
                    publishedDate="26/02/2024" 
                    />)}               
            </div>
        </div>
    </div>
}

