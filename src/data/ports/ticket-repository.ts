import { Ticket } from "@/application/dto/ticket";

export interface TicketRepository {
  save(data : Ticket): Promise<void>;
  getById(id:string): Promise<Ticket | null>
}