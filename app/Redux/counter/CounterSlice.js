"use client"
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  value: 0,
items:[],
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,action) => {
      const findindex=state.items.findIndex((item)=>item._id==action.payload._id &&item.size==action.payload.size);
      if(findindex>=0){
        (state.items[findindex].qty) +=1;
        const unitPrice = state.items[findindex].price/ state.items[findindex].qty; // Assuming price is a number
    state.items[findindex].price = unitPrice * state.items[findindex].qty;
        }
    },
    decrement: (state,action) => {
      const findindex=state.items.findIndex((item)=>item._id==action.payload._id &&item.size==action.payload.size);
      if(findindex>=0){
        if(state.items[findindex].qty>1){
          (state.items[findindex].qty) -=1;
          const unitPrice = state.items[findindex].price/ state.items[findindex].qty; // Assuming price is a number
      state.items[findindex].price = unitPrice * state.items[findindex].qty;
        }
        }
    },
    addToCart: (state, action) => {
        state.items.push(action.payload);
        toast.success('item added'); 
      },
      updateCart:(state,action)=>{
        const findindex=state.items.findIndex((item)=>item._id==action.payload._id &&item.size==action.payload.size);
        if (findindex >= 0) {
          state.items[findindex].qty = action.payload.qty;    // Update the quantity
          state.items[findindex].price = action.payload.price; // Update the price
        
        }
      },
      Delete:(state,action)=>{
      
      state.items= state.items.filter((item)=> item._id!==action.payload._id || item.size!==action.payload.size)
      toast.success('Delete successfully')
       
      },
      Checkout:(state,action)=>{
      state.items= [];
      }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement,addToCart,updateCart,Delete,Checkout} = counterSlice.actions

export default counterSlice.reducer