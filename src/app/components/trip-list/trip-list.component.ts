import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { TripsService } from "../../services/trips.service";
import { TripsApi } from '../../models/trips-api';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'status', 
    'client', 
    'driver', 
    'origin', 
    'destination'
  ];
  resultsLength: number = 100;
  isLoading: boolean = false;
  dataSource: MatTableDataSource<Trip>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tripsService: TripsService) { 
  }

  ngOnInit() {
    this.tripsService.getTrips(this.paginator.pageIndex)
    .subscribe((tripsApi: TripsApi) => {
      this.dataSource = new MatTableDataSource(tripsApi.pageContents);
    });

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.tripsService.getTrips(this.paginator.pageIndex);
        }),
        map((tripsApi: TripsApi) => {
          this.isLoading = false;
          this.resultsLength = tripsApi.total;

          return tripsApi.pageContents;
        }),
        catchError(() => {
          // TODO: Handle error.
          this.isLoading = false;
          return observableOf([]);
        })
      ).subscribe(trips => 
        this.dataSource = new MatTableDataSource(trips)
      );
  }

}
