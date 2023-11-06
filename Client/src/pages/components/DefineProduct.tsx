import { useState, ChangeEvent, useEffect, createElement } from 'react';
import { Controller } from 'react-hook-form';
import styles from '../../pages/products/products.module.css';
import FootwearDefined from './FootwearDefined';


export function DefineProduct({ register, setValue, control, category, handleImageUpload }: any) {

    const [price, setPrice] = useState<string>();

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const inputValue = target.value;
        let formattedValue = inputValue.replace(/\D/g, '').slice(0, 5);
        setPrice(formattedValue);
    };

    useEffect(() => {
        setValue('price', price);
    }, [price])

    return (
        <>
            <div className={`flex flex-col gap-6 w-max ${styles.wrapper}`}>
                <div>
                    <label htmlFor="product">Product:</label>
                    <input type="text" id='product' {...register('product')} />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" defaultValue={""} {...register('category')}>
                        <option value="" disabled>Select</option>
                        <option value="clothing">Clothing</option>
                        <option value="acessories">Acessories</option>
                        <option value="footwear">Footwear</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="brand">Brand:</label>
                    <select id="brand" defaultValue={""} {...register('brand')}>
                        <option value="" disabled>Select</option>
                        <option value="nike">Nike</option>
                        <option value="hurley">Hurley</option>
                        <option value="happy_socs">Komono</option>
                        <option value="komono">Happy Socks</option>
                        <option value="marc_jacobs">Marc Jacobs</option>
                        <option value="jordan">Jordan</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <Controller control={control} name='price' render={({ field: { value } }) => (
                        <input type="text" id='price' {...register('price')} value={value} onChange={handleInputChange} />
                    )} />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
            </div>
            {category === "footwear" && <FootwearDefined register={register}/>
            }
        </>
    )
}