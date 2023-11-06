import Router from "next/router";
import { useEffect } from "react";

export default function E_Commerce(){
    useEffect(() => {
        if(Router.pathname === '/') Router.push('/home');
        console.log(Router.pathname)
      },[])


}