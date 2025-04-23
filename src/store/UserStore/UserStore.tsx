// @store/UserStore.ts
import { makeAutoObservable } from 'mobx';

class UserStore {
  firstName = '';
  lastName = '';
  email = '';
  address = {
    zip: '',
    street: '',
    house: '',
    apartment: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFirstName = (val: string) => (this.firstName = val);
  setLastName = (val: string) => (this.lastName = val);
  setEmail = (val: string) => (this.email = val);

  setZip = (val: string) => (this.address.zip = val);
  setStreet = (val: string) => (this.address.street = val);
  setHouse = (val: string) => (this.address.house = val);
  setApartment = (val: string) => (this.address.apartment = val);

  save = () => {};
}

export const userStore = new UserStore();
