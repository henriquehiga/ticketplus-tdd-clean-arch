import { Ticket } from "@/domain/entities/ticket";
import { NewTicketPayload } from "../dto/new-ticket-payload";
import { TicketPayload } from "../dto/ticket-payload";
import { AuthenticationService } from "../services/authentication-service";
import { UuidService } from "../services/uuid-service";
import { Either, right } from "../shared/either";

export class GenerateNewTicket {
  public async execute(
    payload: NewTicketPayload
  ): Promise<Either<void, Ticket>> {
    const id = UuidService.generate();
    const UM_ANO = 31_556_926_000
    const DATA_ATUAL = new Date().getTime()
    let validade = new Date(DATA_ATUAL + UM_ANO).toISOString()
    let novoPayload : TicketPayload = {
      ...payload,
      validade,
      usado : false,
    }
    const authCode = AuthenticationService.generate(novoPayload);
    const ticketOrError = Ticket.create(id, authCode, novoPayload);
    if (ticketOrError.isRight()) {
      return right(ticketOrError.value);
    }
  }
}
