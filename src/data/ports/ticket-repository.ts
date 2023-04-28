import { ITicket } from "../../application/dto/ticket";

export interface TicketRepository {
  save(data: ITicket): Promise<void>;
  getById(id: string): Promise<ITicket | null>;
  useTicket(id: string): Promise<void>;
}
