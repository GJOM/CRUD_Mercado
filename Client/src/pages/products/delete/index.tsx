import myContext from "@/Context/myContext";
import { CatalogTypes, ProductInfos } from "@/Interface";
import { Header } from "@/pages/components/Header";
import ProductCard from "@/pages/components/ProductCard";
import axios from "axios";
import { useEffect, useContext } from "react";

export default function DeleteProduct() {

    const { catalog, setCatalog } = useContext(myContext);

    const handleDelete = async (id: number) => {
        try {

            const response = await axios.delete(`http://localhost:3003/product/${id}`);
            const newCatalog = catalog.filter((product: ProductInfos) => {
                return product.product_id !== id

            })

            setCatalog(newCatalog);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header />
            <main className=" w-screen px-16 pt-16 flex gap-16">
                {catalog && catalog.map(({ product, image, price, product_id }: CatalogTypes, index: number) => (
                    <div key={index}>
                        <ProductCard product={product} image={image} price={price} product_id={product_id} />
                        <button className="w-full h-8 rounded-lg bg-gray-200 hover:bg-gray-300"
                            onClick={() => handleDelete(product_id)}>Delete</button>
                    </div>
                ))}
            </main>
        </>
    )
}