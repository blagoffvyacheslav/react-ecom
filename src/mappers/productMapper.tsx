import { Product } from 'pages/ProductDetailedPage/constants/product';
import { CardProps } from 'components/Card';

export function ProductModelToCardProps(product: Product): CardProps {
  return {
    captionSlot: product.productCategory.title,
    contentSlot: product.price,
    description: product.description,
    image: product.images[0].formats.small.url,
    title: product.title,
  };
}
