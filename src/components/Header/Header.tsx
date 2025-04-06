import { Link } from 'react-router-dom';
import logo from './img/logo.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <input type="checkbox" className={styles.menu__checkbox} />
        <div className={styles.logoAndItem}>
          <Link to="/" className={styles.logo}>
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
          <Link to="#">Categories</Link>
          <Link to="#">About Us</Link>
        </nav>
        <div className={styles.right}>
          <Link to="#" className={styles.bag} />
          <Link to="#" className={styles.user} />
        </div>
      </div>
    </header>
  );
};
export default Header;
