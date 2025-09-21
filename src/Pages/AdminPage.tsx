import './adminPage.less'
import { useState } from "react";
import { type Post } from '../types';
import Header from '../components/Header';
import HomePage from './HomePage';


interface Props {
    post: Post,


}

export default function AdminPage({ post }: Props) {

    

    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>()
    const [author, setAuthor] = useState<string>()
    const [file, setFile] = useState(null)


    function edit_post() {
        console.log('edit post')
        console.log(edit_post)
    }

    function delete_post() {
        console.log('delete post')
    }


    return (
        <main className="admin-page">
            <Header />
            <div className="container">
                <h1>Admin Page</h1>

                <p>Welcome to the admin page. Here you can manage the application settings and user accounts.</p>



                <button id='edit_post' onClick={edit_post}>Edit Post</button>
                <button id='delete_post' onClick={delete_post}>Delete Post</button>


                <form method="post" >
                    <input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="text" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <input type="file" onChange={(e) => console.log(e.target.value)} />
                    <input type="text" placeholder="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <button>Change</button>
                </form>



            </div>
        </main>
    )
}