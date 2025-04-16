export type GetProductListParams = {
  title?: string;
  page: number;
};

export interface IProductListStore {
  getProductsList(params: GetProductListParams): Promise<void>;
}
