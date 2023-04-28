import { NewTicketPayload } from "../../application/dto/new-ticket-payload";
import { ITicket } from "../../application/dto/ticket";
import { TicketPayload } from "../../application/dto/ticket-payload";
import { AuthenticationService } from "../../application/services/authentication-service";
import { UuidService } from "../../application/services/uuid-service";
import { Either, left, right } from "../../application/shared/either";
import { TicketRepository } from "../../data/ports/ticket-repository";
import { Ticket } from "../entities/ticket";

export class GenerateNewTicket {
  constructor(private readonly ticketRepository: TicketRepository) {}

  public async execute(
    payload: NewTicketPayload
  ): Promise<Either<Error, ITicket>> {
    const id = UuidService.generate();
    const UM_ANO = 31_556_926_000;
    const DATA_ATUAL = new Date().getTime();
    let validade = new Date(DATA_ATUAL + UM_ANO).toISOString();
    let novoPayload: TicketPayload = {
      ...payload,
      validade,
      usado: false,
    };
    const authCode = AuthenticationService.generate(novoPayload);
    const ticketOrError = Ticket.create(id, authCode, novoPayload);
    if (ticketOrError.isLeft()) {
      return left(ticketOrError.value);
    }
    this.ticketRepository.save(ticketOrError.value);
    return right(ticketOrError.value);
  }
}
