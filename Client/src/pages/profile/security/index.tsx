import { Header } from "@/pages/components/Header";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from './profile.module.css';
import axios from "axios";
import { useForm } from "react-hook-form";
import { parseCookies, setCookie } from "nookies";

export default function Profile() {

    type AddressObjectTypes = {
        bairro: string
        localidade: string
        logradouro: string
        uf: string
    }
    const [imageFile, setImageFile] = useState<File>();
    const [image, setImage] = useState<string>('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState<AddressObjectTypes>({
        bairro: '',
        localidade: '',
        logradouro: '',
        uf: ''
    });
    const { register, setValue, handleSubmit } = useForm();
    const { 'e_commerce-token': token } = parseCookies();

    const userImageUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImageFile(file)

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    const getCep = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const response = await axios.get(`http://viacep.com.br/ws/${target.value}/json/`);
            if (response) {
                setAddress(response.data)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const updateUserData = async (data: any) => {

        const formData = new FormData();

        Object.keys(data).forEach((fieldName) => {
            formData.append(fieldName, data[fieldName]);
        });

        try {
            const response = await axios.put(`http://localhost:3300/users/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                },
            })
            console.log(response.data);

            const newToken = response.data.token;

            setCookie(undefined, 'e_commerce-token', newToken, { maxAge: 60 * 60 }); //1h

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setValue('avatar', imageFile)
        setValue('nbh', address.bairro)
        setValue('city', address.localidade)
        setValue('address', address.logradouro)
        setValue('state', address.uf)
    }, [imageFile, address, setValue]);

    return (
        <>
            <Header />
            <main className='w-screen px-28 flex justify-center relative'>
                <nav className="flex flex-col gap-6 w-60 absolute left-[108px]">
                    <Link href={'#'}>Security</Link>
                    <Link href={'#'}>Your Desires</Link>
                    <Link href={'#'}>Wish List</Link>         
                </nav>
                <form className="flex flex-col gap-4 bg-gray-200 w-[760px] py-10 justify-center items-center"
                    onSubmit={handleSubmit(updateUserData)}>
                    <div className="rounded-full bg-gray-300 w-24 h-24 flex justify-center items-center">
                        {image && <Image src={image} width={86} height={86} alt=''
                            className="rounded-full w-24 h-24" />}
                        <label htmlFor="file-img" className="w-24 h-24 absolute cursor-pointer opacity-40 rounded-full transition duration-300 
                        hover:bg-gray-900 hover:transition hover:duration-300"></label>
                    </div>
                    <input type="file" accept="image/*" id="file-img"
                        className="hidden" {...register('avatar', { onChange: userImageUpdate })} />
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" {...register('name')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" {...register('email')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="cel">Cell:</label>
                        <input type="text" id="cel" {...register('cel')} maxLength={11} minLength={0 || 11} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="cep">CEP:</label>
                        <input type="text" id="cep" disabled={country.length === 0} maxLength={9} minLength={0 || 8}
                            {...register('cep', {
                                onChange: getCep
                            })
                            } />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="country">Country:</label>
                        <select {...register('country', {
                            onChange: ({ target }) => setCountry(target.value)
                        })}>
                            <option value="" defaultValue={""}>Select</option>
                            <option value="brazil">Brasil</option>
                        </select>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" className={styles['disabled-input']}
                            placeholder="place your CEP first." {...register('city')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" className={styles['disabled-input']}
                            placeholder="place your CEP first." {...register('state')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="nbh">Neighborhood:</label>
                        <input type="text" id="nbh" className={styles['disabled-input']}
                            placeholder="place your CEP first." {...register('nbh')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" className={styles['disabled-input']}
                            placeholder="place your CEP first." {...register('address')} />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="complement">Complement:</label>
                        <input type="text" id="complement" {...register('complement')}
                            placeholder="home, apt, etc..." />
                    </div>

                    <button type="submit" className="bg-gray-300 h-12 w-36 rounded-md">Save Data</button>
                </form>
            </main>
        </>
    )
}