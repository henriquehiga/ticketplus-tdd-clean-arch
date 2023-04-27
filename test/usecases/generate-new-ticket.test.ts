import { NewTicketPayload } from "@/application/dto/new-ticket-payload";
import { AuthenticationService } from "@/application/services/authentication-service";
import { Ticket } from "@/domain/entities/ticket";
import { GenerateNewTicket } from "@/domain/usecases/generate-new-ticket";

describe("GenerateNewTicketUseCase", () => {
  test("deve gerar um ticket integro e único no sistema", async () => {
    const payload: NewTicketPayload = {
      documento: "RG/12345678-X",
      nome: "Cliente Um",
      dados: {
        evento: "EV-1",
      },
    };
    const generateNewTicketUseCase = new GenerateNewTicket();
    const ticket = (await generateNewTicketUseCase.execute(payload))
      .value as Ticket;
    const ticketIsValid = AuthenticationService.isValid(
      ticket.getAuthCode(),
      ticket.getPayload()
    );
    expect(ticketIsValid).toBeTruthy();
  });
});
