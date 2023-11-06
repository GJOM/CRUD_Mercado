import { useState, ChangeEvent, useEffect, } from 'react';
import { Header } from '@/pages/components/Header';
import axios from 'axios';
import ProductCard from '@/pages/components/ProductCard';
import { DefineProduct } from '@/pages/components/DefineProduct';
import { useForm } from 'react-hook-form';


export default function AddProduct() {

  const [isFilled, setIsFilled] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>()
  const { handleSubmit, register, setValue, control, getValues, watch } = useForm({
    shouldUnregister: true
  });

  const product = watch('product');
  const price = watch('price');
  const brand = watch('brand');
  const category = watch('category')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const registerProduct = async (data: any) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach(fieldName => {
        if (fieldName === 'sizes') formData.append(fieldName, JSON.stringify(data[fieldName]))
        else formData.append(fieldName, data[fieldName]);
      });

      console.log(data)

      const response = await axios.post('http://localhost:3300/products/register', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data);


    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    setValue('image', imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (price && product && brand && imageFile) return setIsFilled(true);
    setIsFilled(false);
    console.log(product)
  }, [product, price, brand, imageFile])

  return (
    <>
      <Header />
      <section className='flex w-screen justify-around gap-10 py-8'>
        <form className={`flex flex-col w-2/3 items-center gap-12`} onSubmit={handleSubmit(registerProduct)}>
          <div className={`flex w-full h-[420px] justify-around px-28`}>
            <DefineProduct register={register} setValue={setValue} control={control} category={category} handleImageUpload={handleImageUpload} />

          </div>

          <button className='w-28 h-14 rounded-lg bg-gray-200 border-gray-600 border-solid border-2 hover:bg-gray-300 active:border-none active:bg-[#bec2c7] 
        disabled:border-none disabled:bg-[#96999c] disabled:active:border-none disabled:active:bg-[#96999c]'
            disabled={!isFilled} type='submit'>Send</button>
        </form>
        <div className='flex w-1/3 justify-center mt-16 h-max'>

          {image && (
            <ProductCard product_name={product} product_image={image} product_price={price} product_id={0} />
          )}
        </div>
      </section>
    </>
  )
}