import { UseTicket } from "../../domain/usecases/use-ticket";
import { ValidateTicket } from "../../domain/usecases/validate-ticket";
import { UseTicketController } from "../../presentation/controllers/use-ticket-controller";
import { inMemoryTicketRepo } from "../app";

export const makeUseTicketController = (): UseTicketController => {
  const validateTicketUsecase = new ValidateTicket(inMemoryTicketRepo);
  const usecase = new UseTicket(inMemoryTicketRepo, validateTicketUsecase);
  return new UseTicketController(usecase);
};
