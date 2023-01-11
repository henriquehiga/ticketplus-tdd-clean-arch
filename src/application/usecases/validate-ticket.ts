import { AuthenticationService } from "../services/authentication-service";
import { Either, left, right } from "../shared/either";
import { ExpiredTicketError } from "./errors/validate-ticket/expired-ticket-error";
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
  async execute(
    ticket: ticketInterface
  ): Promise<Either<UsedTicketError | ExpiredTicketError, boolean>> {
    if (ticket.payload.usado == true) {
      return left(new UsedTicketError(ticket.id));
    }
    let timestampAtual = new Date().getTime();
    let timestampValidadeTicket = new Date(ticket.payload.validade).getTime();
    if (timestampAtual > timestampValidadeTicket) {
      return left(new ExpiredTicketError(ticket.id));
    }
    let authCodeIsValid = AuthenticationService.isValid(ticket.authCode, ticket.payload);
    if (!authCodeIsValid) {
      return left(new UnauthorizedTicketError(ticket.id));
    }
    return right(true);
  }
}
