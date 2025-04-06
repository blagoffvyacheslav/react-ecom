import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import Loader from 'components/Loader';
import { MultiDropdown, Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import { Category, Product } from 'pages/ProductCard/constants/product';
import { ProductModelToCardProps } from 'mappers/productMapper';
import PageNumbers from './components/PageNumbers';
import styles from './Products.module.scss';
import { getProducts } from './getProducts';
import { getCategories } from './getCategories';
import { ColorEnum } from '../../types/colorEnum';

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>();
  const [currentProducts, setCurrentProducts] = useState<Product[]>();
  const [selectedCategories] = useState<Category[]>([]);
  const totalElements = allProducts ? allProducts.length : 0;
  const elementsPerPage = 9;
  const totalPages = Math.ceil(totalElements / elementsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0);
  useEffect(() => {
    if (selectedCategories.length === 0)
      getProducts().then((response) => setAllProducts(response.data));
    else {
      Promise.all(selectedCategories.map((v) => getProducts(Number(v)))).then(
        (rs) =>
          setAllProducts(
            rs
              .map((r) => r.data)
              .reduce(
                (allProducts, products) => [...allProducts, ...products],
                []
              )
          )
      );
    }
  }, [selectedCategories]);
  useEffect(
    () =>
      setCurrentProducts(
        allProducts?.slice(
          currentPage * elementsPerPage,
          currentPage * elementsPerPage + elementsPerPage
        )
      ),
    [currentPage, allProducts]
  );
  const categoriesToOptions = (v: Category): Option => ({
    key: `${v.id}`,
    value: v.name,
  });
  useEffect(() => {
    getCategories().then((categories) => {
      return setOptions(
        categories ? categories.data.map(categoriesToOptions) : []
      );
    });
  }, []);
  const [options, setOptions] = useState<Option[]>();
  return (
    <div className={styles.blockContainer}>
      <div className={styles.products}>
        <Text className={styles.products} tag={'h1'} view={'title'}>
          Products
        </Text>
        <Text
          className={styles.p1}
          tag={'p'}
          color={ColorEnum.Secondary}
          view={'p-20'}
        >
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
        <div className={styles.searchBar}>
          <Input
            value=""
            onChange={() => {}}
            placeholder={'Search product'}
            className={styles.searchBar__input}
          />
          {/*<Button>{width > 1023 ? 'Find Now' : 'Search'}</Button>*/}
          <Button>{'Search'}</Button>
        </div>
        <MultiDropdown
          generateValueElement={() => {
            return 'Filter';
          }}
          options={options ? options : []}
          value={selectedCategories.map(categoriesToOptions)}
          onChange={function (): void {
            throw new Error('Function not implemented.');
          }}
          className={styles.filter}
        />
        <div className={styles.totalProducts}>
          <span className={styles.totalProducts__txt}>Total Products</span>
          <span className={styles.totalProducts__count}>{totalElements}</span>
        </div>
        <div className={styles.productsGrid}>
          {currentProducts ? (
            currentProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card
                  {...ProductModelToCardProps(product)}
                  actionSlot={<Button>Add to Cart</Button>}
                />
              </Link>
            ))
          ) : (
            <Loader />
          )}
        </div>
        <PageNumbers
          totalPages={totalPages}
          onChange={(cp) => {
            setCurrentPage(cp);
          }}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
export default Products;
