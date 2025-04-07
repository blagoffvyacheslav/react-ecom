export type GetProductListParams = {
  title?: string;
};

export interface IProductStore {
  getProductsList(params: GetProductListParams): Promise<void>;
}
