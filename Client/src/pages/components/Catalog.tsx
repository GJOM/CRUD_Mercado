import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import ProductCard from './ProductCard';
import myContext from '@/Context/myContext';
import { CatalogTypes, ProductInfos } from '@/Interface';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Catalog() {

    const { setCatalog, catalog } = useContext(myContext)
    const router = useRouter();

    const getCatalog = async () => {
        try {
            const response = await axios.get('http://localhost:3300/products');
            console.log(response.data);
            const data = response.data;

            setCatalog(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCatalog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <section className='grid grid-cols-4 gap-20 items-center justify-center'>
            {catalog && catalog.map(({ product_name, product_id, product_image, product_price }: CatalogTypes, index: number) => (
                <Link href={{
                    pathname: `${router.pathname}/${product_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "-").toLowerCase()}`,
                    query: {
                        id: product_id
                    },
                }} key={`item#${product_id}`}>
                    <ProductCard key={index} product_image={product_image} product_name={product_name} product_price={product_price} product_id={product_id} />
                </Link>
            ))}
        </section>
    )
}