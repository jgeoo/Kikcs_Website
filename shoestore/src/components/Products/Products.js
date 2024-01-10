import React, { useState } from 'react';
import './Products.css';
import {getFirestore, doc, collection, getDoc, getDocs} from "firebase/firestore";
import ProductsView from './ProductsView';
import Navigation from '../Nav';
import Recommended from '../Recommended';


function Products(props) {
    const [ProductList, setProductList] = useState();
   
    const getProducts = async (brand) => {
        const ShoesRef = getFirestore();

        const shoeRef = collection(ShoesRef, "Shoes");
        if (brand === 'all') {
            try {
                const querySnapshot = await getDocs(shoeRef);
                const allProducts = [];

                querySnapshot.forEach((doc) => {
                    const products = doc.data().products || [];
                    allProducts.push(...products);
                });

                return allProducts;
            } catch (e) {
                console.error(e);
                return [];
            }
        } else {
        const brandRef = doc(shoeRef, brand);
    
        try {
            
            const brandDoc = await getDoc(brandRef);
           
             if (brandDoc.exists()) {
                const products = brandDoc.data().products || [];
                return products;
            } else {
                console.log("Brand not found");
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    }
    React.useEffect( ()  =>{
    async function fetchData ()  {
    const products = await getProducts(props.brand);
    setProductList(products)
    };
    fetchData()
    },[props.brand])

    
    return (
     <div>
        <Navigation/>
        <Recommended brand={props.brand} />
        <div className='card-container'>
        { props.main === true ?  ProductList && ProductList.map((item,index) => 
            <ProductsView key={index} id={index} Name = {item.Name} Price = {item.Price} ImageUrl = {item.ImageUrl}  main={true}/>
        ) :
        ProductList &&  ProductList.map((item,index) => 
        <ProductsView key={index}  id={index} brand={props.brand} Name = {item.Name} handleDelete={props.handleDelete}/>
          )}
        </div>
     </div>
    );
}
export default Products;
