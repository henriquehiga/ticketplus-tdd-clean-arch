import { TicketPayload } from "@/entities/ports/ticket-payload";
import { Ticket } from "@/entities/ticket";
import { AuthenticationService } from "@/services/authentication-service";
import { Either, right } from "@/shared/either";

export class GenerateNewTicket {
  public async execute(
    id: string,
    payload: TicketPayload
  ): Promise<Either<void, Ticket>> {
    const authCode = AuthenticationService.generate(payload);
    const ticketOrError = Ticket.create(id, authCode, payload);
    if (ticketOrError.isRight()) {
      return right(ticketOrError.value);
    }
  }
}
