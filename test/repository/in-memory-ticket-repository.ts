import { ITicket } from "../../src/application/dto/ticket";
import { TicketRepository } from "../../src/data/ports/ticket-repository";

export class InMemoryTicketRepository implements TicketRepository {
  private tickets: ITicket[] = [];

  constructor(repository: ITicket[]) {
    this.tickets = repository;
  }

  async useTicket(id: string): Promise<void> {
    const ticket = this.tickets.find((ticket) =>
      ticket.id === id ? ticket : null
    );
    const payload = ticket.payload;
    const updatedPayloadTicket = {
      ...payload,
      usado: true,
    };
    ticket.payload = updatedPayloadTicket;
    const tempTickets: ITicket[] = [];
    this.tickets.map((ticketInArray) => {
      if (ticket.id != ticketInArray.id) {
        tempTickets.push(ticketInArray);
      }
    });
    tempTickets.push(ticket);
    this.tickets = tempTickets;
  }

  async getById(id: string): Promise<ITicket | null> {
    return this.tickets.find((ticket) => (ticket.id === id ? ticket : null));
  }

  async save(data: ITicket): Promise<void> {
    this.tickets.push(data);
  }

  async list(): Promise<ITicket[]> {
    return this.tickets;
  }
}
