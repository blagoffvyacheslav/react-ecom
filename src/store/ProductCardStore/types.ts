export type GetProductCardParams = {
  productId: string;
};

export interface IProductCardStore {
  getProductCard(params: GetProductCardParams): Promise<void>;
}
