import './App.css'
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      <nav>Site Logo</nav>
      <Outlet/>
    </>
  )
}

export default App;
