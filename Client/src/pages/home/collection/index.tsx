import { Header } from "@/pages/components/Header"
import { Filters } from "@/pages/components/Filters";
import { Category } from "@/pages/components/Category";
import { Catalog } from "@/pages/components/Catalog";

function Clothing() {
    return (
        <>
            <Header />
            <Category />
            <main className='w-screen px-28 flex justify-between'>
                <Filters />
                <Catalog />
            </main>
        </>
    )
}

export default Clothing;