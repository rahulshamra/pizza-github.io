"use client" // you can use aysnc funtion in  useeffect in the main funcion us cannnot use async function
import CourserComponent from "./home/page";
import Card from "./home/card";
import Image from "next/image";
import { useEffect,useState } from "react";
import Head from "next/head";
export default  function Home() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [fooddata, setFooddata] = useState([]);
  const [foodtype, setfoodtype] = useState("");

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    async function getdata(){ 
    try{
  const res =  await fetch(`${baseUrl}api`, { method: "GET" });
  const data=  await res.json()
    let categories = new Set();
    let tempFoodData = [];
    data.forEach((data) => {
      categories.add(data.category);
      tempFoodData.push(data);
    });
    setCategoryArray([...categories]);
    
    setFooddata(tempFoodData);
  }
  catch(error){
    console.log(error)
  }
}
 getdata();
  }, []);


  const handelfoodtype = (value) => {
    setfoodtype(value);
  };

  return (
    <>

      <CourserComponent />
      <div className="container mx-auto">
        <div className="flex gap-3 m-4">
          <div onClick={() => handelfoodtype("")} className="border rounded-2xl h-[30px] w-[50px] text-center p-1 font-bold cursor-pointer">All</div>
          <div onClick={() => handelfoodtype("Veg")} className="border hover:border-green-700 cursor-pointer rounded-2xl h-[30px] w-[70px] text-center px-2 font-bold flex">
            <div>Veg</div>
            <Image src={"/green1.png"} height={30} width={30} className=" mb-[-3px]" alt="veg" />
          </div>
          <div onClick={() => handelfoodtype("Non-Veg")} className="border rounded-2xl h-[30px] w-[125px] text-center px-2 font-bold flex gap-2 hover:border-red-700 cursor-pointer">
            <div className="mx-1 ">Non Veg</div>
            <Image src={"/red.png"} height={15} width={20} className=" h-[23px] w-[23px]  mb-[-5px] mt-1" alt="non_veg" />
          </div>
        </div>
        
        {categoryArray.map((category) => (
          <div key={category} className="mx-auto mt-2">
            <div className="text-white font-bold text-2xl  ">{category}</div>
            <hr />
            <div className="flex justify-center items-center   flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                {fooddata
                  .filter((item) => item.category === category && (foodtype === "" || item.foodType === foodtype))
                  .map((data) => (
                    <Card key={data._id} fooddata={data} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


