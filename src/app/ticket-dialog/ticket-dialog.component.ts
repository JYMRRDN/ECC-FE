import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TicketService} from "../ticket.service";

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit{

  title: string;
  severities :any = [
    {id: 1, name: 'LOW'},
    {id: 2, name: 'NORMAL'},
    {id: 3, name: 'MAJOR'},
    {id: 4, name: 'CRITICAL'}
  ]
  statuses :any = [
    {id: 1, name: 'NEW'},
    {id: 2, name: 'ASSIGNED'},
    {id: 3, name: 'INPROGRESS'},
    {id: 4, name: 'CLOSED'}
  ]

  form: FormGroup
  ticketData: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketData = this.data.ticket
    this.title = this.data.title
    this.form = this.fb.group({
      title: this.fb.control(this.ticketData.title),
      description: this.fb.control(this.ticketData.description),
      severity: this.fb.control(this.ticketData.severity),
      status: this.fb.control(this.ticketService.isCreate? 0 : this.ticketData.status)
    })
  }


  save() {
    this.ticketService.createTicket(this.form.value).subscribe(_=>{
      console.log(this.ticketData)
    })
    this.close()
  }

  update() {
    if(!this.ticketService.isCreate){
      this.form.value.id = this.data.ticket.id;
      this.form.value.assignee = this.data.ticket.assignee;
      this.form.value.watchers = this.data.ticket.watchers;
    }
    this.ticketService.updateTicket(this.form.value).subscribe(_=>{
      console.log(this.form.value)
    })
    this.close()
  }

  close(){
    this.dialogRef.close()
  }

}
