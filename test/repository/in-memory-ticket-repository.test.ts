import { ITicket } from "../../src/application/dto/ticket";
import { InMemoryTicketRepository } from "./in-memory-ticket-repository";

describe("InMemoryTicketRepository", () => {
  test("deve salvar um ticket na base", async () => {
    const data: ITicket = {
      id: "123",
      authCode: "abc-123",
      payload: {
        nome: "Cliente Um",
        documento: "RG/12345678-X",
        usado: false,
        validade: "2023-08-16T19:00:00.000Z",
        dados: null,
      },
    };
    const inMemoryTicketRepository = new InMemoryTicketRepository([]);
    await inMemoryTicketRepository.save(data);
    const ticketFounded = await inMemoryTicketRepository.getById("123");
    expect(ticketFounded).toEqual(data);
  });

  test("deve recuperar um ticket pelo id", async () => {
    const data: ITicket = {
      id: "123",
      authCode: "abc-123",
      payload: {
        nome: "Cliente Um",
        documento: "RG/12345678-X",
        usado: false,
        validade: "2023-08-16T19:00:00.000Z",
        dados: null,
      },
    };
    const tickets: ITicket[] = [];
    const inMemoryTicketRepository = new InMemoryTicketRepository(tickets);
    await inMemoryTicketRepository.save(data);
    const ticketFromRepository = await inMemoryTicketRepository.getById("123");
    expect(ticketFromRepository).toEqual(data);
  });
});
