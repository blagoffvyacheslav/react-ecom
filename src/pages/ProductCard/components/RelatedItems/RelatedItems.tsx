import {HTMLAttributes, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Product} from 'pages/ProductCard/constants/productConstants'
import Button from 'components/Button'
import Card from 'components/Card'
import {ProductModelToCardProps} from 'mappers/productMapper'
import styles from './RelatedItems.module.scss'

import {getProducts} from "../../../Products/GetProducts";

type RelatedItemsProps = React.PropsWithChildren<{
    category:Product['category']
}> & HTMLAttributes<HTMLDivElement>;

const RelatedItems=({category}:RelatedItemsProps)=>{
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    getProducts(category.id,3).then((response)=>setProducts(response.data))
  }, [category.id])
  return (
    <div className={styles.RelatedItems}>
      <div className={styles.txt}>Related Items</div>
      <div className={styles.grid}>
        {products?
          products.map((product) =>
            (<Link key={product.id} to={`/product/${product.id}`}>
              <Card {...ProductModelToCardProps(product)} actionSlot={<Button>Add to Cart</Button>}/>
            </Link>)
          ):null
        }
      </div>
    </div>
  )
}

export default RelatedItems