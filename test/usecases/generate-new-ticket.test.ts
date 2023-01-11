import { TicketPayload } from "@/application/dto/ticket-payload";
import { AuthenticationService } from "@/application/services/authentication-service";
import { UuidService } from "@/application/services/uuid-service";
import { GenerateNewTicket } from "@/application/usecases/generate-new-ticket";
import { Ticket } from "@/domain/entities/ticket";

describe("GenerateNewTicketUseCase", () => {
  test("deve gerar um ticket integro e único no sistema", async () => {
    const id = UuidService.generate();
    const payload: TicketPayload = {
      documento: "RG/12345678-X",
      nome: "Cliente Um",
      validade: "2023-12-25T19:00:00.000Z",
      usado: false,
    };
    const generateNewTicketUseCase = new GenerateNewTicket();
    const ticket = (await generateNewTicketUseCase.execute(id, payload))
      .value as Ticket;
    console.log(ticket);
    const ticketIsValid = AuthenticationService.isValid(ticket.getAuthCode(), ticket.getPayload());
    expect(ticketIsValid).toBeTruthy();
  });
});
