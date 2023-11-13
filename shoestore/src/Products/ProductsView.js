import React from 'react';
import { useEffect, useState } from 'react';
import { getDownloadURL,getStorage, ref } from 'firebase/storage';
import {getFirestore,updateDoc, doc, collection, getDoc} from "firebase/firestore";

export default function ProductsView({ Name, Price, ImageUrl,main,handleDelete,id,brand }) {

    

    const [downloadUrl, setDownloadUrl] = useState(null);
    const storage = getStorage();

    useEffect(() => {
      const getImageDownloadUrl = async () => {
        if (ImageUrl) {
          const storageRef = ref(storage, `images/${ImageUrl}`);
          try {
            const url = await getDownloadURL(storageRef);
            setDownloadUrl(url);
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      };
      getImageDownloadUrl();
    }, [ImageUrl]);
  
  return (

      <section >
        {main === true ? 
        <section className='card'>
        {downloadUrl && <img src={downloadUrl} className='Shoe-img' />}
        <h3 className='card-title'>{Name}</h3>
        <div className='price'>{Price}</div>
        </section>
        :
        <section className='card'>
        <h3 className='card-title'>{Name}</h3>
        <h3 className='card-title'>{id}</h3>
        <button onClick={()=>handleDelete(brand,id)}>Delete</button>
        </section>
         } 
      </section>
        
  );
}
