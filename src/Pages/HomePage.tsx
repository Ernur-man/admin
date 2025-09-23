import Header from "../components/Header";
import './home.less'
import { type Post } from "../types";

interface Props {
    posts: Post[]
}

export default function HomePage({ posts }: Props) {
    return (
        <main>
            <Header />
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
