import { ITicket } from "../../src/application/dto/ticket";
import { AuthenticationService } from "../../src/application/services/authentication-service";
import { InMemoryTicketRepository } from "../../test/repository/in-memory-ticket-repository";
import { NewTicketPayload } from "./../../src/application/dto/new-ticket-payload";
import { GenerateNewTicket } from "./../../src/domain/usecases/generate-new-ticket";

describe("GenerateNewTicketUseCase", () => {
  test("deve gerar um ticket integro e único no sistema", async () => {
    const payload: NewTicketPayload = {
      documento: "RG/12345678-X",
      nome: "Cliente Um",
      dados: {
        evento: "EV-1",
      },
    };
    const repository = new InMemoryTicketRepository([]);
    const generateNewTicketUseCase = new GenerateNewTicket(repository);
    const ticket = (await generateNewTicketUseCase.execute(payload))
      .value as ITicket;
    const ticketIsValid = AuthenticationService.isValid(
      ticket.authCode,
      ticket.payload
    );
    expect(ticketIsValid).toBeTruthy();
  });
});
