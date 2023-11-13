import React, { useState } from 'react';
import './Products.css';
import {getFirestore, doc, collection, getDoc} from "firebase/firestore";
import ProductsView from './ProductsView';


function Products(props) {
    const [ProductList, setProductList] = useState();
   
    
    const getProducts = async (brand) => {
        const ShoesRef = getFirestore();

        const shoeRef = collection(ShoesRef, "Shoes");
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
    };
    const brandName = "Jordan"; 
    React.useEffect( ()  =>{
    async function fetchData ()  {
    const products = await getProducts(brandName);
    setProductList(products)
    };
    fetchData()
    },[brandName])

    console.log(ProductList)
    
    return (
     <div className='card-container'>
       {ProductList && props.admin === true ? ProductList.map((item) => 
        <ProductsView Name = {item.Name} Price = {item.Price} ImageUrl = {item.ImageUrl}/>
       ) :
       ProductList.map((item) => 
       <ProductsView admin = {props.admin} Name = {item.Name}/>
)}
     </div>
    );
}
export default Products;
