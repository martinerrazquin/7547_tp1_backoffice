import { Location } from './location';

export class Driver {
  id: number;
  userId: number;
  currentLocation: Location;
  ratings: any;
  status: string;
  suggestions: any;
  enabledToDrive: boolean;
  createdAt: Date;
  updatedAt: Date;
}