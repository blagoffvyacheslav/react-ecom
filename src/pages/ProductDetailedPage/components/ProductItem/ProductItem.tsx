import { HTMLAttributes } from 'react';
import { Product as ProductModel } from '@pages/ProductDetailedPage/constants/product';
import Button from '@components/Button';
import Text from '@components/Text';
import styles from './ProductItem.module.scss';
import { ColorEnum } from '../../../../types/colorEnum';
import { userCartStore } from '@store/UserCartStore';
import { useNavigate } from 'react-router-dom';

type ProductProps = React.PropsWithChildren<{
  product: ProductModel;
}> &
  HTMLAttributes<HTMLDivElement>;

const ProductItem = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    userCartStore.addItem(product);
    navigate('/cart');
  };
  return (
    <section className={styles.Product}>
      <img
        src={product.images[0].formats.large.url}
        className={styles.img}
        alt={product.title}
      />
      <div className={styles.text}>
        <Text view={'title'} className={styles.title}>
          {product.title}
        </Text>
        <Text
          view={'p-20'}
          color={ColorEnum.Secondary}
          className={styles.description}
        >
          {product.description}
        </Text>
        <Text className={styles.price} weight={'bold'} view={'title'}>
          ${product.price}
        </Text>
        <Text className={styles.buttons}>
          <Button onClick={() => handleBuyNow()}>Buy Now</Button>
          <Button
            skin="secondary"
            onClick={(e) => {
              userCartStore.addItem(product, 1);
            }}
          >
            Add to Cart
          </Button>
        </Text>
      </div>
    </section>
  );
};

export default ProductItem;
