import React, {useEffect, useState} from "react";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import { commerce } from "../../../lib/commerce";
import { useCartDispatch } from "../../../context/cart";
import { useMobileMenuState } from "../../../context/mobileMenu";
import Footer from "../../../components/Footer/Footer";
import styles from '../../../styles/Product.module.css';
import { usePersonalisationState } from "../../../context/personalisation";

export async function getStaticProps({ params }) {
    const { permalink } = params;
  
    const product = await commerce.products.retrieve(permalink, {
      type: 'permalink',
    });
  
    return {
      props: {
        product,
      },
    };
  }
  
  export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();
  
    return {
      paths: products.map((product) => ({
        params: {
          permalink: product.permalink,
        },
      })),
      fallback: false,
    };
  }
  
  export default function ProductPage({ product }) {
    const [variants, setVariants] = useState(product.variant_groups);
    const [mainColor, setMainColor] = useState([]);
    const [size, setSize] = useState([]);
    const [mainDividerColor, setMainDividerColor] = useState([]);
    const [characterColor, setCharacterColor] = useState([]);
    const [smallDividers, setSmallDividers] = useState([]);
    const [chosenVariants, setChosenVariants] = useState({});
    const { setCart } = useCartDispatch();

    const addToCart = () => commerce.cart.add(product.id, 1, chosenVariants).then(({cart}) => setCart(cart));

    const {setMobileMenu} = useMobileMenuState();
    const {setPersonalisation} = usePersonalisationState();
  
    useEffect(() => {
      setMobileMenu(false);
      let variantObject = {};
      variants.forEach(variant => {
        variantObject[variant.id] = variant.options[0].id;
      })
      setChosenVariants(variantObject);
    }, []);

    useEffect(() => {
      let objectArray = [mainColor, size, mainDividerColor, characterColor, smallDividers];
      let variantObject = {};
      objectArray.forEach(item => {
        variantObject[item[0]] = item[1];
      })
      setChosenVariants(variantObject);
    }, [mainColor, size, mainDividerColor, characterColor, smallDividers])

    

    useEffect(() => {
      variants.forEach(variant => {
        switch (variant.name) {
          case 'Colour':
            setMainColor([variant.id ,variant.options[0].id])
            break;
          case 'Size':
            setSize([variant.id ,variant.options[0].id])
          case 'Main Divider Colour':
            setMainDividerColor([variant.id ,variant.options[0].id])
            break;
          case 'Character Colour':
            setCharacterColor([variant.id ,variant.options[0].id])
            break;
          case 'Small Dividers':
            setSmallDividers([variant.id ,variant.options[0].id])
            break
          default:
            console.log(`Not a listed variant ${variant.name}`);
        }
      })
    },[])

    function handleMainColorChange(event) {
      let id = mainColor[0];
      setMainColor([id, event.target.value]);
    }

    function handleSizeChange(event) {
      let id = size[0];
      setSize([id, event.target.value]);
    }

    function handleMainDividerColourChange(event){
      let id = mainDividerColor[0];
      setMainDividerColor([id, event.target.value]);
    }

    function handleCharacterColorChange(event){
      let id = characterColor[0];
      setCharacterColor([id, event.target.value]);
    }

    function handleSmallDividersChange(event){
      let id = smallDividers[0];
      setSmallDividers([id, event.target.value]);
    }
        
    return (
      <>
      <section className={styles.section}>
        <div className={styles.container}>    
          <div className={styles.productContainer}>
            <ImageCarousel product={product} />
            <div className={styles.productInfo}>
              <h3 className={styles.title}>{product.name}</h3>
              <h4 className={styles.price} >{product.price.formatted_with_symbol}</h4>
              <div className={styles.description} dangerouslySetInnerHTML={{__html : product.description}}></div>
              <br />
              <h4>Select color</h4>
              <select className={styles.input} value={mainColor[1]} onChange={handleMainColorChange}>
                {variants.filter(variant => variant.name === 'Colour')[0].options.map(variant => (
                  <option value={variant.id} key={variant.name}>{variant.name}</option>
                ))}
              </select>
              <br />
              <br />
              <h4>Select size:</h4>
              <select className={styles.input} value={size[1]} onChange={handleSizeChange}>
                {variants.filter(variant => variant.name === 'Size')[0].options.map(variant => (
                  <option value={variant.id} key={variant.name}>{variant.name}</option>
                ))}
              </select>
              <br />
              <br />
              <h4>Select divider colour:</h4>
              <select className={styles.input} value={mainDividerColor[1]} onChange={handleMainDividerColourChange}>
                {variants.filter(variant => variant.name === 'Main Divider Colour')[0].options.map(variant => (
                  <option value={variant.id} key={variant.name}>{variant.name}</option>
                ))}
              </select>
              <br />
              <br />
              <h4>Select letter / number colour:</h4>
              <select className={styles.input} value={characterColor[1]} onChange={handleCharacterColorChange}>
                {variants.filter(variant => variant.name === 'Character Colour')[0].options.map(variant => (
                  <option value={variant.id} key={variant.name}>{variant.name}</option>
                ))}
              </select>
              <br />
              <br />
              <h4>Add small divider between each letter?</h4>
              <select className={styles.input} value={smallDividers[1]} onChange={handleSmallDividersChange}>
                {variants.filter(variant => variant.name === 'Small Dividers')[0].options.map(variant => (
                  <option value={variant.id} key={variant.name}>{variant.name}</option>
                ))}
              </select>
              <br />
              <br />
              <h4>How would you like to personalise your bracelet? Add a description here:</h4>
              <input className={styles.input} type="text" placeholder="Enter Name / Number / Initials here..." onChange={(e) => setPersonalisation(e.target.value)}></input>
              <br />

              <button className={styles.addToCart} onClick={addToCart}>Add to Cart </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      </>
    );
  }