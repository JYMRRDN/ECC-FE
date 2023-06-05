import {Component, Injectable, Input, OnInit} from '@angular/core';
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MockEmployees} from "../mock-employees";
import {Observable} from "rxjs";
import {NgFor, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";
import {TicketService} from "../ticket.service";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule
  ],
})

export class EmployeesComponent implements OnInit{
  departments :any = [
    {id: 1, name: 'ADMIN'},
    {id: 2, name: 'IT'},
    {id: 3, name: 'HR'},
    {id: 4, name: 'SALES'}
  ]
  title = 'Employees';
  employees: Employee[] = [];
  newEmployee: Employee = {
    id: 0,
    employeeNo: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    department: ""
  };
  selectedEmployee?: Employee;
  editEmployee? = this.selectedEmployee;
  displayedColumns = ['id', 'employeeNo', 'firstName', 'middleName', 'lastName', 'department', 'action'];
  dataSource: any;
  clickedRows = new Set<Employee>();

  constructor(
    private employeeService: EmployeeService,
    private ticketService: TicketService,
    private dialog: MatDialog
    ) {
  }
  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(employees => {
      // EmployeesComponent.employees = employees;
      this.dataSource = new MatTableDataSource(employees)
    })
  }

  addEmployee() {
    // console.log(this.newEmployee)
    // this.openDialog('Add');
    this.employeeService.isAdd = true;
    this.dialog.open(EmployeeDialogComponent, {
      data: {
        title: 'Add Employee',
        employee: this.newEmployee
      }
    })
    // this.employeeService.addEmployee(this.newEmployee).subscribe(
    //   employee => {
    //     this.employees.push(employee)
    //   }
    // );
  }

  updateEmployee(selectedEmployee: Employee) {
    // this.onSelect(employee)
    this.employeeService.isAdd = false;
    // console.log(selectedEmployee)
    this.dialog.open(EmployeeDialogComponent, {
      data: {
        title: 'Edit Employee',
        employee: selectedEmployee
      }
    })
  }
  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe(_=> this.ngOnInit());
  }

}

