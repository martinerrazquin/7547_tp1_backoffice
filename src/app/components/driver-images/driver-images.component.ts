import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-driver-images',
  templateUrl: './driver-images.component.html',
  styleUrls: ['./driver-images.component.scss']
})
export class DriverImagesComponent implements OnInit {

  driverId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.driverId = this.data.id;
  }

}
