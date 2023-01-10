import { Either, left, right } from "@/shared/either";
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
  ): Promise<Either<UsedTicketError, boolean>> {
    if (ticket.payload.usado == true) {
      return left(new UsedTicketError(ticket.id));
    }
    return right(true);
  }
}
