import { Header } from "@/pages/components/Header";
import { useCallback, useContext, useEffect, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CatalogTypes } from "@/Interface";
import { useRouter } from "next/router";
import axios from "axios";
import styles from './product.module.css'
import Head from "next/head";
import myContext from "@/Context/myContext";


export default function Product() {

    const [amount, setAmount] = useState(1);
    const { storeName } = useContext(myContext);
    const [data, setData] = useState({} as CatalogTypes);
    const [sizes, setSizes] = useState<{ footwear_size: number, footwear_stock: number }[]>([]);
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if(!router.isReady) return
        const getProduct = async () => {
            const response = await axios.get(`http://localhost:3300/products/${id}`);
            setData(response.data[0]);
            setSizes(response.data.sizes)
        }
        getProduct();
    }, [router.isReady])


    return (
        <>
            <Head>
                <title>{data.product_name} | {storeName}</title>
            </Head>
            <Header />
            <section className="w-screen ">
                <div className="h-[600px]  w-full flex justify-around items-center">
                    <div className="w-[40%] h-[400px] border-[1px] border-solid border-gray-300 grid place-items-center rounded-lg">
                        <img src={data.product_image}></img>
                    </div>
                    <div className="w-[40%] gap-4 flex flex-col">
                        <h2 className="text-3xl">{data.product_name}</h2>
                        <div className="flex flex-col gap-2">
                            <span>De <s>R$ {data.product_price}</s></span>
                            <span className="text-2xl">R$ {(data.product_price as number * (91 / 100)).toFixed(2)}<span className="text-base"> no pix</span></span>
                            <span>preço 1x <span>no cartão</span></span>
                            <span><strong>R$ {data.product_price}</strong> à vista ou preço em até <strong>10x R$ {((data.product_price as number) / 10).toFixed(2)} </strong>no cartão</span>
                            <span>juros de 1.79% a.m e 23,73% a.a | total R$ {data.product_price} a prazo</span>
                        </div>
                        <button className="underline w-max">Mais formas de pagamento</button>
                        {data.product_type &&
                            <div className="grid grid-rows-2 grid-cols-7 gap-y-2 max-w-[740px]">
                                {sizes && sizes.map(({ footwear_size, footwear_stock }, index: number) => (
                                    <div className={footwear_stock ? styles['footwear-size-button'] : styles['footwear-size-button-disabled']} key={`button${index}`}>
                                        <label htmlFor={`radio${index}`} className={styles['footwear-size-label']}>{footwear_size}</label>
                                        <input id={`radio${index}`} name="footwear-size" type="radio" className={styles['footwear-size-radio']} value={footwear_size} />
                                    </div>
                                ))}
                            </div>}
                        <div className="w-full flex gap-6 items-center">
                            <div className="w-32 h-10 border-gray-500 border-solid border-[1px] rounded-3xl justify-between items-center flex px-2">
                                <button onClick={() => setAmount(amount + 1)}><RemoveIcon /></button>
                                <span>{amount}</span>
                                <button onClick={() => setAmount(amount - 1)}><AddIcon /></button>
                            </div>
                            <button className=" border-gray-400 border-solid border-2 w-64 h-12 rounded-full transition-all duration-300
                             hover:transition-all hover:duration-300 hover:bg-gray-400"
                            >Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}