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