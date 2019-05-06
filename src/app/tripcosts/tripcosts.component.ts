import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TripcostsService } from '../tripcosts.service';
import { TripCost } from '../tripcost';

import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tripcosts',
  templateUrl: './tripcosts.component.html',
  styleUrls: ['./tripcosts.component.scss']
})
export class TripcostsComponent implements OnInit {

  tripCosts: TripCost;
  newTripCosts: TripCost;
  costsForm: FormGroup;
  costsFormData: any;
  objectKeys = Object.keys;

  constructor(
    private tripCostsService: TripcostsService, 
    private snackBar: MatSnackBar
  ) { }

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
    var validations = [ Validators.required, Validators.min(0) ];
    this.costsFormData = {
      k1: new FormControl(this.newTripCosts.k1, validations),
      k2: new FormControl(this.newTripCosts.k2, validations),
      k3: new FormControl(this.newTripCosts.k3, validations),
      k4: new FormControl(this.newTripCosts.k4, validations),
      k5: new FormControl(this.newTripCosts.k5, validations),
      k6: new FormControl(this.newTripCosts.k6, validations)
    };
    this.costsForm = new FormGroup(this.costsFormData);
  }

  getErrorMsg(control) {
    if (control.hasError('required')) { return 'Debe completarse el campo'; }
    if (control.hasError('min')) { return 'No puede ser negativo'; }
    return '';
  }

  onSubmit() {
    this.tripCostsService.updateData(this.costsForm.value).subscribe(
      (tripCosts) => {
        this.openSnackBar('Actualizado con éxito');
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
