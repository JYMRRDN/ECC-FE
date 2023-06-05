import {Component, OnInit} from '@angular/core';
import {Ticket} from "../ticket";
import {TicketService} from "../ticket.service";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "../employee";
import {MatTableDataSource} from "@angular/material/table";
import {TicketDialogComponent} from "../ticket-dialog/ticket-dialog.component";
import {tick} from "@angular/core/testing";
import {EmployeeService} from "../employee.service";
import {AssignTicketDialogComponent} from "../assign-ticket-dialog/assign-ticket-dialog.component";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{

  title: 'Tickets';
  employees: Employee[] = []
  tickets: Ticket[] = [];
  newTicket: Ticket = {
    id: 0,
    title: '',
    description: '',
    severity: '',
    status: '',
    assignee: null,
    watchers: []
  };
  displayedColumns = ['id', 'title', 'description', 'severity', 'status', 'assignee', 'watchers', 'action'];
  dataSource: any;
  clickedRows = new Set<Ticket>();

  constructor(
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getTickets();
    this.getEmployees();
  }

  getTickets(){
    this.ticketService.getTickets().subscribe(tickets => {
      this.dataSource = new MatTableDataSource(tickets)
      console.log(tickets)
    })
  }

  createTicket(){
    this.ticketService.isCreate = true;
    this.dialog.open(TicketDialogComponent, {
      data: {
        title: 'Create Ticket',
        ticket: this.newTicket
      }
    })
  }

  updateTicket(selectedTicket: Ticket) {
    this.ticketService.isCreate = false;
    this.dialog.open(TicketDialogComponent, {
      data: {
        title: 'Edit Ticket',
        ticket: selectedTicket
      }
    })
  }

  displayWatchers(watchers: any[]) {
    return watchers.map(x => x.employeeNo).join(',')
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(employees=>{
      this.employees = employees
    })
  }

  assignTicketToEmployee(selectedTicket: Ticket) {
    this.getEmployees()
    this.ticketService.forAssignee = true;
    console.log(selectedTicket.assignee);
    this.dialog.open(AssignTicketDialogComponent, {
      data: {
        title: 'Assign Ticket',
        ticket: selectedTicket,
        employees: this.employees
      }
    })
  }

  assignWatchersToTicket(selectedTicket: Ticket){
    this.getEmployees()
    this.ticketService.forAssignee = false;
    if(selectedTicket.assignee != null){
      this.employees = this.employees.filter(x => x.employeeNo != selectedTicket.assignee.employeeNo)
    }
    this.dialog.open(AssignTicketDialogComponent, {
      data: {
        title: 'Assign Watchers',
        ticket: selectedTicket,
        employees: this.employees
      }
    })
  }


  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe(_=> this.ngOnInit())
  }
}
