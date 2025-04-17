import { ILocalStore } from '@store/interfaces/ILocalStore';
import ApiStore from '@store/ApiStore';
import { HTTPMethod } from '@store/ApiStore/types';

import { IProductListStore, GetProductListParams } from './types';
import { Meta } from '@utils/meta';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { API_URL } from '@pages/ProductDetailedPage/constants/api';
import { Pagination, ProductItemModel } from '../models/productItem';

const emptyPagination = { pageCount: 0, pageSize: 0, total: 0, page: 1 };

type PrivateFields = '_list' | '_meta' | '_info';

export default class ProductsListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiStore = new ApiStore(API_URL);
  private _list: ProductItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _info: Pagination = emptyPagination;

  private _disposer: IReactionDisposer | null = null;

  constructor() {
    makeObservable<ProductsListStore, PrivateFields>(this, {
      _list: observable.ref,
      _info: observable.ref,
      _meta: observable,
      info: computed,
      list: computed,
      meta: computed,
      reset: action,
      getProductsList: action,
    });
    this._disposer = reaction(
      () => [this._list, this._info],
      () => {}
    );
  }

  get list(): ProductItemModel[] {
    return this._list;
  }

  get info(): Pagination {
    return this._info;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(params: GetProductListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];
    this._info = emptyPagination;

    const response = await this._apiStore.request<
      ProductItemModel[],
      { pagination: Pagination }
    >({
      method: HTTPMethod.GET,
      data: {
        'filters[title][$containsi]': params.title,
        'filters[productCategory][id][$eq]': params.categoryId,
        'filters[id][$ne]': params.excludeId,
        'populate[0]': 'images',
        'populate[1]': 'productCategory',
        'pagination[page]': params.page,
        'pagination[pageSize]': params.pageSize,
      },
      headers: {},
      endpoint: `/products`,
    });

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._list = response.data;
        this._info = response.meta.pagination;
        return;
      }

      this._meta = Meta.error;
    });
  }

  reset(): void {
    this._list = [];
    this._meta = Meta.initial;
    this._info = emptyPagination;
  }

  destroy(): void {
    this.reset();
    if (this._disposer) {
      this._disposer();
    }
  }
}
