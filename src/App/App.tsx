import { Navigate, Route, Routes } from 'react-router-dom'
import  Header  from 'components/Header'
import ProductCard from 'pages/ProductCard'
import Products from 'pages/Products'
import styles from './App.module.scss'

const App = () => {
    return (
        <div className={styles.app}>
            <Header />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/product">
                    <Route path=":id" element={<ProductCard />} />
                    <Route path="" element={<Navigate to="/404" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default App
