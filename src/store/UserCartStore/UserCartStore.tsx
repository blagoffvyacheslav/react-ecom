import { Product } from '@pages/ProductDetailedPage/constants/product';
import { makeAutoObservable, runInAction } from 'mobx';

const STORAGE_KEY = 'user-cart';

export class UserCartStore {
  checkout(address: string, paymentMethod: string): void {
    // Логика оформления заказа
    console.log('Order submitted:', this._items, address, paymentMethod);
    this.clear();
  }

  private _items: Map<Product, number> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  get items(): Map<Product, number> {
    return this._items;
  }

  get lastItems(): [Product, number][] {
    if (!this._items) return [];
    return Array.from(this._items.entries()).slice(-3).reverse();
  }

  get quantity(): number {
    return Array.from(this._items.values()).reduce((a, b) => a + b, 0);
  }

  get total(): number {
    let sum = 0;
    for (const [product, qty] of this._items.entries()) {
      sum += product.price * qty;
    }
    return sum;
  }

  addItem(product: Product, quantity: number = 1): void {
    let existingEntry: Product | undefined;

    for (const key of this._items.keys()) {
      if (key.id === product.id) {
        existingEntry = key;
        break;
      }
    }

    if (existingEntry) {
      const currentQty = this._items.get(existingEntry) ?? 0;
      this._items.set(existingEntry, currentQty + quantity);
    } else {
      this._items.set(product, quantity);
    }

    this.saveToLocalStorage();
  }

  removeItem(product: Product): void {
    for (const key of this._items.keys()) {
      if (key.id === product.id) {
        this._items.delete(key);
        this.saveToLocalStorage();
        break;
      }
    }
  }

  setItemQuantity(product: Product, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(product);
    } else {
      for (const key of this._items.keys()) {
        if (key.id === product.id) {
          this._items.set(key, quantity);
          this.saveToLocalStorage();
          break;
        }
      }
    }
  }

  clear(): void {
    this._items.clear();
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    const array = Array.from(this._items.entries()).map(
      ([product, quantity]) => ({
        product,
        quantity,
      })
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
  }

  private loadFromLocalStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: { product: Product; quantity: number }[] = JSON.parse(raw);

      const restored = new Map<Product, number>();
      for (const { product, quantity } of parsed) {
        restored.set(product, quantity);
      }

      runInAction(() => {
        this._items = restored;
      });
    } catch (e) {
      console.error('An error occured when uploaded from localStorage', e);
    }
  }
}

export const userCartStore = new UserCartStore();
