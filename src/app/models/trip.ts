import { Location } from './location';
import { DriverTripData } from "./driver-trip-data";

export class Trip {
  id: number;
  clientId: number;
  clientName: string;
  driverId: number;
  driverName: string;
  status: string;
  origin: Location;
  destination: Location;
  bigPetAmount: number;
  petQuantities: any;
  bringsEscort: boolean;
  paymentMethod: string;
  comments: string;
  reservationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  driver: DriverTripData;
}
