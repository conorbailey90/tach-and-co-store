import Link from 'next/link';
import Footer from '../components/Footer/Footer';
import HomeTileOne from '../components/HomeTileOne';
// Update the path for your API client file.
import Prismic from "@prismicio/client";
import { Client } from '../utils/prismicHelpers';
import { useMobileMenuState } from '../context/mobileMenu';
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'


export default function Home({homePageTiles}) {
 
  const [tiles, setTiles] = useState([])

  const landingText = useRef();
  const innerImage = useRef();

    useEffect(() => {
     setTiles(homePageTiles.reverse());

      setTimeout(() => {
        if(landingText.current !== null){
          landingText.current.style.opacity = '1';
        }
      }, 500);
    }, [])
 
    const {setMobileMenu} = useMobileMenuState();
    useEffect(() => {
      setMobileMenu(false);
    }, []);
  

  return (
    <>
   <div className={styles.wrapper}>
     <section className={styles.landing}>

       <div className={styles.imgOuter}>
        
         <div className={styles.imgInner} ref={innerImage}></div>
         <div className={styles.landingText} ref={landingText}>
           <h1 className={styles.logo}>Tach & Co.</h1>
           <h3>Handmade With Love</h3>
           <Link href="/shop">
              <div className={styles.shopCTA}>
                <h4>Shop Now</h4>
              </div>
           </Link>
         </div>
       </div>

     </section>
     <section className={styles.section}>
       <div className={styles.sectionContainer}>
        {tiles.map(tile => (
          <HomeTileOne key={tile.uid} heading={tile.data.title[0].text} text={tile.data.text} image={tile.data.image.url} />
        ))}
       </div>
     </section>
   </div>
   <Footer />
   </>
  )
}


export async function getStaticProps(context) {
 
  // Get all homepage tiles
  const homePageTiles = await (await Client().query(Prismic.Predicates.at('document.type', 'homepage_tile'))).results;

  return {
    props: { homePageTiles }, // will be passed to the page component as props
    revalidate: 10, // In seconds
  }
}