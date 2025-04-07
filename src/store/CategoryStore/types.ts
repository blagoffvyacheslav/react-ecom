export type GetCategoryListParams = {
  category: string;
};

export interface ICategoryStore {
  getCategoryList(params: GetCategoryListParams): Promise<void>;
}
