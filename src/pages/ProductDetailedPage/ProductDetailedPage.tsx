import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product as ProductModel } from '@pages/ProductDetailedPage/constants/product';
import RelatedItems from './components/RelatedItems';
import ProductItem from '@pages/ProductDetailedPage/components/ProductItem';
import styles from './ProductDetailedPage.module.scss';
import { observer, useLocalStore } from 'mobx-react-lite';
import ProductDetailedStore from '@store/ProductDetailedStore/ProductDetailedStore';
import { Meta } from '@utils/meta';
import Loader from '@components/Loader';

export const ProductDetailedPage = () => {
  const URLparams = useParams() as { id: string | undefined };
  const [product, setProduct] = React.useState<ProductModel | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const productDetailedStore = useLocalStore(() => new ProductDetailedStore());

  React.useEffect(() => {
    const productId = URLparams.id;

    if (!productId) {
      navigate('/');
      return;
    }

    productDetailedStore.getProductDetailed({ productId: productId });
  }, [URLparams.id, navigate, productDetailedStore]);

  React.useEffect(() => {
    setProduct(productDetailedStore.item);
  }, [location, productDetailedStore.meta, productDetailedStore.item]);
  return (
    <div className={styles.blockContainer}>
      <div className={styles.ProductCard}>
        {productDetailedStore.meta === Meta.loading && <Loader />}

        {productDetailedStore.meta === Meta.error && (
          <div>Oops! Something went wrong while fetching the product.</div>
        )}

        {product && productDetailedStore.meta === Meta.success && (
          <>
            <ProductItem product={product} />
            <RelatedItems
              category={product.productCategory}
              excludeId={product.id}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default observer(ProductDetailedPage);
