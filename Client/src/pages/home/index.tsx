import styles from '../../styles/home.module.css';
import { Filters } from '@/pages/components/Filters';
import { Header } from '@/pages/components/Header';
import { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
    
    return (
        <>
            <Header />
            <main className='w-screen px-28'>
                <Filters />
            </main>
        </>
    )
}