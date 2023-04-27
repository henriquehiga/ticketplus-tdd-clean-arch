import { GenerateNewTicket } from "../../domain/usecases/generate-new-ticket";
import { GenerateTicketController } from "../../presentation/controllers/generate-ticket-controller";
import { inMemoryTicketRepo } from "../app";

export const makeGenerateTicketController = (): GenerateTicketController => {
  const usecase = new GenerateNewTicket(inMemoryTicketRepo);
  return new GenerateTicketController(usecase);
};
