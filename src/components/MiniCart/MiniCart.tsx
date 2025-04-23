import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { userCartStore } from '@store/UserCartStore';
import styles from './MiniCart.module.scss';

const MiniCart = observer(() => {
  const { lastItems } = userCartStore;

  const totalAmount = useMemo(() => {
    return lastItems.reduce(
      (total, [item, qty]) => total + item.price * qty,
      0
    );
  }, [lastItems]);

  return (
    <div className={styles.miniCart}>
      <div className={styles.card}>
        <div className={styles.card__text}>
          <div className={styles.card__caption}>Cart</div>

          {lastItems.map(([item, qty]) => (
            <div key={item.id} className={styles.card__item}>
              <img
                height={40}
                width={40}
                src={item.images[0].formats.small.url}
                alt={item.title}
                className={styles.card__image}
              />
              <div className={styles.card__details}>
                <div className={styles.card__name}>{item.title}</div>
                <div className={styles.card__qty}>Quantity: {qty}</div>
                <div className={styles.card__price}>
                  ${(item.price * qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <div className={styles.card__total}>
            <span className={styles.card__totalLabel}>Total:</span>
            <span className={styles.card__totalAmount}>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MiniCart;
