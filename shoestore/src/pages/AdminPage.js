import React, { useState } from 'react';
import Navigation from '../Navigation/Nav.js';
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import Products from '../Products/Products.js';

function AdminPage() {
    const [ShoeName, setShoeName] = useState('');
    const [ShoePrice, setShoePrice] = useState('');
    const [ShoeBrand, setShoeBrand] = useState('');
    const [ShoeImage, setShoeImage] = useState(null);

    const ShoesRef = getFirestore();

    const addShoes = async () => {
        const shoeRef = collection(ShoesRef, 'Shoes');

        try {
            const brandRef = doc(shoeRef, ShoeBrand);
            const brandDoc = await getDoc(brandRef);

            if (brandDoc.exists()) {
                const productsArray = brandDoc.data().products || [];
                const imageFileName = `${v4()}_${ShoeImage.name}`;

                const storage = getStorage();
                const imageRef = ref(storage, `images/${imageFileName}`);
                await uploadBytes(imageRef, ShoeImage);

                productsArray.push({
                    Name: ShoeName,
                    Price: ShoePrice,
                    ImageUrl: imageFileName,
                });

                await updateDoc(brandRef, {
                    products: productsArray,
                });
            } else {
                
                const brandRef = doc(shoeRef,ShoeBrand);
                const brandDoc = await addDoc(brandRef)

                const productsArray = brandDoc.data().products || [];
                const imageFileName = `${v4()}_${ShoeImage.name}`;

                const storage = getStorage();
                const imageRef = ref(storage, `images/${imageFileName}`);
                await uploadBytes(imageRef, ShoeImage);

                productsArray.push({
                    Name: ShoeName,
                    Price: ShoePrice,
                    ImageUrl: imageFileName,
                });

                await updateDoc(brandRef, {
                    products: productsArray,
                });
            }
        } catch (e) {
            console.error(e);
        }

        setShoeName('');
        setShoePrice('');
        setShoeBrand('');
        setShoeImage('');
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setShoeImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <Navigation />
            <h2>Add Product</h2>
            <label>
                Product Brand:
                <input type="text" value={ShoeBrand} onChange={(e) => setShoeBrand(e.target.value)} />
            </label>
            <label>
                Product Name:
                <input type="text" value={ShoeName} onChange={(e) => setShoeName(e.target.value)} />
            </label>
            <label>
                Product Price:
                <input type="text" value={ShoePrice} onChange={(e) => setShoePrice(e.target.value)} />
            </label>
            <label>
                Product Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <button onClick={addShoes}>Add Product</button>
            <h2>Delete Product</h2>
                <Products admin= {true}/>
            <button>Delete</button>
        </div>
    );
}

export default AdminPage;
