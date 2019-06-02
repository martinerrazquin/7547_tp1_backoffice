import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatButton, MatSlideToggle} from '@angular/material';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FormGroup, FormControl} from '@angular/forms';

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
    'date',
    'status',
    'client',
    'driver',
    'origin',
    'destination',
    'actions'
  ];

  filterControls = {
    driverName: new FormControl(''),
    showOnlyCurrent: new FormControl(false)
  };
  filtersForm = new FormGroup(this.filterControls);

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

    merge(
      this.btnClicks,
      this.filtersForm.valueChanges
    ).subscribe(() => this.paginator.pageIndex = 0);

    merge(
      this.filtersForm.valueChanges, 
      this.btnClicks, 
      this.paginator.page
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.tripsService.getTrips(this.paginator.pageIndex, this.filtersForm.value);
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
