import React, { useState } from 'react';
import './Products.css';
import {getFirestore, doc, collection, getDoc} from "firebase/firestore";
import ProductsView from './ProductsView';

function ProductsAdmin(props) {
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
    
    React.useEffect( ()  =>{
    async function fetchData ()  {
    const products = await getProducts(props.brand);
    setProductList(products)
    };
    fetchData()
    },[props.brand])

    console.log(ProductList)
    
    return (
     
        <div className='card-container'>
        { props.main === true ?  ProductList && ProductList.map((item,index) => 
            <ProductsView key={index} id={index} Name = {item.Name} Price = {item.Price} ImageUrl = {item.ImageUrl}  main={true}/>
        ) :
        ProductList &&  ProductList.map((item,index) => 
        <ProductsView key={index}  id={index} brand={props.brand} Name = {item.Name} handleDelete={props.handleDelete}/>
          )}
        </div>
    );
}
export default ProductsAdmin;
