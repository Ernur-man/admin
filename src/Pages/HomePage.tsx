import Header from "../components/Header";
import './home.less'
import axios from "axios";
import { useState } from "react";

import { type Post } from "../types";

interface Props {
    post: Post
}




export default function HomePage({post}: Props) {

    const [posts, setPosts] = useState<Post[]>([]);
    axios.get('/posts.json').then(res => {
        setPosts(res.data);
    })
    return(
        <main>
            <Header/>   
            <div className="container">
                <h1>Welcome</h1>
                <article className="content">
                    {posts.map((post, index) => (
                        <div key={index}>
                            <h2>{post.title}</h2>
                            <p>{post.desc}</p>
                            <span>{post.author}</span>
                            {/* <img src={post.img} alt={post.title} /> */}
                        </div>
                    ))}
                </article>
            </div>
        </main>
    )
}