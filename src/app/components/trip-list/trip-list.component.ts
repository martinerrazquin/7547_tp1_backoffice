import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatButton} from '@angular/material';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
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
    'destination',
    'actions'
  ];
  resultsLength: number;
  isLoading: boolean = false;
  dataSource: MatTableDataSource<Trip>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('reload') reloadButton: MatButton;
  btnClicks: Observable<any>;

  constructor(private tripsService: TripsService) { 
  }

  ngOnInit() {
    this.btnClicks = fromEvent(this.reloadButton._elementRef.nativeElement, 'click');

    this.btnClicks.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.btnClicks, this.paginator.page)
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
