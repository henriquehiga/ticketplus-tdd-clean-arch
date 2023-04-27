import { GenerateNewTicket } from "../../domain/usecases/generate-new-ticket";
import { GenerateTicketController } from "../../presentation/controllers/generate-ticket-controller";
import { InMemoryTicketRepository } from "./../../../test/repository/in-memory-ticket-repository";

export const makeGenerateTicketController = (): GenerateTicketController => {
  const repository = new InMemoryTicketRepository([]);
  const usecase = new GenerateNewTicket(repository);
  return new GenerateTicketController(usecase);
};
