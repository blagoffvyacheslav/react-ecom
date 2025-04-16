import { IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import qs from 'qs';

export class QueryParamsStore {
  private _title: string = '';
  private _category: string = '';
  private _page: number = 1;

  private _disposer: IReactionDisposer | null = null;

  constructor(initialSearch: string, onQueryChange: (newSearch: string) => void) {
    makeAutoObservable(this);

    const params = qs.parse(initialSearch, { ignoreQueryPrefix: true });
    if (typeof params.title === 'string') this._title = params.title;
    if (typeof params.category === 'string') this._category = params.category;
    if (!isNaN(Number(params.page))) this._page = Number(params.page);

    this._disposer = reaction(
      () => this.queryParams,
      (query) => {
        const newSearch = qs.stringify(query);
        onQueryChange(newSearch); // передаём наверх, в компонент
      }
    );
  }

  get queryParams() {
    return {
      ...(this._title && { title: this._title }),
      ...(this._category && { category: this._category }),
      ...(this._page !== 1 && { page: this._page }),
    };
  }

  get title(): string {
    return this._title;
  }

  get category(): string {
    return this._category;
  }

  get page(): number {
    return this._page;
  }

  set title(value: string) {
    this._title = value;
    this._page = 1;
  }

  set category(value: string) {
    this._category = value;
    this._page = 1;
  }

  set page(value: number) {
    this._page = value;
  }

  reset(): void {
    this._page = 1;
    this._title = '';
    this._category = ''
  }

  destroy(): void {
    this.reset();
    if (this._disposer) {
      this._disposer();
    }
  }
}
