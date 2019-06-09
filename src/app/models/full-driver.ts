import { Location } from './location';

export class FullDriver {
  id: number;
  userId: number;
  currentLocation: Location;
  ratings: any;
  status: string;
  suggestions: any;
  enabledToDrive: boolean;
  createdAt: Date;
  updatedAt: Date;
  drivingRecordImage: string;
  policyImage: string;
  transportImage: string;
}
