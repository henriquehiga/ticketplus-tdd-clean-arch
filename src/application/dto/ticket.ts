import { TicketPayload } from "./ticket-payload";

export interface Ticket {
  id : string;
  authCode : string;
  payload : TicketPayload;
}