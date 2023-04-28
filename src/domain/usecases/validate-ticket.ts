import { AuthenticationService } from "../../application/services/authentication-service";
import { Either, left, right } from "../../application/shared/either";
import { TicketRepository } from "../../data/ports/ticket-repository";
import { ExpiredTicketError } from "./errors/validate-ticket/expired-ticket-error";
import { TicketNotFoundError } from "./errors/validate-ticket/ticket-not-found";
import { UnauthorizedTicketError } from "./errors/validate-ticket/unauthorized-ticket-error";
import { UsedTicketError } from "./errors/validate-ticket/used-ticket-error";

interface ticketInterface {
  id: string;
  authCode: string;
  payload: {
    documento: string;
    nome: string;
    validade: string;
    usado: boolean;
  };
}

export class ValidateTicket {
  private ticketRepository: TicketRepository;

  constructor(repository: TicketRepository) {
    this.ticketRepository = repository;
  }

  async execute(id: string): Promise<Either<Error, boolean>> {
    const ticket = await this.ticketRepository.getById(id);
    if (!ticket) {
      return left(new TicketNotFoundError(id));
    }
    if (ticket.payload.usado == true) {
      return left(new UsedTicketError(id));
    }
    let timestampAtual = new Date().getTime();
    let timestampValidadeTicket = new Date(ticket.payload.validade).getTime();
    if (timestampAtual > timestampValidadeTicket) {
      return left(new ExpiredTicketError(id));
    }
    let authCodeIsValid = AuthenticationService.isValid(
      ticket.authCode,
      ticket.payload
    );
    if (!authCodeIsValid) {
      return left(new UnauthorizedTicketError(id));
    }
    return right(true);
  }
}
