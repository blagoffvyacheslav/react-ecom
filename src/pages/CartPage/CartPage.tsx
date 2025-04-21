import React from 'react';
import { observer } from 'mobx-react-lite';
import { userCartStore } from '@store/UserCartStore';
import Button from '@components/Button';
import CardItem from '@components/CartItem';
import Text from '@components/Text';
import styles from './CartPage.module.scss';

export const CartPage = observer(() => {
  const [currentItems, setCurrentItems] = React.useState(userCartStore.items);

  React.useEffect(() => {
    setCurrentItems(userCartStore.items);
  }, [userCartStore.items]);

  const getTotalPrice = () => {
    return Array.from(userCartStore.items.entries()).reduce(
      (total, [product, qty]) => {
        return total + product.price * qty; // вычисляем цену для каждого товара
      },
      0
    );
  };

  return (
    <div className={styles.blockContainer}>
      <div className={styles.cartPage}>
        <div className={styles.cartPage__title}>
          <Text tag="h1" view="title">
            Cart
          </Text>
        </div>

        {currentItems.size === 0 ? (
          <Text>No items in the cart</Text>
        ) : (
          <div className={styles.cartItems}>
            {Array.from(currentItems.entries()).map(([product, qty]) => (
              <div key={product.id} className={styles.card}>
                <CardItem
                  {...product}
                  price={product.price * qty}
                  image={product.images[0].formats.medium.url}
                  actionSlot={
                    <>
                      <div className={styles.itemQuantity}>
                        <Button
                          onClick={() =>
                            userCartStore.setItemQuantity(product, qty - 1)
                          }
                        >
                          -
                        </Button>
                        <span>{qty}</span>
                        <Button
                          onClick={() =>
                            userCartStore.setItemQuantity(product, qty + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </>
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.cartTotal}>
          <div className={styles.cartTotal__label}>Total:</div>
          <div className={styles.cartTotal__amount}>{getTotalPrice()} $</div>
        </div>

        {currentItems.size > 0 ? (
          <div className={styles.cartActions}>
            <Button onClick={() => userCartStore.checkout()}>
              Proceed to Checkout
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default CartPage;
