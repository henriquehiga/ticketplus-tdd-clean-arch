import { TicketPayload } from "./ticket-payload";

export interface ITicket {
  id: string;
  authCode: string;
  payload: TicketPayload;
}
