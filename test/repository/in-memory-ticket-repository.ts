import { Ticket } from "@/application/dto/ticket";
import { TicketRepository } from "@/domain/ports/ticket-repository";

export class InMemoryTicketRepository implements TicketRepository {
  private tickets: Ticket[] = [];

  constructor(repository: Ticket[]) {
    this.tickets = repository;
  }

  async getById(id: string): Promise<Ticket | null> {
    return this.tickets.find((ticket) => (ticket.id === id ? ticket : null));
  }

  async save(data: Ticket): Promise<void> {
    this.tickets.push(data);
  }
}
