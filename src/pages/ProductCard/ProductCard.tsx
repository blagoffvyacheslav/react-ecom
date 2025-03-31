import {SetStateAction, useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {Product as ProductModel} from 'pages/ProductCard/constants/productConstants'
import BlockContainer from 'components/BlockContainer'
import RelatedItems from './components/RelatedItems'
import ProductItem from "pages/ProductCard/components/ProductItem";
import {getProduct} from "./GetProduct";
import styles from './ProductCard.module.scss'


const ProductCard = () => {
    const URLparams = useParams() as { id: string | undefined }
    const [product, setProduct] = useState<ProductModel>()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (URLparams.id === undefined) navigate('/')
        else
            getProduct(URLparams.id).then((response: { data: SetStateAction<ProductModel | undefined> })=>setProduct(response.data))

    },[location])
    return (
        <div className={styles.ProductCard}>
            {product ?<>
                <BlockContainer>
                <ProductItem product={product}/>
                </BlockContainer>
                <BlockContainer>
                <RelatedItems category={product.category}/>
                </BlockContainer>
            </>: null}
        </div>
    )
}
export default ProductCard