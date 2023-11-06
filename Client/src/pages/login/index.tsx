import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from 'nookies';
import Router from "next/router";
import myContext from "@/Context/myContext";

export default function Login() {

  const { register, handleSubmit } = useForm();
  const [credentialIsWrong, setCredentialIsWrong] = useState(false);
  const { setIsAdmin, userData } = useContext(myContext)

  const userLogin = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3300/users/', data);
      const token = response.data.token;
      const user = response.data.user;
      if (user) {
        setIsAdmin(!!user.isAdmin);
        console.log(user);
      }

      setCookie(undefined, 'e_commerce-token', token, {
        maxAge: 60 * 60, // 60 min

      })

      Router.push('/home')

    } catch (err) {
      console.log(err)
      setCredentialIsWrong(true);
    }
  }

  return (
    <div className="forms-background">
      <form onSubmit={handleSubmit(userLogin)}>
        <div className="flex items-center gap-4">
          <span className="bg-yellow-400 w-12 h-12 rounded-full border-gray-700 border-[6px] grid place-items-center text-3xl text-gray-700 font-black"> ➜</span>
          <div>
            <span>Already have an account?</span>
            <h1 className="text-4xl text-yellow-400">Log In Here</h1>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <input type="text" className="username" placeholder="Username" {...register('login')} />
          <input type="text" className="password" placeholder="Password" {...register('password')} />
        </div>
        {credentialIsWrong && <span className="absolute text-red-600 bottom-[201px] left-16">Login or Password wrong!</span>}
        <div className="flex justify-between items-center">
          <div className="w-40 h-max flex gap-2 items-center">
            <input type="checkbox" id="keepLogged" />
            <label htmlFor="keepLogged">Keep me logged in</label>
          </div>
          <button type='submit' className="loginBtn"> Log In</button>
        </div>
        <Link href={'/register'} className="text-end w-100%">{"Don't have an account?"}</Link>
      </form>
    </div>
  )
}
