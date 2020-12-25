import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../app/features/userSlice';
import '../app/styling/blogs.css'

const Blogs = () => {

    const searchInput = useSelector(selectUserInput);

    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=0938486c7ac7ecb41b5c2a2bfff9921f`;

    const dispatch = useDispatch();

    const[blogs, setBlogs] = useState();

    const[loading, setLoading]= useState(true);

    useEffect(() => {
        axios.get(blog_url)
        .then(response => {
            dispatch(setBlogData(response.data))
            setBlogs(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [searchInput]);
    
    let blogContent = null;

    if(loading){
         blogContent = (<h1 className='loading'>Loading...</h1>);
    }
    else{
         blogContent = (
            blogs.articles.map(blog => (
                <a className="blog" target="_blank" href={blog.url}>
                    <img src={blog.image} />
                    <div>
                        <h3 className="sourceName">
                            <span>{blog.source.name}</span>
                            <p>{blog.publishedAt}</p>
                        </h3>
                        <h1>
                            {blog.title}
                        </h1>
                        <p>
                            {blog.description}
                        </p>
                    </div>
                </a>    
            ))
        );
    }

    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {blogContent}
            {blogs?.totalArticles == 0 && (
                <h1 className="no__blogs">
                    No blogs available 😧. Explore something else.
                </h1>
            )}
        </div>
    )
}

export default Blogs
