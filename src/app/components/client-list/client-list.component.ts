import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Observable, of as observableOf, pipe} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { ClientsService } from "../../services/clients.service";
import { ClientsApi } from "../../models/clients-api";
import { User } from "../../models/user";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  resultsLength: number;
  isLoading: boolean = false;
  fetchClientsPipe: any;
  clients: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientsService: ClientsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchClientsPipe = pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.clientsService.getClients(this.paginator.pageIndex);
      }),
      map((clientsApi: ClientsApi) => {
        this.isLoading = false;
        this.resultsLength = clientsApi.total;

        return clientsApi.pageContents;
      }),
      catchError(() => {
        // TODO: Handle error.
        this.isLoading = false;
        return observableOf([]);
      })
    );

    this.fetchClientsPipe(this.paginator.page).subscribe(clients => {
      this.clients = clients;
    });
  }

  onToggleEnabledClick(id: number, enabled: boolean) {
    this.fetchClientsPipe(
      this.clientsService.updateClientEnabled(id, enabled)
    ).subscribe(clients => {
      this.openSnackBar('Actualizado con éxito');
      this.clients = clients;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
