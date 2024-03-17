import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaBlog} from "react-icons/fa6";
const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    //toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(isMenuOpen);
    }
    useEffect(() =>
    {
        const handleScroll = () => 
        {
            if(window.scrollY > 100){
                setIsSticky(true);
            }
            else
            {
                setIsSticky(false);
            }
        }
        window.addEventListener("scroll",handleScroll);
        return () =>{
            window.addEventListener("scroll",handleScroll);
        }
    },[])
    //navitems here
    const navItems = [
        {link:"Home",path:"/"},
        {link:"About",path:"/about"},
        {link:"Shop",path:"/shop"},
        {link:"Sell Your Product",path:"/admin/dashboard"},
        {link:"Blog",path:"/blog"},
    ]

  return (
    <header>
        <nav>
            <div>
                {/*logo*/}
                <Link to ="/" className="text-2xl font-bold color-blue text-700 flex items-center gap-2"><FaBlog className='inline-block'/>Products</Link>
                {/*nav item for large devices */}
                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link,path}) => 
                        <Link key={path} to={path} className="block text-base 
                        text-black uppercase cursor-pointer hover:text-blue-700">{link}</Link>)
                    }
                </ul>
            </div>
        </nav>
    </header>
  )
}
export default Navbar;