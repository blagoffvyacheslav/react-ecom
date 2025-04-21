import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import Loader from '@components/Loader';
import { Option } from '@components/MultiDropdown/types';
import MultiDropdown from '@components/MultiDropdown';
import Text from '@components/Text';
import {
  Category,
  Product,
} from '@pages/ProductDetailedPage/constants/product';
import { ProductModelToCardProps } from '@mappers/productMapper';
import PageNumbers from './components/PageNumbers';
import styles from './Products.module.scss';
import loaderStyles from '@components/Loader/Loader.module.scss';
import { ColorEnum } from '../../types/colorEnum';
import ProductListStore from '@store/ProductsListStore/ProductsListStore';
import CategoryStore from '@store/CategoryStore/CategoryStore';
import { userCartStore } from '@store/UserCartStore';
import { QueryParamsStore } from '@store/QueryParamsStore/QueryParamsStore';
import { ELEMENTS_PER_PAGE } from './constants/products';
import debounce from 'lodash.debounce';
import { GetProductListParams } from '@store/ProductsListStore/types';

export const ProductsListPage = observer(() => {
  const [currentProducts, setCurrentProducts] = React.useState<Product[]>([]);
  const [options, setOptions] = React.useState<Option[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const productListStore = useLocalStore(() => new ProductListStore());
  const categoryStore = useLocalStore(() => new CategoryStore());
  const location = useLocation();
  const navigate = useNavigate();
  const queryParamsStore = useLocalStore(
    () =>
      new QueryParamsStore(location.search, (newSearch) => {
        navigate(
          { search: newSearch },
          { replace: true, preventScrollReset: true }
        );
      })
  );

  const pageNumber = React.useRef<number>(1);

  const categoriesToOptions = (v: Category): Option => ({
    key: `${v.id}`,
    value: v.title,
  });

  const selectedCategory: string = queryParamsStore.category;
  const searchTerm: string = queryParamsStore.title;
  const currentPage: number = queryParamsStore.page - 1;

  React.useEffect(() => {
    categoryStore.getCategoryList();
  }, [categoryStore]);

  React.useEffect(() => {
    setOptions(categoryStore.list.map(categoriesToOptions));
  }, [categoryStore.list]);

  React.useEffect(() => {
    const params: GetProductListParams = {};
    if (searchTerm) params.title = searchTerm;
    if (selectedCategory) {
      // @ts-ignore
      params.categoryId = selectedCategory;
    }
    if (currentPage) params.page = currentPage;

    params.pageSize = ELEMENTS_PER_PAGE;
    productListStore.getProductsList(params);
  }, [searchTerm, selectedCategory, currentPage, productListStore]);

  React.useEffect(() => {
    pageNumber.current = productListStore.info.pageCount;
    setCurrentProducts(productListStore.list);
  }, [
    productListStore.info.pageCount,
    productListStore.list,
    currentPage,
    searchTerm,
  ]);

  React.useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const debouncedSetTitle = React.useMemo(
    () =>
      debounce((value: string) => {
        queryParamsStore.title = value;
      }, 500),
    [queryParamsStore]
  );

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetTitle(value);
  };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const last = selectedOptions[selectedOptions.length - 1];
    queryParamsStore.category = last?.key || '';
  };

  const getTotalProducts = () => {
    return productListStore.info.total;
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
          We display products based on the latest products we have. If you want
          to see our old products, please enter the name of the item.
        </Text>

        {/* Поиск */}
        <div className={styles.searchBar}>
          <Input
            value={inputValue}
            onChange={handleSearchChange}
            placeholder={'Search product'}
            className={styles.searchBar__input}
          />
          <Button>{'Search'}</Button>
        </div>

        {/* Фильтр категорий */}
        <MultiDropdown
          generateValueElement={() => {
            const found = options.find((o) => o.key === selectedCategory);
            return found?.value || 'Filter';
          }}
          options={options}
          value={
            selectedCategory
              ? [options.find((o) => o.key === selectedCategory)!]
              : []
          }
          onChange={handleCategoryChange}
          className={styles.filter}
        />

        {/* Информация о количестве товаров */}
        <div className={styles.totalProducts}>
          <span className={styles.totalProducts__txt}>Total Products</span>
          <span className={styles.totalProducts__count}>
            {productListStore.meta === 'loading' ? (
              <div className={loaderStyles.loaderWrapper}>
                <Loader size="l" />
              </div>
            ) : (
              getTotalProducts()
            )}
          </span>
        </div>

        {/* Лоадер / Товары */}
        {productListStore.meta === 'loading' ? (
          <div className={loaderStyles.loaderWrapper}>
            <Loader size="l" />
          </div>
        ) : currentProducts.length === 0 ? (
          <Text>No products found</Text>
        ) : (
          <div className={styles.productsGrid}>
            {currentProducts.map((product) => (
              <Link
                key={product.documentId}
                to={`/product/${product.documentId}`}
              >
                <Card
                  {...ProductModelToCardProps(product)}
                  actionSlot={
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        userCartStore.addItem(product, 1);
                      }}
                    >
                      Add to Cart
                    </Button>
                  }
                />
              </Link>
            ))}
          </div>
        )}

        {/* Пагинация */}
        <PageNumbers
          totalPages={pageNumber.current}
          onChange={(cp) => (queryParamsStore.page = cp + 1)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
});

export default ProductsListPage;
