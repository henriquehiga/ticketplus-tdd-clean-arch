import { Ticket } from "@/application/dto/ticket";
import { TicketRepository } from "@/domain/ports/ticket-repository";

export class InMemoryTicketRepository implements TicketRepository {

  private tickets : Ticket[] = [];

  constructor(repository : Ticket[]) {
    this.tickets = repository;
  }

  async getById(id: string): Promise<Ticket | null> {
    return await this.tickets.find(ticket => ticket.id === id);
  }

  async save(data : Ticket): Promise<void> {
    await this.tickets.push(data);
  }
}