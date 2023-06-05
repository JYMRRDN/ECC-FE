import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TicketService} from "../ticket.service";
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {MatListOption, MatSelectionListChange} from "@angular/material/list";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-assign-ticket-dialog',
  templateUrl: './assign-ticket-dialog.component.html',
  styleUrls: ['./assign-ticket-dialog.component.css']
})
export class AssignTicketDialogComponent implements OnInit{
  title: string
  form: FormGroup
  employees: Employee[] = this.data.employees
  watchers = {
    employeeNos: [0]
  }
  ticketData: any
  selected: number[]

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any,
    protected ticketService: TicketService,
    protected employeeService: EmployeeService
    ) {}

  ngOnInit(): void {
    this.title = this.data.title
    this.ticketData = this.data.ticket
    this.form = this.fb.group({
      assignee: this.fb.control(this.ticketData.assignee == null ? 0 : this.ticketData.assignee),
      watchers: this.fb.control('')
    })
  }

  assign(){
    console.log(this.form.value)
    this.ticketService.assignTicketToEmployee(this.ticketData.id, this.form.value.assignee.employeeNo).subscribe(_=>{
      console.log(this.form.value.assignee.employeeNo)
    })
    this.close()
  }

  addWatchers() {
    this.ticketService.assignWatchersToTicket(this.ticketData.id, this.watchers).subscribe(_ => {
      console.log(this.watchers)
    })
    this.close()
  }

  close(){
    this.dialogRef.close()
  }

  selectionChanged(event: MatSelectionListChange): void {
    this.watchers.employeeNos = event.source.selectedOptions.selected.map(x => x.value)
    console.log(this.watchers)
  }

}
