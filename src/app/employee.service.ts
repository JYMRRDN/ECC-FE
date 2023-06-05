import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Employee} from "./employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public isAdd = true;

  constructor(
    private http: HttpClient
  ) {}

  private baseURL = 'url/api/employee';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'text'})
  };
  getEmployees(): Observable<Employee[]> {
      const url = `${this.baseURL}/all`;
      return this.http.get<Employee[]>(url).pipe();
  }

  getEmployeeByEmployeeNo(employeeNo: number): Observable<Employee> {
    const url = `${this.baseURL}/find/${employeeNo}`;
    return this.http.get<Employee>(url).pipe()
  }

  addEmployee(employee: any): Observable<Employee> {
    const url = `${this.baseURL}/add`;
    return this.http.post<Employee>( url, employee, this.httpOptions).pipe();
  }

  updateEmployee(employee: any) :Observable<any> {
    const url = `${this.baseURL}/update/${employee.id}`
    return this.http.patch(url, employee, this.httpOptions).pipe()
  }

  deleteEmployee(id: number) {
    const url = `${this.baseURL}/delete/${id}`;
    return this.http.delete(url, {headers: this.httpOptions.headers, responseType: 'text'}).pipe();
  }

  assignEmployeeToTicket(ticketId: number, employeeNo: number){
    const url = `${this.baseURL}/assign/employee_to_ticket/${ticketId}?employeeNo=${employeeNo}`
    return this.http.patch(url, {params: employeeNo}, {headers: this.httpOptions.headers, responseType: 'text'}).pipe()
  }

}
