import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatButton, MatSlideToggle} from '@angular/material';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FormGroup, FormControl} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import { TripsService } from "../../services/trips.service";
import { TripsApi } from '../../models/trips-api';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  providers: [
    {
      provide: MAT_DATE_FORMATS, 
      useValue: {
        parse: {
          dateInput: 'MM/YYYY',
        },
        display: {
          dateInput: 'MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
  ],
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
    showOnlyCurrent: new FormControl(false),
    month: new FormControl(new Date())
  };
  filtersForm = new FormGroup(this.filterControls);

  resultsLength: number;
  isLoading: boolean = false;
  dataSource: MatTableDataSource<Trip>;

  maxDate: Date = new Date();
  totalMoney: number;

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
        var filters = Object.assign({}, this.filtersForm.value);
        var month = (filters.month.getMonth() + 1);
        var year = filters.month.getFullYear();
        filters.month = String(month).padStart(2, '0') + '/' + year;
        return this.tripsService.getTrips(this.paginator.pageIndex, filters);
      }),
      map((tripsApi: TripsApi) => {
        this.isLoading = false;
        this.resultsLength = tripsApi.total;
        this.totalMoney = tripsApi.totalMoney;

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

  chosenYearHandler(normalizedYear) {
    const ctrlValue = this.filterControls.month.value;
    ctrlValue.setDate(1);
    ctrlValue.setYear(normalizedYear.year());
    this.filterControls.month.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth, datepicker) {
    const ctrlValue = this.filterControls.month.value;
    ctrlValue.setMonth(normalizedMonth.month());
    this.filterControls.month.setValue(ctrlValue);
    datepicker.close();
  }
}
