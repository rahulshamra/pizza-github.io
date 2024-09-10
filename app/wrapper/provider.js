"use client"
import { Provider } from "react-redux"
import { Children } from "react"
import { store } from "../Redux/store"
export default function Providerdata({children}){
  
  return (
    <Provider store={store} >
     {children}
    </Provider>
  )
}