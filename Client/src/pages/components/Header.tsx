import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ProfileOptions from './ProfileOptions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import myContext from "@/Context/myContext";
import { parseCookies } from "nookies";

export function Header() {

    const [isVisible, setIsVisible] = useState(false);
    const { isAdmin } = useContext(myContext);
    let timeout: NodeJS.Timeout;

    const handleButtonMouseLeave = () => {
        timeout = setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    const handleMenuMouseEnter = () => {
        clearTimeout(timeout);
    };

    const handleMenuMouseLeave = () => {
        setIsVisible(false);
    };

    const router = useRouter();
    const { 'e_commerce-token': token } = parseCookies();

    return (
        <header className="flex w-screen px-8 h-28 p-2">
            <nav className="flex w-full justify-between items-center h-14">
                <div className="bg-gray-300 w-8 h-8 rounded-full">
                    {/* <img src={userData.users_image} alt="perfil"></img> */}
                </div>
                <div className="flex gap-6 text-gray-400 font-medium tracking-wider">
                    <Link id='collection-btn' aria-label="Veja os produtos da Loja."
                     href={'/home/collection'}>Collection</Link>
                    <Link id='home-btn' aria-label="Página principal" href='/home' >Home</Link>
                    <button id='contact-btn' onClick={() => router.push('home/contact')}>Contact</button>

                </div>
                <div className="flex gap-4 justify-center items-center relative">
                    {isAdmin && <div className="profile-menu-button border-gray-300 border-2 border-solid w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={handleButtonMouseLeave}
                    >
                        <AdminPanelSettingsIcon className="opacity-30 text-2xl" />
                    </div>}
                    <Link id="security-btn" aria-label="Dados do usuário."
                        href={!token ? '/login' : '/profile/security'} className="border-gray-300 border-2 border-solid w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                        <PersonIcon className="opacity-30 text-2xl" />
                    </Link>
                    <Link id='cart-btn' aria-label="Carrinho do usuário." 
                    href={!token ? '/login' : '/cart'} className="border-gray-300 border-2 border-solid w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                        <ShoppingCartOutlinedIcon className="opacity-30 text-2xl" />
                    </Link>
                    {isVisible &&
                        <div className="profile-menu absolute bg-gray-100 top-10 right-0 h-max flex flex-col justify-center align-center z-10"
                            onMouseEnter={handleMenuMouseEnter}
                            onMouseLeave={handleMenuMouseLeave}>
                            <ProfileOptions />
                        </div>
                    }

                </div>
            </nav>
        </header>
    )
}