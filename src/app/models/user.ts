import { Driver } from './driver';

export class User {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  birthDate: Date;
  facebookId: string;
  driverData: Driver;
  createdAt: Date;
  updatedAt: Date;
}

export const NO_USER: User = {
  id: 999,
  name: "",
  address: "",
  phone: "",
  email: "",
  birthDate: new Date,
  facebookId: "",
  driverData: null,
  createdAt: new Date,
  updatedAt: new Date,
};
