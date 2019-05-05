import { Component, OnInit } from '@angular/core';

import { TripcostsService } from '../tripcosts.service';
import { TripCost} from '../tripcost';

@Component({
  selector: 'app-tripcosts',
  templateUrl: './tripcosts.component.html',
  styleUrls: ['./tripcosts.component.css']
})
export class TripcostsComponent implements OnInit {

  tripCosts: TripCost;
  newTripCosts: TripCost;

  constructor(private tripCostsService: TripcostsService) { }

  ngOnInit() {
    this.getTripCosts();
  }

  getTripCosts(): void {
    this.tripCostsService.getData().subscribe(
      (tripCosts) => { this.tripCosts = tripCosts; this.newTripCosts = tripCosts; }
    );
  }
}
