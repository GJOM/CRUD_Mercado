import Link from "next/link";
import { Header } from "../components/Header";
import CartList from "../components/CartList";
import { useState } from "react";

export default function Cart() {

    const [cart, setCart] = useState<Array<Object>>();

    return (
        <>
            <Header />
            <section className="flex justify-center">
                {
                    cart ? <CartList cart={cart} setCart={setCart} /> :
                        <div className="w-max h-max p-4 flex flex-col gap-4">
                            <h2 className="font-bold text-2xl">O seu carrinho está vazio.</h2>
                            <span className="text-sm text-center">Deseja olhar outros produtos similares?</span>
                            <Link href={"/home"}
                                className="self-center py-2 px-12 bg-gray-300 text-center transition
                                 hover:bg-gray-400 hover:transition duration-300 hover:duration-300"
                            >Continuar Comprando</Link>
                        </div>

                }
            </section>
        </>
    )
}