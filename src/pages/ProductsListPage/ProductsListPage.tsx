import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import Loader from '@components/Loader';
import { MultiDropdown, Option } from '@components/MultiDropdown';
import Text from '@components/Text';
import { Category, Product } from '@pages/ProductDetailedPage/constants/product';
import { ProductModelToCardProps } from '@mappers/productMapper';
import PageNumbers from './components/PageNumbers';
import styles from './Products.module.scss';
import loaderStyles from '@components/Loader/Loader.module.scss';
import { ColorEnum } from '../../types/colorEnum';
import { ELEMENTS_PER_PAGE } from './constants/products';
import ProductListStore from '@store/ProductsListStore/ProductsListStore';
import CategoryStore from '@store/CategoryStore/CategoryStore';
import ProductCategoryStore from '@store/ProductCategoryStore/ProductCategoryStore';
import { QueryParamsStore } from '@store/QueryParamsStore/QueryParamsStore';

export const ProductsListPage = observer(() => {
  const [currentProducts, setCurrentProducts] = React.useState<Product[]>([]);
  const [options, setOptions] = React.useState<Option[]>([]);

  const elementsPerPage = ELEMENTS_PER_PAGE;

  const productListStore = useLocalStore(() => new ProductListStore());
  const categoryStore = useLocalStore(() => new CategoryStore());
  const productsCategoryStore = useLocalStore(() => new ProductCategoryStore());
  const location = useLocation();
  const navigate = useNavigate();

  const queryParamsStore = useLocalStore(
    () =>
      new QueryParamsStore(location.search, (newSearch) => {
        navigate({ search: newSearch }, { replace: true });
      })
  );

  const activeProductsStore = React.useRef(productListStore);
  const pageNumber = React.useRef<number>(0);

  // Конвертация категории в опцию для dropdown
  const categoriesToOptions = (v: Category): Option => ({
    key: `${v.id}`,
    value: v.title,
  });

  const selectedCategory = queryParamsStore.category;
  const searchTerm = queryParamsStore.title;
  const currentPage = queryParamsStore.page - 1;

  // Получение категорий и установка options
  React.useEffect(() => {
    categoryStore.getCategoryList();
  }, [categoryStore]);

  React.useEffect(() => {
    setOptions(categoryStore.list.map(categoriesToOptions));
  }, [categoryStore.list]);

  // Фетч продуктов по названию / категории
  React.useEffect(() => {
    const params: any = {};
    if (searchTerm) params.title = searchTerm;
    if (selectedCategory) params.categoryId = selectedCategory;
    if (pageNumber) params.page = pageNumber;
    if (selectedCategory) {
      productsCategoryStore.getProductsList(params);
      activeProductsStore.current = productsCategoryStore;
    } else {
      productListStore.getProductsList(params);
      activeProductsStore.current = productListStore;
    }
  }, [searchTerm, selectedCategory, productListStore, productsCategoryStore]);

  // Подготовка отображаемого списка
  React.useEffect(() => {
    const sourceList = activeProductsStore.current.list;
    const filteredList = sourceList.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    pageNumber.current = Math.ceil(filteredList.length / elementsPerPage);

    setCurrentProducts(
      filteredList.slice(
        currentPage * elementsPerPage,
        currentPage * elementsPerPage + elementsPerPage
      )
    );
  }, [activeProductsStore.current.list, currentPage, elementsPerPage, searchTerm]);

  const handleSearchChange = (value: string) => {
    queryParamsStore.title = value;
  };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const last = selectedOptions[selectedOptions.length - 1];
    queryParamsStore.category = last?.key || '';
  };

  const getTotalProducts = () => {
    return activeProductsStore.current.list.length;
  };

  return (
    <div className={styles.blockContainer}>
      <div className={styles.products}>
        <Text className={styles.products} tag={'h1'} view={'title'}>
          Products
        </Text>
        <Text className={styles.p1} tag={'p'} color={ColorEnum.Secondary} view={'p-20'}>
          We display products based on the latest products we have. If you want to see our old
          products, please enter the name of the item.
        </Text>

        {/* Поиск */}
        <div className={styles.searchBar}>
          <Input
            value={searchTerm}
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
          <span className={styles.totalProducts__count}>{getTotalProducts()}</span>
        </div>

        {/* Лоадер / Товары */}
        {activeProductsStore.current.meta === 'loading' ? (
          <div className={loaderStyles.loaderWrapper}>
            <Loader size="l" />
          </div>
        ) : currentProducts.length === 0 ? (
          <Text>No products found</Text>
        ) : (
          <div className={styles.productsGrid}>
            {currentProducts.map((product) => (
              <Link key={product.documentId} to={`/product/${product.documentId}`}>
                <Card
                  {...ProductModelToCardProps(product)}
                  actionSlot={<Button>Add to Cart</Button>}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Пагинация */}
        <PageNumbers
          totalPages={pageNumber.current}
          onChange={(cp) => queryParamsStore.page = cp + 1}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
});

export default ProductsListPage;