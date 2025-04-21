import React from 'react';
import Text from '@components/Text';
import styles from './CartItem.module.scss';

interface CartItemProps {
  title: string;
  description: string;
  image: string;
  price: number;
  actionSlot?: React.ReactNode;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  description,
  image,
  price,
  actionSlot,
}) => {
  return (
    <div className={styles.cartItem}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.info}>
        <Text tag="h3" view="p-20" className={styles.title}>
          {title}
        </Text>

        <Text view="p-14" className={styles.description}>
          {description}
        </Text>

        <div className={styles.footer}>
          <Text view="p-18" className={styles.price}>
            {price} $
          </Text>
          <div className={styles.action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
