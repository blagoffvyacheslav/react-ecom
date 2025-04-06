import { SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product as ProductModel } from 'pages/ProductCard/constants/product';
import RelatedItems from './components/RelatedItems';
import ProductItem from 'pages/ProductCard/components/ProductItem';
import { getProduct } from './getProduct';
import styles from './ProductCard.module.scss';

const ProductCard = () => {
  const URLparams = useParams() as { id: string | undefined };
  const [product, setProduct] = useState<ProductModel>();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (URLparams.id === undefined) {
      navigate('/');
    } else {
      getProduct(URLparams.id).then(
        (response: { data: SetStateAction<ProductModel | undefined> }) =>
          setProduct(response.data)
      );
    }
  }, [location]);
  return (
    <div className={styles.blockContainer}>
      <div className={styles.ProductCard}>
        {product ? (
          <>
            <ProductItem product={product} />
            <RelatedItems category={product.category} />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ProductCard;
