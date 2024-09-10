"use client"; // Ensure this component is treated as a Client Component
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, Delete, Checkout } from '../Redux/counter/CounterSlice';
import toast from 'react-hot-toast';

const Page = () => {
  const cartItems = useSelector((state) => state.counter.items); // Assuming items is an array
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, current) => {
    return total + current.price * current.qty;
  }, 0);

  const handleCheckout = async () => {
    let Username = localStorage.getItem("Username");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    let res = await fetch(`${baseUrl}apithree`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Username: Username, order_data: cartItems, order_date: new Date().toDateString() })
    });
    let confirm = await res.json();
    if (confirm.success) {
      toast.success('Order confirmed');
      dispatch(Checkout());
    }
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center mt-32'>
          <h3 className="text-bold text-2xl text-center">Cart is Empty</h3>
          <span><Image src={"/sad1.png"} height={70} width={70}  alt="Empty cart" /></span>
          <Link href={"/"} className='hover:shadow-[5px_5px_15px_0px_rgba(255,0,0,0.5),-5px_-5px_15px_0px_rgba(0,255,0,0.5),5px_-5px_15px_0px_rgba(0,0,255,0.5)] transition-shadow duration-300 text-xl border rounded-lg hover:text-2xl hover:text-green-300 p-1 mt-2'>
            Go back to Home
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[80vw] mx-auto border mt-6 rounded-xl">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left font-bold">Name</th>
                <th className="py-2 px-4 border-b text-left font-bold">Price</th>
                <th className="py-2 px-4 border-b text-left font-bold">Quantity</th>
                <th className="py-2 px-4 border-b text-left font-bold">Size</th>
                <th className="py-2 px-4 border-b text-left font-bold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id + item.size} className="p-4 border-b border-gray-400 mt-2">
                  <td className="py-2 px-4 border-gray-100 text-white">{item.name}</td>
                  <td className="py-2 px-4 border-gray-100 text-white">₹{item.price}</td>
                  <td className='flex'>
                    <Image  src="plus.svg" width={20} height={20} className='h-5 w-5 mt-3 hover:bg-green-200 border border-gray-400 rounded-full' onClick={() => dispatch(increment({ _id: item._id, size: item.size }))} alt="Increase quantity" />
                    <div className="py-2 px-4 border-gray-100 text-white">{item.qty}</div>
                    <Image  src="minus.svg"  width={20} height={20} className='h-5 w-5 mt-3 hover:bg-red-400 border border-gray-300 rounded-full' onClick={() => dispatch(decrement({ _id: item._id, size: item.size }))} alt="Decrease quantity" />
                  </td>
                  <td className="py-2 px-4 border-gray-100 text-white">{item.size}</td>
                  <td>
                    <Image  width={30} height={30} onClick={() => dispatch(Delete({ _id: item._id, size: item.size }))} src="delete.svg" className='mx-3 border hover:bg-red-500 rounded-full p-1' alt="Delete item" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex flex-col items-center mt-4'>
          <div>Total Price - ₹{totalPrice}/-</div>
            <button onClick={handleCheckout} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[100px] h-10 m-3 text-center">
              Checkout
            </button>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
