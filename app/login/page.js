"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../Redux/authcontex';
import { useContext } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
const Page = () => {
    const [form, setForm] = useState({Username:"" , Password:""});
    const { setIsAuthenticated } = useContext(AuthContext);

    const router=useRouter()
    const handleForm  = async(e)=> {
        e.preventDefault();
            const jsonformdata = JSON.stringify(form);
            const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
    
           let res= await fetch(`${baseUrl}apitwo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonformdata
            }); 
            let token=await res.json();
            if(token.success){
        localStorage.setItem("token",Object.entries(token)[1])
             localStorage.setItem("Username",form.Username)
             setIsAuthenticated(true)
             toast.success('login successfully')
             router.push("/")
            }
            if(!token.success){
                alert("User does not exist")
            }
        setForm({Username:"" , Password:""})
    };


    const handelchange=(e)=>{
        setForm({...form , [e.target.name]:e.target.value})
    }
    return (
        <div className="relative h-[85vh] w-full">

            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-2 bg-black bg-opacity-50">
                <div className='border border-gray-300 h-[40vh] hover:shadow-[5px_5px_15px_0px_rgba(255,0,0,0.5),-5px_-5px_15px_0px_rgba(0,255,0,0.5),5px_-5px_15px_0px_rgba(0,0,255,0.5)] transition-shadow duration-300  custom-lg:w-[35vw] rounded-md bg-gray-900'>
                    <div className='flex justify-center'>
                    <Image src={"/logo.png"} height={50} width={50} className='rounded-full' alt="" />
                        <span className='text-[20px] mt-2 font-bold'>PIZAA WIZZA</span>
                    </div>
                    <form onSubmit={handleForm} className='flex flex-col gap-5 p-3 relative'>
                        <input type="text" onChange={handelchange} className=' h-7 text-center text-black rounded-md bg-gray-200' name='Username' value={form.Username} placeholder='Enter Username' />
                        <input type="password" onChange={handelchange} className='mt-2 h-7 text-center text-black rounded-md bg-gray-200' name='Password' value={form.Password} placeholder='Enter Password' />
                        <div className='flex justify-between'>
                            <button type='submit' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[100px] h-10 text-center">Log in</button>
                            <Link alt="" href={"/signup"} className="h-10 mx-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[120px] text-center">New User?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
