import { ValidateTicket } from "../../domain/usecases/validate-ticket";
import { ValidateTicketController } from "../../presentation/controllers/validate-ticket-controller";
import { InMemoryTicketRepository } from "./../../../test/repository/in-memory-ticket-repository";

export const makeValidateTicketController = (): ValidateTicketController => {
  const repository = new InMemoryTicketRepository([]);
  const usecase = new ValidateTicket(repository);
  return new ValidateTicketController(usecase);
};
