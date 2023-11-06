
export default function FootwearDefined({ register }: any) {

    const footwearSizes = [33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44.5, 45, 46, 47, 48]

    return (

        <div className='flex flex-col items-center gap-4 bg-gray-100 px-8 py-2 overflow-auto overflow-x-hidden'>
            {footwearSizes.map((value, index) => (
                <div key={index} className='flex gap-10 w-max h-16'>
                    <div className="flex w-48 items-center gap-6">
                        <input type="checkbox" id="size" value={value} {...register(`sizes[${index}].size`)} />
                        <label htmlFor="size">Tamanho: {value}</label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="stock">Estoque:</label>
                        <input type="number" className="w-[100px]" id="stock" {...register(`sizes[${index}].stock`)} />
                    </div>
                </div>
            ))}
        </div>

    )
}
