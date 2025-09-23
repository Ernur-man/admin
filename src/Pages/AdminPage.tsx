import './adminPage.less'
import { useState } from "react";
import Header from '../components/Header';
import { type Post } from '../types';

interface Props {
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function AdminPage({ posts, setPosts }: Props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    function handleEdit(index: number) {
        const post = posts[index];
        setTitle(post.title);
        setText(post.desc);
        setAuthor(post.author);
        setEditIndex(index);
    }

    function handleDelete(index: number) {
        setPosts(posts.filter((_, i) => i !== index));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newPost: Post = {
            title,
            desc: text,
            img: "",
            author
        };

        if (editIndex !== null) {
            const updatedPosts = [...posts];
            updatedPosts[editIndex] = newPost;
            setPosts(updatedPosts);
            setEditIndex(null);
        } else {
            setPosts([...posts, newPost]);
        }

        setTitle('');
        setText('');
        setAuthor('');
    }

    return (
        <main className="admin-page">
            <Header />
            <div className="container">
                <h1>Admin Page</h1>

                <h2>Posts</h2>
                {posts.map((post, i) => (
                    <div key={i}>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                        <span>{post.author}</span>
                        <br />
                        <button onClick={() => handleEdit(i)}>Edit</button>
                        <button onClick={() => handleDelete(i)}>Delete</button>
                    </div>
                ))}

                <h2>{editIndex !== null ? "Edit Post" : "Add Post"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <button type="submit">
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </form>
            </div>
        </main>
    )
}
