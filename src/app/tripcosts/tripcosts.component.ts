import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  costsForm: FormGroup;

  constructor(private tripCostsService: TripcostsService) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.tripCostsService.getData().subscribe(
      (tripCosts) => {
        this.initData(tripCosts);
        this.initForm();
      }
    );
  }

  initData(tripCosts: TripCost): void {
    this.tripCosts = tripCosts;
    this.newTripCosts = cloneDeep(tripCosts);
  }

  initForm(): void {
    this.costsForm = new FormGroup({
      k1: new FormControl(
        this.newTripCosts.k1,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      k2: new FormControl(
        this.newTripCosts.k2,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      k3: new FormControl(
        this.newTripCosts.k3,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      k4: new FormControl(
        this.newTripCosts.k4,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      k5: new FormControl(
        this.newTripCosts.k5,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),
      k6: new FormControl(
        this.newTripCosts.k6,
        [
          Validators.required,
          Validators.min(0)
        ]
      )
    });
  }

  getErrorMsg(control) {
    if (control.hasError('required')) { return 'Debe completarse el campo'; }
    if (control.hasError('min')) { return 'No puede ser negativo'; }
    return '';
  }

  onSubmit() {
    // @ts-ignore
    console.warn(this.costsForm.value);
  }

}
