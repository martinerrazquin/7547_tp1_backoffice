import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import { DriversService } from "../../services/drivers.service";
import {FullDriver} from "../../models/full-driver";

@Component({
  selector: 'app-driver-images',
  templateUrl: './driver-images.component.html',
  styleUrls: ['./driver-images.component.scss']
})
export class DriverImagesComponent implements OnInit {

  driverId: number;
  showingWhich: number;
  driverData: FullDriver;
  isLoading: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private driversService: DriversService) { }

  ngOnInit() {
    this.driverId = this.data.id;
    this.driversService.getDriverImages(this.driverId).subscribe(
      (fullDriverData) => {
        this.driverData = fullDriverData;
        this.isLoading = false;
        console.log(this.driverData); //DEBUG
      }
    )
  }

  onShowPicClick(which: number): void {
    this.showingWhich = which;
  }

}
