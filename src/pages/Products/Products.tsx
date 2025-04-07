import React, { useEffect, useCallback } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
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
import { ColorEnum } from '../../types/colorEnum';
import { ELEMENTS_PER_PAGE } from './constants/products';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProductStore from '../../store/ProductStore/ProductStore';
import { Meta } from '../../utils/meta';
import CategoryStore from '../../store/CategoryStore/CategoryStore';
import ProductCategoryStore from '../../store/ProductCategoryStore/ProductCategoryStore';

export const Products = () => {
  const [currentProducts, setCurrentProducts] = React.useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [options, setOptions] = React.useState<Option[]>([]);

  const elementsPerPage = ELEMENTS_PER_PAGE;

  const productStore = useLocalObservable(() => new ProductStore());
  const categoryStore = useLocalObservable(() => new CategoryStore());
  const productsCategoryStore = useLocalObservable(
    () => new ProductCategoryStore()
  );

  const activeProductsStore = React.useRef(productStore);
  const pageNumber = React.useRef<number>(0);

  const categoriesToOptions = (v: Category): Option => ({
    key: `${v.id}`,
    value: v.name,
  });

  const location = useLocation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const pageFromUrl = queryParams.get('page');
    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl) - 1);
    }
  }, [queryParams]);

  useEffect(() => {
    const currentParam = Number(searchParams.get('page'));
    if (currentParam !== currentPage + 1) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', (currentPage + 1).toString());
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [currentPage]);

  useEffect(() => {
    const title = queryParams.get('title');
    if (title !== null) {
      productStore.getProductsList({ title: title });
    } else {
      productStore.getProductsList({});
    }
    categoryStore.getCategoryList();
  }, [categoryStore, productStore, location.search]);

  useEffect(() => {
    if (categoryStore.list) {
      setOptions(categoryStore.list.map(categoriesToOptions));
      const categoryIdFromURL = queryParams.get('categoryId');

      const findValueByKey = (key: string) => {
        const option = options.find((option) => option.key === key);
        return option ? option.value : undefined;
      };

      if (categoryIdFromURL) {
        setSelectedCategories([
          {
            key: categoryIdFromURL,
            value: findValueByKey(categoryIdFromURL),
          },
        ]);
      }
    }
  }, [categoryStore.meta, categoryStore.list, location.search]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const newKey = selectedCategories[0].key;
      productsCategoryStore.getProductsList({ categoryId: newKey });
      activeProductsStore.current = productsCategoryStore;
    } else {
      activeProductsStore.current = productStore;
    }
    setCurrentPage(0);
  }, [productStore, productsCategoryStore, selectedCategories]);

  useEffect(() => {
    const sourceList = activeProductsStore.current.list;

    const filteredList = searchTerm
      ? selectedCategories.length === 0
        ? sourceList.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : sourceList.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
      : sourceList;

    pageNumber.current = Math.ceil(filteredList.length / elementsPerPage);

    setCurrentProducts(
      filteredList.slice(
        currentPage * elementsPerPage,
        currentPage * elementsPerPage + elementsPerPage
      )
    );
  }, [
    activeProductsStore.current.list,
    currentPage,
    searchTerm,
    elementsPerPage,
    selectedCategories,
  ]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(0);
      if (selectedCategories.length === 0) {
        productStore.getProductsList({ title: value });
      }
    },
    [productStore, selectedCategories.length]
  );

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const lastEl = selectedOptions[selectedOptions.length - 1];
    setSelectedCategories([lastEl]);
  };

  const getTotalProducts = () => {
    const sourceList = activeProductsStore.current.list;

    const filteredList = searchTerm
      ? sourceList.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sourceList;

    // Фильтрация по выбранной категории
    if (selectedCategories.length > 0) {
      return filteredList.length;
    }

    return filteredList.length;
  };

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
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={'Search product'}
            className={styles.searchBar__input}
          />
          <Button>{'Search'}</Button>
        </div>
        <MultiDropdown
          generateValueElement={() => {
            return selectedCategories[0]
              ? selectedCategories[0].value
              : 'Filter';
          }}
          options={options}
          value={selectedCategories.map(categoriesToOptions)}
          onChange={handleCategoryChange}
          className={styles.filter}
        />
        <div className={styles.totalProducts}>
          <span className={styles.totalProducts__txt}>Total Products</span>
          <span className={styles.totalProducts__count}>
            {getTotalProducts()}
          </span>
        </div>
        <div className={styles.productsGrid}>
          {activeProductsStore.current.meta === Meta.loading ? (
            <Loader />
          ) : currentProducts.length === 0 ? (
            <Text>No products found</Text>
          ) : (
            currentProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card
                  {...ProductModelToCardProps(product)}
                  actionSlot={<Button>Add to Cart</Button>}
                />
              </Link>
            ))
          )}
        </div>
        <PageNumbers
          totalPages={pageNumber.current}
          onChange={(cp) => setCurrentPage(cp)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default observer(Products);
