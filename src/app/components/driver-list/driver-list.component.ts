import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Observable, of as observableOf, pipe} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { DriversService } from "../../services/drivers.service";
import { DriversApi } from '../../models/drivers-api';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})

export class DriverListComponent implements OnInit {
  resultsLength: number;
  isLoading: boolean = false;
  fetchDriversPipe: any;
  drivers: Driver[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private driversService: DriversService, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchDriversPipe = pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.driversService.getDrivers(this.paginator.pageIndex);
      }),
      map((driversApi: DriversApi) => {
        this.isLoading = false;
        this.resultsLength = driversApi.total;

        driversApi.pageContents = driversApi.pageContents.map((driver) => {
          driver.summary = driversApi.summaries[driver.driverData.id];
          return driver
        });

        return driversApi.pageContents;
      }),
      catchError(() => {
        // TODO: Handle error.
        this.isLoading = false;
        return observableOf([]);
      })
    );

    this.fetchDriversPipe(this.paginator.page).subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  onToggleEnabledClick(id: number, enabled: boolean) {
    this.fetchDriversPipe(
      this.driversService.updateDriverEnabled(id, enabled)
    ).subscribe(drivers => {
      this.openSnackBar('Actualizado con éxito');
      this.drivers = drivers;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
