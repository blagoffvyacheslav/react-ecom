export type GetProductDetailedParams = {
  productId: string;
};

export interface IProductDetailedStore {
  getProductDetailed(params: GetProductDetailedParams): Promise<void>;
}
