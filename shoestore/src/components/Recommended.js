import { useNavigate } from 'react-router-dom';
import './Recommended.css';
import { db}  from '../config/firebase';
import { useState,useEffect } from 'react';
import { collection,getFirestore,getDocs}  from 'firebase/firestore';


function Recommended(brand) {
  const navigate = useNavigate  ();
  const [brands, setBrands] = useState([]);
  const db = getFirestore();



  useEffect(() => {
  const getFirestoreData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Shoes'));
    const brandArray = [] 
    querySnapshot.forEach((doc) => {
      brandArray.push(doc.id);
    });
    setBrands(brandArray)
  };
      getFirestoreData();

  }, []);

  const navigateFunction = (shoeBrand) => {
    
    navigate(`/main/${shoeBrand}`);
  };
  
  
  return (
    <>
        <div className="recommended-flex">
          <button className="button" onClick={() => navigateFunction('all')}> All Products</button>
          { brands && brands.map(brand => (
          <button key={brand} className="button" onClick={() => navigateFunction(brand)}>
            {brand}
          </button>
          ))}
        </div>
    
    </>
  )
}
export default  Recommended;