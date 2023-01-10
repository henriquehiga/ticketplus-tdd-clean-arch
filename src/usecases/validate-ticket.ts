import { Either, left, right } from "@/shared/either";
import { ExpiredTicketError } from "./errors/validate-ticket/expired-ticket-error";
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
    return right(true);
  }
}
