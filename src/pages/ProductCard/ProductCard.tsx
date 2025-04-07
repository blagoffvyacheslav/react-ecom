import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product as ProductModel } from 'pages/ProductCard/constants/product';
import RelatedItems from './components/RelatedItems';
import ProductItem from 'pages/ProductCard/components/ProductItem';
import styles from './ProductCard.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProductCardStore from '../../store/ProductCardStore/ProductCardStore';
import { Meta } from '../../utils/meta';

const ProductCard = () => {
  const URLparams = useParams() as { id: string | undefined };
  const [product, setProduct] = React.useState<ProductModel | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const productCardStore = useLocalObservable(() => new ProductCardStore());

  React.useEffect(() => {
    if (URLparams.id === undefined) {
      navigate('/');
    } else {
      productCardStore.getProductCard({ productId: URLparams.id });
    }
  }, [URLparams.id, navigate, productCardStore]);

  React.useEffect(() => {
    setProduct(productCardStore.item);
  }, [location, productCardStore.meta, productCardStore.item]);

  return (
    <div className={styles.blockContainer}>
      <div className={styles.ProductCard}>
        {product && productCardStore.meta == Meta.success ? (
          <>
            <ProductItem product={product} />
            <RelatedItems category={product.category} />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default observer(ProductCard);
