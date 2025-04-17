export type GetCategoryListParams = {
  categoryId: number;
};

export interface ICategoryStore {
  getCategoryList(params: GetCategoryListParams): Promise<void>;
}
