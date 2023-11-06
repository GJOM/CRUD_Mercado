export function Filters() {

    const filtersItems: string[] = ["Clothing", "Acessories", "Footwear"];
    const filtersbrand: string[] = ["Nike", "Hurley", "Happy Socks", "Komono", "Marc Jacobs", "Jordan"];

    return (
        <section className="w-60 flex flex-col gap-6">
            <div className="flex flex-col">
                <span className="font-bold text-gray-400">Sort by:</span>
                <select id="" className="w-52 h-10">
                    <option value="" defaultChecked>Popular</option>
                    <option value="">...</option>
                </select>
            </div>
            <span className="font-bold text-gray-400">Filter By:</span>
            <div className="flex flex-col gap-4">
                <span>Category</span>
                {filtersItems.map((item, index) => (
                    <span key={index} className="flex gap-2">
                        <input type="checkbox" id={item} className="w-4 h-4 opacity-20 checked:opacity-100" />
                        <label htmlFor={item}>{item}</label>
                    </span>
                ))}
            </div>
            <span className="font-bold text-gray-400">Brand</span>
            <div className="flex flex-col w-full gap-4">
                {filtersbrand.map((item, index) => (
                    <span key={index} className="flex gap-2">
                        <input type="checkbox" id={item} className="w-4 h-4 opacity-20 checked:opacity-100" />
                        <label htmlFor={item} className="w-max">{item}</label>
                    </span>
                ))}
            </div>
        </section>
    )
}