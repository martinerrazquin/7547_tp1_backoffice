import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatButton} from '@angular/material';
import {merge, Observable, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { TripcostsService } from "../../services/tripcosts.service";
import { TripcostsApi } from '../../models/trip-costs-api';
import { TripCost } from '../../models/tripcost';

@Component({
  selector: 'app-trip-cost-history',
  templateUrl: './trip-cost-history.component.html',
  styleUrls: ['./trip-cost-history.component.scss']
})
export class TripCostHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'date', 
    'k1', 
    'k2', 
    'k3', 
    'k4', 
    'k5',
    'k6'
  ];
  resultsLength: number;
  isLoading: boolean = false;
  dataSource: MatTableDataSource<TripCost>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('reload') reloadButton: MatButton;
  btnClicks: Observable<any>;

  constructor(private tripcostsService: TripcostsService) { }

  ngOnInit() {
    this.btnClicks = fromEvent(this.reloadButton._elementRef.nativeElement, 'click');

    this.btnClicks.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.btnClicks, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.tripcostsService.getHistory(this.paginator.pageIndex);
        }),
        map((tripcostsApi: TripcostsApi) => {
          this.isLoading = false;
          this.resultsLength = tripcostsApi.total;

          return tripcostsApi.pageContents;
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
