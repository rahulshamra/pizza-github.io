// "use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <>
    <div className='flex justify-center  bg-gray-500 gap-4   bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm text-center h-[7vh] '>
      <Link alt="" href={"/"} className='flex'>
    <Image alt="logo" className='rounded-full mx-3'  src={"/logo.png"} width={70} height={80}/>
    <span className='text-[20px] mt-4 font-bold'>PIZAA WIZZA</span>
    </Link>
    <span className='text-[14px] mt-4 '>This is created by the Rahul sharma &copyright;</span>
    </div>
    </>
  )
}

export default Footer
