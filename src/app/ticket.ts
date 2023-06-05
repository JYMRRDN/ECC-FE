import {Employee} from "./employee";

export interface Ticket {
  id: number,
  title: string,
  description: string,
  severity: string,
  status: string,
  assignee: any,
  watchers: Employee[]
}
