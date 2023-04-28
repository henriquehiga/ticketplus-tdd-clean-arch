import { Either, left } from "../../application/shared/either";
import { TicketRepository } from "../../data/ports/ticket-repository";
import { ValidateTicket } from "./validate-ticket";

export class UseTicket {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly validateTicketUsecase: ValidateTicket
  ) {}

  async execute(id: string): Promise<Either<Error, void>> {
    const boolOrError = await this.validateTicketUsecase.execute(id);
    if (boolOrError.isLeft()) {
      return left(boolOrError.value);
    }
    await this.ticketRepository.useTicket(id);
    return;
  }
}
