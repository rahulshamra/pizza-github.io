"use client"
import { useContext } from 'react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';// this is only use in app router nviagation 
import { AuthContext } from '../Redux/authcontex';
import toast from 'react-hot-toast';
import Image from 'next/image';
const Page = () => {
    const [form, setForm] = useState({
        Username: "",
        Password: "",
        Email: "",
        Address: ""
    });
    const { setIsAuthenticated } = useContext(AuthContext);
    const router=useRouter()
    const handleForm = async (e) => {
        e.preventDefault();
        const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
        const jsonformdata = JSON.stringify(form);
       let res= await fetch(`${baseUrl}apione`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonformdata
        });
        let check=await res.json()
         if(!check.success){
            alert("Username already exist")
         }
        if(check.success){
    res= localStorage.setItem("token",res.authtoken)
         localStorage.setItem("Username",form.Username)
         toast.success('signup successfully')
         setIsAuthenticated(true)
         router.push("/")
        }
         setForm({
            Username: "",
            Password: "",
            Email: "",
            Address: ""
        });

    };
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="relative h-[85vh] w-full">
           
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-2 bg-black bg-opacity-50">
                <div className='border hover:shadow-[5px_5px_15px_0px_rgba(255,0,0,0.5),-5px_-5px_15px_0px_rgba(0,255,0,0.5),5px_-5px_15px_0px_rgba(0,0,255,0.5)] transition-shadow duration-300 border-gray-300 h-[59vh] custom-lg:h-[35vh] custom-lg:w-[35vw] rounded-md bg-gray-900'>
                    <div className='flex justify-center'>
                        <Image src={"/logo.png"} height={50} width={50} className='rounded-full' alt="" />
                        <span className='text-[20px] mt-2 font-bold'>PIZAA WIZZA</span>
                    </div>
                    <form onSubmit={handleForm} className='flex flex-col gap-5 p-3 relative'>
                        <input
                            type="text"
                            className='h-6 text-center text-black rounded-md '
                            name='Username'
                            placeholder='Enter Username'
                            value={form.Username}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            className='mt-2 h-6 text-center text-black rounded-md '
                            name='Email'
                            placeholder='Enter Email'
                            value={form.Email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className='mt-2 h-6 text-center text-black rounded-md '
                            name='Password'
                            placeholder='Enter Password'
                            value={form.Password}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className='mt-2 h-6 text-center text-black rounded-md '
                            name='Address'
                            placeholder='Enter Address'
                            value={form.Address}
                            onChange={handleChange}
                        />
                        <div className='flex justify-between mt-3'>
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[100px] h-10 text-center"
                            >
                                Submit
                            </button>
                            <Link
                                href={"/login"}
                                className="h-10 mx-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[140px] text-center"
                            >
                                Already a User
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
