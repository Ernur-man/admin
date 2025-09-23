import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AdminPage from './Pages/AdminPage'
import { useState } from 'react'
import { type Post } from './types'

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "First Post",
      desc: "lorem ipsum dolor sit amet",
      img: "",
      author: "Da Vinci"
    }
  ]);

  return (
    <Routes>
      <Route path="/" element={<HomePage posts={posts} />} />
      <Route path="/admin" element={<AdminPage posts={posts} setPosts={setPosts} />} />
    </Routes>
  )
}

export default App
