import React from 'react'
import { useState } from 'react';
import Image from 'next/image'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, updateCart } from '../Redux/counter/CounterSlice';
import Link from 'next/link';

import { toast } from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
const Card = (props) => {
  let data=props.fooddata;
    // const typo=[" small","regular","large"]
    const typo= Object.keys(data.price)
    const [qty, setqty] = useState(1) 
    const [size, setsize] = useState(typo[0])
    const handelqty=(e)=>{
      setqty(e.target.value)
    }
   
    const handelsize=(e)=>{
      setsize(e.target.value)
    }
    let finalprize=qty* parseInt(data.price[size])
    const dispatch=useDispatch()
    
    const cartItems =  useSelector((state) => state.counter.items)
    const handelcart = async() => {
      const existingItem = cartItems.find((item) => item._id === data._id && item.size === size);
     
    
      if(!existingItem){
        const cartInfo = {
        _id: data._id,
        name: data.name,
        price: finalprize,
        Image:data.image,
        size,
        qty,
      };
      dispatch(addToCart(cartInfo));
      

    }
    else{
      const Updateitem={
        ...existingItem,
        qty:parseInt(existingItem.qty)+ parseInt(qty),
        price:finalprize+qty* parseInt(data.price[size])
      }
      dispatch(updateCart(Updateitem))
    
    }
   
  }
  return (
    <>
 
    <div className='mx-auto hover:shadow-[5px_5px_15px_0px_rgba(255,0,0,0.5),-5px_-5px_15px_0px_rgba(0,255,0,0.5),5px_-5px_15px_0px_rgba(0,0,255,0.5)] transition-shadow duration-300 mb-3 mt-2'>
  <div className="nft">
    <div className='main'>
    <div> 

      <Image  className='tokenImage' height={200} width={250} src= {data.image} alt="NFT" />
      <p className='description'>{data.name}</p>
      <div className='tokenInfo'>
        <div className=" price h-20 overflow-y-auto  scrollable-container1 ">
          <p>{data.description}</p>
        </div>
      </div>
      <hr />
      <div className='creator flex justify-between '>
        <div className='wrapper '>
          <select  className='bg-gray-900 p-1 rounded-md 'onChange={handelqty}>
          {Array.from(Array(6),(e,i)=>{
return(

  <option key={i+1} value={i+1} >
    {i+1}
  </option>
);
})}
</select>
        </div>
<select className='bg-gray-900 p-1 text-center  ' onChange={handelsize}>
  {
    typo.map((ty,index)=>{
      return(
        <option value={ty} key={index} >
        {ty}
        </option>
      )
    })
  }
</select>
      </div>
      <div className='flex justify-between mt-3'>
      <button onClick ={handelcart} type="button" className="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add  to cart</button>

      <div className='mt-3  text-lg font-bold' >₹{finalprize}-/</div>
      </div>
      </div>
    </div>
  </div>
      
    </div>
    </>
  )
}

export default Card
