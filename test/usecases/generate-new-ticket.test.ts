import { TicketPayload } from "@/entities/ports/ticket-payload";
import { Ticket } from "@/entities/ticket";
import { AuthenticationService } from "@/services/authentication-service";
import { UuidService } from "@/services/uuid-service";
import { GenerateNewTicket } from "@/usecases/generate-new-ticket";

describe("GenerateNewTicketUseCase", () => {
  test("deve gerar um ticket integro e único no sistema", async () => {
    const id = UuidService.generate();
    const payload: TicketPayload = {
      documento: "RG/12345678-X",
      nome: "Cliente Um",
      validade: "2023-12-25T19:00:000.00Z",
      usado: false,
    };
    const generateNewTicketUseCase = new GenerateNewTicket();
    const ticket = (await generateNewTicketUseCase.execute(id, payload))
      .value as Ticket;
    console.log(ticket);
    const ticketIsValid = AuthenticationService.isValid(ticket.getAuthCode());
    expect(ticketIsValid).toBeTruthy();
  });
});
