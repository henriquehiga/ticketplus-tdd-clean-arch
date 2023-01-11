import { Ticket } from "@/domain/entities/ticket";
import { TicketPayload } from "../dto/ticket-payload";
import { AuthenticationService } from "../services/authentication-service";
import { UuidService } from "../services/uuid-service";
import { Either, right } from "../shared/either";

export class GenerateNewTicket {
  public async execute(
    payload: TicketPayload
  ): Promise<Either<void, Ticket>> {
    const id = UuidService.generate();
    const authCode = AuthenticationService.generate(payload);
    const ticketOrError = Ticket.create(id, authCode, payload);
    if (ticketOrError.isRight()) {
      return right(ticketOrError.value);
    }
  }
}
