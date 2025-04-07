import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';

import { IProductStore, GetProductListParams } from './types';
import { Meta } from '../../utils/meta';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { API_URL } from '../../pages/ProductCard/constants/api';
import { ProductItemModel } from '../models/productItem';

type PrivateFields = '_list' | '_meta';

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _apiStore = new ApiStore(API_URL);
  private _list: ProductItemModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      reset: action,
      getProductsList: action,
    });
  }

  get list(): ProductItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(params: GetProductListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const response = await this._apiStore.request<ProductItemModel[]>({
      method: HTTPMethod.GET,
      data: { ...params },
      headers: {},
      endpoint: `/products`,
    });

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._list = response.data;
        return;
      }

      this._meta = Meta.error;
    });
  }

  reset(): void {
    this._list = [];
    this._meta = Meta.initial;
  }

  destroy(): void {
    this.reset();
  }
}
