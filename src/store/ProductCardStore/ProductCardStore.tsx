import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';

import { IProductCardStore, GetProductCardParams } from './types';
import { Meta } from '../../utils/meta';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { API_URL } from '../../pages/ProductCard/constants/api';
import { ProductItemModel } from '../models/productItem';

type PrivateFields = '_item' | '_meta';

export default class ProductCardStore
  implements IProductCardStore, ILocalStore
{
  private readonly _apiStore = new ApiStore(API_URL);
  private _item: ProductItemModel | null = null;
  private _meta: Meta = Meta.initial;

  private _disposer: IReactionDisposer | null = null;

  constructor() {
    makeObservable<ProductCardStore, PrivateFields>(this, {
      _item: observable,
      _meta: observable,
      item: computed,
      meta: computed,
      reset: action,
      getProductCard: action,
    });
    this._disposer = reaction(
      () => this._item,
      () => {}
    );
  }

  get item(): ProductItemModel | null {
    return this._item;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductCard(params: GetProductCardParams): Promise<void> {
    this._meta = Meta.loading;
    this._item = null;

    const response = await this._apiStore.request<ProductItemModel>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/products/${params.productId}`,
    });

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._item = response.data;
        return;
      }

      this._meta = Meta.error;
    });
  }

  reset(): void {
    this._item = null;
    this._meta = Meta.initial;
  }

  destroy(): void {
    this.reset();
    if (this._disposer) {
      this._disposer();
    }
  }
}
