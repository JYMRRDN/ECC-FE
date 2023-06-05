import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AlertModule } from "ngx-bootstrap/alert";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { AssignTicketDialogComponent } from './assign-ticket-dialog/assign-ticket-dialog.component';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDialogComponent,
    TicketsComponent,
    TicketDialogComponent,
    AssignTicketDialogComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    EmployeesComponent,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeDialogComponent]
})
export class AppModule { }
