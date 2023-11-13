import React, { useState } from 'react';
import Navigation from '../Navigation/Nav.js';
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc,getDocs,where,query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import ProductsAdmin from '../Products/ProductsAdmin.js';

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
                let imageFileName=null;
                if(ShoeImage === null)
                {
                    console.log("No Image")
                }
                else
                {
                    imageFileName = `${v4()}_${ShoeImage.name}`;
                }

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
    const handleDelete = async (shoeBrand,shoeIndex) => {
        const shoeRef = collection(ShoesRef, 'Shoes');
        console.log(shoeBrand)
        const brandRef = doc(shoeRef, shoeBrand);
        const brandDoc = await getDoc(brandRef);
        try {
        if (brandDoc.exists()) {
            const productsArray = brandDoc.data().products || [];
            productsArray.splice(shoeIndex,1)
            await updateDoc(brandRef, {
                products: productsArray,
            });
        } else {
            console.log("Brand not found");
        }
        }
        catch (e) {
            console.error(e);
        }

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
            <button>Jordan</button>
                <ProductsAdmin  brand ="Jordan"handleDelete={handleDelete}/>
            <button>Yeezy</button>
                <ProductsAdmin  brand ="Yeezy"handleDelete={handleDelete}/>
            <button>Delete</button>
        </div>
    );
}

export default AdminPage;
