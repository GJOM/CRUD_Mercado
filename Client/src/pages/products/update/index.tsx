import myContext from "@/Context/myContext";
import { CatalogTypes, ProductInfos } from "@/Interface";
import { DefineProduct } from "@/pages/components/DefineProduct";
import { Header } from "@/pages/components/Header";
import ProductCard from "@/pages/components/ProductCard";
import axios from "axios";
import { useState, useContext, useEffect } from 'react';
import styles from '../products.module.css';

export default function UpdateProduct() {

    const { catalog, setCatalog } = useContext(myContext);
    const [isFilled, setIsFilled] = useState(false);


    const handleUpdate = async (id: number) => {
/*         const item = catalog.filter((prod: ProductInfos) => {
            if (prod.product_id == id) {
                return prod
            }
        }) */
        const response = await axios.put(`http://localhost:3003/product/${id}`, )
        console.log(response)
    }

    useEffect(()=>{
        
    },[])

    return (
        <>
            <Header />
            <section className={`flex gap-6 w-full justify-center ${styles.wrapper}`}>
                <DefineProduct />
            </section>
            <main className=" w-screen px-16 pt-16 flex gap-16">
                {catalog && catalog.map(({ product_name, product_image, product_price, product_id }: CatalogTypes, index: number) => (
                    <div key={index} onClick={() => isFilled && handleUpdate(product_id)} className={!isFilled ? 'opacity-25' : 'cursor-pointer'}>
                        <ProductCard product_name={product_name} product_image={product_image} product_price={product_price} product_id={product_id} />
                    </div>
                ))}
            </main>
        </>
    )


}