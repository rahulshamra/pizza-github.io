"use client"
import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
const Cardinfo = () => {
  const params=useParams();
  const {id}=params

  return (
    <>
    <div className='mx-auto border-red-300 border w-[320px] h-[350px] rounded-lg mt-20 '>
<Image className='flex justify-center items-center mx-auto p-2 w-[340px]  h-[250px] rounded-xl' height={13} width={200} alt='' src={"https://www.dominos.co.in/files/items/MicrosoftTeams-image_(17).png"} />
 <div className='text-center font bold text-xl'>Name</div>
 <div className='text-center'>dec</div>
    </div>
    </>
    
  )
}

export default Cardinfo
