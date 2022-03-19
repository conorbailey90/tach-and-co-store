
import Header from './Header/Header'
import MobileMenu from './MobileMenu/MobileMenu'
import styles from './Layout.module.css'
import { useEffect, useRef, useState } from 'react'
import {useRouter} from 'next/router'

export default function Layout({ children }) {

  // Reset app container to top on page navigation
  const {pathname} = useRouter();
  const appContainer = useRef();
  useEffect(() => {
    appContainer.current.scrollTop = 0;
  }, [pathname])

  return (
    <>
        <Header/>
        <MobileMenu />
        <main ref={appContainer} className={styles.main} >{children}</main>
    </>
  )
}