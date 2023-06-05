import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {EmployeesComponent} from "../employees/employees.component";

export interface EmployeeData {
  firstName: string,
  middleName: string,
  lastName: string,
  department: string
}

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit{
  employeeData: Employee;
  public title: string;
  departments :any = [
    {id: 1, name: 'ADMIN'},
    {id: 2, name: 'IT'},
    {id: 3, name: 'HR'},
    {id: 4, name: 'SALES'}
  ]
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef : MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    protected employeeService: EmployeeService
  ) {}

  ngOnInit() {
    console.log(this.data.employee)
    this.employeeData = this.data.employee;
    this.title = this.data.title;
    this.form = this.fb.group({
      employeeNo: this.fb.control(this.data.employee.employeeNo == 0 ? '': this.data.employee.employeeNo),
      firstName: this.fb.control(this.data.employee.firstName),
      middleName: this.fb.control(this.data.employee.middleName),
      lastName: this.fb.control(this.data.employee.lastName),
      department: this.fb.control(this.data.employee.department)
    })

  }

  save() {
    // console.log(this.form.value);
    // this.employeeService.addEmployee(this.form.value).subscribe( employee => {
    //   EmployeesComponent.employees.push(employee);
    //   this.close();
    // })
    this.employeeService.addEmployee(this.form.value).subscribe(_ => {
      console.log(this.form.value)
    })
    this.closeDialog()
  }

  update() {
    if(!this.employeeService.isAdd){
      this.form.value.id = this.data.employee.id
    }
    this.employeeService.updateEmployee(this.form.value).subscribe(_ => {
      console.log(this.form.value)
    })
    this.closeDialog()
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
