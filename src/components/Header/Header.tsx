import { Link } from 'react-router-dom';
import logo from './img/logo.svg';
import styles from './Header.module.scss';
import { userCartStore } from '@store/UserCartStore';
import Icon from '@components/icons/Icon/Icon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import MiniCart from '@components/MiniCart/MiniCart';

export const Header = () => {
  const [isCartOpen, setCartOpen] = React.useState(false);

  const totalItems: number = userCartStore.quantity;

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <input type="checkbox" className={styles.menu__checkbox} />
        <div className={styles.logoAndItem}>
          <Link to="/product" className={styles.logo}>
            <img src={logo} alt="" />
            <span>Lalasia</span>
          </Link>
          <label htmlFor={styles.menu__checkbox} className={styles.item}>
            <div />
          </label>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles._current}>
            Products
          </Link>
          <Link to="#">About Us</Link>
        </nav>
        <div className={styles.right}>
          <div
            className={styles.cartWrapper}
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <Link to="/cart" className={styles.cardLabel}>
              <Icon width={70} height={70}>
                <g transform="translate(15, 15)">
                  <path
                    d="M9.375 9.58739V8.37489C9.375 5.56239 11.6375 2.79989 14.45 2.53739C17.8 2.21239 20.625 4.84989 20.625 8.13739V9.86239"
                    stroke="#151411"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z"
                    stroke="#151411"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.3691 15H19.3803"
                    stroke="#151411"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6181 15H10.6294"
                    stroke="#151411"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                <g transform="translate(40, 5)">
                  <circle cx="12" cy="12" r="12" fill="rgb(81, 133, 129)" />
                  <text
                    x="12"
                    y="12"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'Roboto', serif"
                    fontSize="11"
                    fill="white"
                    fontWeight="bold"
                  >
                    {totalItems}
                  </text>
                </g>
              </Icon>
            </Link>
            {isCartOpen && userCartStore.quantity > 0 && <MiniCart />}
          </div>
          <Link to="/user" className={styles.user} />
        </div>
      </div>
    </header>
  );
};

export default observer(Header);