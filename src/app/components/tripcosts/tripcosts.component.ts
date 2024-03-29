import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TripcostsService } from '../../services/tripcosts.service';
import { TripCost } from '../../models/tripcost';

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
      k1: { displayName: "$/km chicas", control: new FormControl(this.newTripCosts.k1, validations) },
      k2: { displayName: "$/km medianas", control: new FormControl(this.newTripCosts.k2, validations) },
      k3: { displayName: "$/km grandes", control: new FormControl(this.newTripCosts.k3, validations) },
      k4: { displayName: "$/km acompañante", control: new FormControl(this.newTripCosts.k4, validations) },
      k5: { displayName: "Multiplicador", control: new FormControl(this.newTripCosts.k5, validations) },
      k6: { displayName: "Bajada de bandera", control: new FormControl(this.newTripCosts.k6, validations) }
    };

    var formControls = {};
    for (let key of Object.keys(this.costsFormData)) {
      formControls[key] = this.costsFormData[key].control;
    }

    this.costsForm = new FormGroup(formControls);
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
