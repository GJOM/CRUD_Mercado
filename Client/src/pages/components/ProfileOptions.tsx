import Link from "next/link"

export default function ProfileOptions() {

    return (
        <>
            <Link className="w-52 text-center p-4" href={'http://localhost:3000/products/add'}>Add Product</Link>
            <Link className="w-52 text-center p-4" href={'http://localhost:3000/products/delete'}>Delete Product</Link>
            <Link className="w-52 text-center p-4" href={'http://localhost:3000/products/update'}>Update Product</Link>
        </>
    )
}