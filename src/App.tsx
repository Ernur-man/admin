import './App.css'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AdminPage from './Pages/AdminPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/admin' element={<AdminPage/>}/>
        <Route/>
      </Routes>
    </>
  )
}

export default App
