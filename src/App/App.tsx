import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '@components/Header';
import ProductDetailedPage from '@pages/ProductDetailedPage';
import ProductsListPage from '@pages/ProductsListPage';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductDetailedPage />} />
          <Route path="" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
