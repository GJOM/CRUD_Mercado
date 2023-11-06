import axios from "axios";
import Link from "next/link";
import React, { SetStateAction, useEffect } from "react";

type cartTypes = {
    cart: Array<Object>
    setCart: React.Dispatch<SetStateAction<Object[] | undefined>>
}

export default function CartList({ cart, setCart }: cartTypes) {


    const getCart = async () => {
        const response = await axios.get('http://localhost:3300/users/cart');
        const data = response.data;
        setCart(data);
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <>
            {cart?.map(() => (
                <div>
                    <div>
                        <span></span>
                        <Link href={"#"}></Link>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <span>qtd</span>
                        <span>preco unit</span>
                        <span>preco total</span>
                    </div>

                </div>
            ))}
        </>
    )


}