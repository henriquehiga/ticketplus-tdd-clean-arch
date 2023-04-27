export class TicketNotFoundError extends Error {
  public name: string = "TicketNotFoundError";
  constructor(id: string) {
    super(`O ticket de id: ${id} não foi encontrado!`)
  }
}