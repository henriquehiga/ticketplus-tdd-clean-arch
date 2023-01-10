import { TicketPayload } from "@/entities/ports/ticket-payload";
import { Ticket } from "@/entities/ticket";
import { AuthenticationService } from "@/services/authentication-service";
import { Either, right } from "@/shared/either";

export class GenerateNewTicket {
  public execute(id: string, payload: TicketPayload): Either<void, Ticket> {
    const authCode = AuthenticationService.generate(payload);
    const ticket = new Ticket(id, authCode, payload);
    return right(ticket);
  }
}
