import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


import { TripcostsService } from '../tripcosts.service';
import { TripCost} from '../tripcost';

import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tripcosts',
  templateUrl: './tripcosts.component.html',
  styleUrls: ['./tripcosts.component.css']
})
export class TripcostsComponent implements OnInit {

  tripCosts: TripCost;
  newTripCosts: TripCost;
  control: FormControl;

  constructor(private tripCostsService: TripcostsService) { }

  ngOnInit() {
    this.getTripCosts();
    this.initControl();
  }

  getTripCosts(): void {
    this.tripCostsService.getData().subscribe(
      (tripCosts) => { this.tripCosts = tripCosts; this.newTripCosts = cloneDeep(tripCosts); }
    );
  }

  initControl(): void {
    this.control = new FormControl('', [Validators.required, Validators.min(0)]);
  }

  getErrorMsg() {
    if (this.control.hasError('required')) { return 'Debe completarse el campo'; }
    if (this.control.hasError('min')) { return 'No puede ser negativo'; }
    return '';
  }

}
