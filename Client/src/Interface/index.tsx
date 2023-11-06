import { Dispatch, SetStateAction } from 'react'

export interface CatalogTypes {
    product_name: string;
    product_type?: string
    product_image: string;
    product_price: string | number;
    product_id: number;
}
export interface ProductInfos {
    product: string;
    category: string;
    brand: string;
    image: any;
    price: string;
    product_id?: number;
}

export interface SetDataProps {
    product: string;
    category: string;
    brand: string;
    image: any;
    price: string;
    setData: Dispatch<SetStateAction<Object>>;
}