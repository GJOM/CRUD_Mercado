import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(false);

    const userRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                const response = await axios.post('http://localhost:3300/users/register', { login: login, password: password });
                setMessage(false);

                if (response.data.code) {
                    setMessage(true);
                    throw new Error('Email already registered');
                }

            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="forms-background">
            <form onSubmit={userRegister}>
                <div className="flex items-center gap-4">
                    <span className="bg-yellow-400 w-12 h-12 rounded-full border-gray-700 border-[6px] grid place-items-center text-3xl text-gray-700 font-black"> ➜</span>
                    <div>
                        <span>{"Don't have an account?"}</span>
                        <h1 className="text-4xl text-yellow-400">Register Now</h1>
                    </div>
                </div>
                <div className="gap-6 flex flex-col">
                    <input type="text" className="username" placeholder="Username" value={login}
                        style={message ? { border: '1px solid red' } : { border: 'none' }}
                        onChange={({ target }) => setLogin(target.value)} />
                    {message && <span className="absolute bottom-[200px] left-16 text-red-600">Email already registered.</span>}
                    <input type="text" className="password" placeholder="Password" value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                    {password !== confirmPassword && <span className="absolute bottom-[131px] left-16 text-red-600">Passwords must be same.</span>}
                    <input type="text" className="password" placeholder="Confirm Password" value={confirmPassword}
                        style={password !== confirmPassword ? { border: '1px solid red', outline: 'red' } : { border: 'none' }}
                        onChange={({ target }) => setConfirmPassword(target.value)} />
                </div>
                <div className="flex justify-between">
                    <Link href="/login">I have an account</Link>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )

}