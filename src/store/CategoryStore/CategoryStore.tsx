import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';

import { ICategoryStore } from './types';
import { Meta } from '../../utils/meta';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { API_URL } from '../../pages/ProductCard/constants/api';
import { CategoryItemModel } from '../models/categoryItem';

type PrivateFields = '_list' | '_meta';

import { reaction, IReactionDisposer } from 'mobx';

export default class CategoryStore implements ICategoryStore, ILocalStore {
  private readonly _apiStore = new ApiStore(API_URL);
  private _list: CategoryItemModel[] = [];
  private _meta: Meta = Meta.initial;

  private _disposer: IReactionDisposer | null = null;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      reset: action,
      getCategoryList: action,
    });

    this._disposer = reaction(
      () => this._list,
      () => {}
    );
  }

  get list(): CategoryItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoryList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const response = await this._apiStore.request<CategoryItemModel[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/categories`,
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
    if (this._disposer) {
      this._disposer();
    }
  }
}
