import { Ticket } from "@/domain/entities/ticket";
import { TicketPayload } from "../dto/ticket-payload";
import { AuthenticationService } from "../services/authentication-service";
import { Either, right } from "../shared/either";

export class GenerateNewTicket {
  public async execute(
    id: string,
    payload: TicketPayload
  ): Promise<Either<void, Ticket>> {
    const authCode = AuthenticationService.generate(payload);
    const ticketOrError = Ticket.create(id, authCode, payload);
    if (ticketOrError.isRight()) {
      console.log(ticketOrError.value)
      return right(ticketOrError.value);
    }
  }
}
