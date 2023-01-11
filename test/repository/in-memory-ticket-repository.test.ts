import { Ticket } from "@/application/dto/ticket";
import { InMemoryTicketRepository } from "./in-memory-ticket-repository";

describe("InMemoryTicketRepository", () => {
  test("deve salvar um ticket na base", async () => {
    const data : Ticket = {
      id : "123",
      authCode : "abc-123",
      payload : {
        nome : "Cliente Um",
        documento : "RG/12345678-X",
        usado: false,
        validade : "2023-08-16T19:00:00.000Z"
      }
    }
    const tickets : Ticket[] = [];
    const inMemoryTicketRepository = new InMemoryTicketRepository(tickets);
    await inMemoryTicketRepository.save(data);

    expect(tickets).toContain(data);
    expect(tickets.length).toBe(1);
  })
})