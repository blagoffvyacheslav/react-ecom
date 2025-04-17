export type Category = {
  id: number;
  title: string;
};

export type Image = {
  url: string;
};

export type ImageFormat = {
  large: Image;
  small: Image;
  medium: Image;
};

export type Images = {
  id: number;
  formats: ImageFormat;
};

export type Product = {
  productCategory: Category;
  description: string;
  id: number;
  documentId: string;
  images: Images[];
  price: number;
  title: string;
};
