// Navbar.js
"use client"
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '@/app/Redux/authcontex'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const carditem = useSelector((state) => state.counter.items);

  const [User, setUser] = useState("")
 useEffect(() => {

   if( isAuthenticated){
  setUser(localStorage.getItem("Username"))
   }
   
 }, [isAuthenticated])

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    setIsAuthenticated(false);
  };
  
  return (
    <div className='flex justify-between bg-gray-500 gap-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm text-center h-[8vh]'>
      <Link href={"/"} className='flex'>
        <Image alt="logo" className='rounded-full mx-3' src={"/logo.png"} width={70} height={76}/>
        <span className='text-[20px] mt-4 font-bold'>PIZAA WIZZA</span>
      </Link>
      <div className='flex gap-7 mx-6'>
        {isAuthenticated ? (
          <>
        
            <div className= 'text-white font-bold  mt-4  '> Welcome  {User}</div>
          <div className='flex gap-6 mt-2'>

            <Link href={"/cart"} className='flex'>
              <span className='text-sm mt-1 text-white'>Cart</span>
              <Image alt="cart" className='h-[30px]' src={"/cart.svg"} width={30} height={40} />
              <span className='text-white border-gray-200 rounded-full border w-[20px] h-[20px]'>{carditem.length}</span>
            </Link>
            <Link href={"/myorder"} className='text-white'  >
            <div className='text-sm mt-1 text-white' >My order</div>
            </Link>
            <Link href={"/login"} onClick={handleLogout} className='flex'>
            <Image alt="logout" className='h-[30px]' src={"/logout.svg"} width={30} height={40} />
              <span className='text-sm mt-1 text-white'>Logout</span>
            </Link>
          
          </div>
          </>
        ) : (
          <>
            <Link href={"/login"} className='flex'>
              <span className='text-sm mt-3 text-white'>Login</span>
              <Image alt="login" className='h-[30px] mt-2' src={"/loginnew.svg"} width={30} height={40} />
            </Link>
            <Link href={"/signup"} className='flex'>
              <span className='text-sm mt-3 text-white'>Signup</span>
              <Image alt="singnup" className='h-[30px] mt-2' src={"/signup.svg"} width={30} height={20} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
