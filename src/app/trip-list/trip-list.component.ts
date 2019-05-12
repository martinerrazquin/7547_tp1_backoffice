import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

const ELEMENT_DATA = [
  { id: 1, client: 'Rodrigo Zapico', driver: 'Martin Errazquín', origin: 'Carrasco 637', destination: 'Av. Paseo Colón 850' },
  { id: 2, client: 'Agustina Markosich', driver: 'Kaoru Heanna', origin: 'Av. Paseo Colón 850', destination: 'Av. La Plata 231' },
  { id: 3, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 4, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 5, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 6, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 7, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 8, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 9, client: '...', driver: '...', origin: '...', destination: '...' },
  { id: 10, client: '...', driver: '...', origin: '...', destination: '...' },
];

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'client', 'driver', 'origin', 'destination'];
  dataSource: MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { 
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
