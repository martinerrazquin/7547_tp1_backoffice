import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { TripsService } from "../../services/trips.service";
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => 
        this.tripsService.getTrip(params.get('id'))
      )
    ).subscribe((trip) => {
      this.trip = trip;
      this.isLoading = false;
      console.log(this.trip);
    });
  }

}
