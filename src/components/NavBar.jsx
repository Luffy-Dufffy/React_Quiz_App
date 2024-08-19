import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = ({ className }) => {
    return (
        <div className={`${className} w-full flex justify-around items-center bg-blue-600 text-white h-16`}>
            <div className='font-semibold text-2xl font-sans'>
                L O G O
            </div>
            <div className='flex justify-around space-x-8 text-lg'>
                <NavLink
                    to="/"
                    className='p-1 relative after:duration-300 after:rounded-lg after:transition-all after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:scale-x-0 after:transform hover:after:scale-x-100 after:origin-left'>
                    Home
                </NavLink>
                <NavLink to="#" className='p-1 relative after:rounded-lg after:duration-300 transition-all duration-1000 after:transition-all after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:scale-x-0 after:transform hover:after:scale-x-100 after:origin-left'>
                    About
                </NavLink>
                <NavLink to="#" className='p-1 relative after:duration-300 after:rounded-lg transition-all duration-1000 after:transition-all after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:scale-x-0 after:transform hover:after:scale-x-100 after:origin-left'>
                    Contact
                </NavLink>
            </div>
            <div className='flex justify-around items-center space-x-2'>
                <NavLink to="/login" className='transition-all duration-200 bg-blue-500 py-1 px-4 rounded-md shadow-md hover:bg-blue-700'>Login</NavLink>
                <NavLink to="/register" className='transition-all duration-200 border-white border-2 py-1 px-4 rounded-md shadow-md hover:bg-blue-700'>Register</NavLink>
            </div>
        </div>
    )
}

export default NavBar;
