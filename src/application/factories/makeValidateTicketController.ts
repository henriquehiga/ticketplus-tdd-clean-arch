import { ValidateTicket } from "../../domain/usecases/validate-ticket";
import { ValidateTicketController } from "../../presentation/controllers/validate-ticket-controller";
import { inMemoryTicketRepo } from "../app";

export const makeValidateTicketController = (): ValidateTicketController => {
  const usecase = new ValidateTicket(inMemoryTicketRepo);
  return new ValidateTicketController(usecase);
};
