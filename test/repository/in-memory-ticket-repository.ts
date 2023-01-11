import { Ticket } from "@/application/dto/ticket";
import { TicketRepository } from "@/domain/ports/ticket-repository";

export class InMemoryTicketRepository implements TicketRepository {

  private tickets = [];

  constructor(repository : Ticket[]) {
    this.tickets = repository;
  }

  async save(data : Ticket): Promise<void> {
    await this.tickets.push(data);
  }
}