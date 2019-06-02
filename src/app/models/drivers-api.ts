import { User } from './user';
import { DriverSummary } from './driver-summary'

export class DriversApi {
  pageContents: User[];
  summaries: DriverSummary[];
  total: number;
}