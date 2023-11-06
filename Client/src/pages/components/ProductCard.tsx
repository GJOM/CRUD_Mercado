import { CatalogTypes } from "@/Interface"
import Image from "next/image"

export default function ProductCard({ product_name, product_image, product_price, }: CatalogTypes) {


    return (
        <div className=' w-[280px] h-96 flex flex-col gap-4'>
            <div className='bg-gray-50 w-full h-[280px] flex justify-center items-center rounded-xl'  >
                <Image src={product_image} width={200} height={200} alt={product_name} />
            </div>
            <div className='flex flex-col justify-end items-center h-[70px] w-full gap-2 tracking-widest'>
                <span className='text-gray-400 font-semibold text-lg flex justify-center items-start h-8 max-h-14 w-full'>{product_name}</span>
                <span className='text-xl font-bold text-gray-600 w-full text-center'>R$ {product_price}</span>
            </div>
        </div>
    )
}