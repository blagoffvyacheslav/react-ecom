import { HTMLAttributes, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Product } from '@pages/ProductDetailedPage/constants/product';
import Button from '@components/Button';
import Card from '@components/Card';
import { ProductModelToCardProps } from '@mappers/productMapper';
import styles from './RelatedItems.module.scss';
import ProductListStore from '@store/ProductsListStore/ProductsListStore';
import Loader from '@components/Loader';

type RelatedItemsProps = React.PropsWithChildren<{
  category: Product['productCategory'];
  excludeId?: number;
}> &
  HTMLAttributes<HTMLDivElement>;

const RelatedItems = observer(({ category, excludeId }: RelatedItemsProps) => {
  const productListStore = useLocalStore(() => new ProductListStore());

  useEffect(() => {
    if (category?.id) {
      productListStore.getProductsList({
        categoryId: category.id,
        page: 1,
        pageSize: 3,
        excludeId: excludeId,
      });
    }
  }, [excludeId, category.id, productListStore]);

  const products = productListStore.list;

  if (productListStore.meta === 'loading') {
    return (
      <div className={styles.RelatedItems}>
        <Loader size="l" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={styles.RelatedItems}>
      <div className={styles.txt}>Related Items</div>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link key={product.documentId} to={`/product/${product.documentId}`}>
            <Card
              {...ProductModelToCardProps(product)}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
    </div>
  );
});

export default RelatedItems;
