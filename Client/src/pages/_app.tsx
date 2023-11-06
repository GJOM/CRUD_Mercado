import myContext from '@/Context/myContext'
import { CatalogTypes } from '@/Interface';
import '@/styles/globals.css'
import axios from 'axios';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useState, useMemo, useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const [catalog, setCatalog] = useState<CatalogTypes[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [userData, setUserData] = useState<Object>();
  const [storeName, setStoreName] = useState<String>('Deep Project');

  const contextStates = useMemo(() => ({
    catalog, setCatalog,
    isAdmin, setIsAdmin,
    userData, setUserData,
    storeName, setStoreName,
  }), [catalog, isAdmin, userData, storeName])


  useEffect(() => {
    const checkToken = () => {
      const { 'e_commerce-token': token } = parseCookies();

      if ((router.pathname.includes('/profile') || router.pathname.includes('/products')) && !token) {
        router.push('/login');
        return;
      }
      token && (async () => {
        try {
          const response = await axios.post('http://localhost:3300/users/token', { token: token });
          const newToken = response.data.token;
          const user = response.data.user

          setUserData(user);
          setIsAdmin(user.isAdmin)

          setCookie(undefined, 'e_commerce-token', newToken, { maxAge: 60 * 60 }); //1h
        } catch (err) {
          console.log(err);
        }
      })();
      if (!token) setIsAdmin(false);
    }
    checkToken()
    console.log(router)
  }, [router])

  return (
    <myContext.Provider value={contextStates}>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='description' content='E-commerce Project' />
        <meta name='keywords' content='HTML, CSS, React, Next, NextJS, MaterialUI, e-commerce, store' />
        <meta name='author' content='Gabriel José' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{storeName}</title>
      </Head>
      <Component {...pageProps} />
    </myContext.Provider>
  )
}
