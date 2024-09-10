"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Page = () => {
    const [orderinfo, setOrderinfo] = useState([]);

    const fetchdata = async () => {
        let Username = localStorage.getItem("Username");
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        try {
            let res = await fetch(`${baseUrl}apifour`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Username: Username })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await res.json();
            const datamanu = data.order_data;
            setOrderinfo(datamanu);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <>
            {orderinfo.length === 0 ? (
                <div className='flex flex-col justify-center items-center mt-32'>
                    <h3 className="text-bold text-2xl text-center">No orders</h3>
                    <span><Image height={70} width={70} src={"/sad1.png"} className='h-[70px] w-[70px]' alt="No orders" /></span>
                    <Link href={"/"} className='hover:shadow-[5px_5px_15px_0px_rgba(255,0,0,0.5),-5px_-5px_15px_0px_rgba(0,255,0,0.5),5px_-5px_15px_0px_rgba(0,0,255,0.5)] transition-shadow duration-300 text-xl border rounded-lg hover:text-2xl hover:text-green-300 p-1 mt-2'>
                        Go back to Home
                    </Link>
                </div>
            ) : (
                <div className='mx-auto'>
                    {orderinfo.map((order, orderIndex) => (
                        <div key={orderIndex} className='order-section'>
                            {order.map((item, itemIndex) => (
                                item.order_date ? (
                                    <div key={itemIndex} className='text-white'>
                                        Order Date: {item.order_date}
                                    </div>
                                ) : (
                                    <div key={`${item._id}`} className='h-[250px] px-2 w-[390px] flex justify-center items-center border-gray-200 rounded-md border m-2'>
                                        <Image height={200} width={200}  className='w-[200px] p-1 rounded-md h-[200px] mx-1' src={item.img} alt={item.name} />
                                        <div className='flex flex-col gap-2'>
                                            <p>{item.name}</p>
                                            <p>Price: {item.price}/-</p>
                                            <p>Qty: {item.qty}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Page;
