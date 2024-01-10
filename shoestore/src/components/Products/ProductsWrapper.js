import { useParams } from 'react-router-dom';
import Products from './Products';

function ProductsWrapper() {
    const { brand } = useParams();

    return <Products brand={brand} main={true} />;
}

export default ProductsWrapper;