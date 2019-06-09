import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/* MATERIAL */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { TripcostsComponent } from './components/tripcosts/tripcosts.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripCostHistoryComponent } from './components/trip-cost-history/trip-cost-history.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';

import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/es-AR';
import { ClientListComponent } from './components/client-list/client-list.component';
registerLocaleData(localeAr);

const appRoutes: Routes = [
  { path: 'trip-costs', component: TripcostsComponent },
  { path: 'trip-costs-history', component: TripCostHistoryComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/details/:id', component: TripDetailsComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TripcostsComponent,
    TripListComponent,
    TripCostHistoryComponent,
    TripDetailsComponent,
    DriverListComponent,
    ClientListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
