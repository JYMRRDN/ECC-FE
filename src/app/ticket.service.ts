import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "./ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public isCreate = true;
  public forAssignee = true;
  constructor(private http: HttpClient) { }

  private baseURL = 'url/api/ticket';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'text'})
  };

  getTickets(): Observable<Ticket[]> {
    const url =  `${this.baseURL}/all`;
    return this.http.get<Ticket[]>(url).pipe();
  }

  getTicketById(id: number): Observable<Ticket>{
    const url = `${this.baseURL}/find/${id}`;
    return this.http.get<Ticket>(url).pipe()
  }

  assignTicketToEmployee(ticketId: number, employeeNo: number) {
    const url= `${this.baseURL}/assign/employee_to_ticket/${ticketId}?employeeNo=${employeeNo}`;
    return this.http.patch(url, {headers: this.httpOptions.headers, responseType:'text'}).pipe()
  }

  assignWatchersToTicket(ticketId: number, employeeNosDto: any) {
    const url = `${this.baseURL}/assign/watchers_to_ticket/${ticketId}`;
    return this.http.patch(url, employeeNosDto, {headers: this.httpOptions.headers, responseType: 'text'}).pipe()
  }

  createTicket(ticket: any) {
    const url = `${this.baseURL}/create`;
    return this.http.post<Ticket>(url, ticket, this.httpOptions).pipe()
  }

  updateTicket(ticket: any) :Observable<any> {
    const url = `${this.baseURL}/update/${ticket.id}`
    return this.http.patch(url, ticket, this.httpOptions).pipe()
  }

  deleteTicket(id: number) {
    const url = `${this.baseURL}/delete/${id}`
    return this.http.delete(url, {headers: this.httpOptions.headers, responseType:'text'}).pipe()
  }
}
