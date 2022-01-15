import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import HomeTileOne from '../components/HomeTileOne';
// Update the path for your API client file.
import Prismic from "@prismicio/client";
import { Client } from '../utils/prismicHelpers';

import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'


export default function Home({homePageTiles}) {
 
  const [tiles, setTiles] = useState([])

  const landingText = useRef();
  const innerImage = useRef();

  
  let target = useRef(0);



  
    useEffect(() => {
     setTiles(homePageTiles.reverse());

      setTimeout(() => {
        if(landingText.current !== null){
          landingText.current.style.opacity = '1';
        }
      }, 500);

      const scrollListener =  window.addEventListener('scroll', (e) => {
        if(landingText.current !== null){
          target.current = window.scrollY;
          landingText.current.style.transform = `translate3d(0, ${-target.current * 0.4}px, 0)`;
          innerImage.current.style.transform = `scale(${target.current < 1 ? 1 : 1 + target.current * 0.0005})`
        }
      })
    
      return () => window.removeEventListener('scroll', scrollListener);
    }, [])

    useEffect(() => {
      let options = {
        rootMargin: '0px',
        threshold: 1.0
      }

      let callback = (entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.style.opacity = 1;
          }
        });
      };
      
      let observer = new IntersectionObserver(callback, options);
     
    })

  return (
   <div>
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
  )
}


export async function getStaticProps(context) {
 
  // Get all homepage tiles
  const homePageTiles = await (await Client().query(Prismic.Predicates.at('document.type', 'homepage_tile'))).results;

  return {
    props: { homePageTiles }, // will be passed to the page component as props
  }
}