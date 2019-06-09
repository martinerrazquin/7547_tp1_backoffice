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
  driverName: string;
  driverData: FullDriver;
  isLoading: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private driversService: DriversService) {
  }

  ngOnInit() {
    this.driverId = this.data.driverData.id;
    this.driverName = this.data.name;
    this.driversService.getDriverImages(this.driverId).subscribe(
      (fullDriverData) => {
        this.driverData = fullDriverData;
        this.isLoading = false;
      }
    )
  }

  htmlForImage(img64: string): string {
    return `<img
      src="data:image/jpeg;base64, ${img64}"
      style="max-width: 100%; max-height: 100%; object-fit: contain;"
      />`;
  }

}
