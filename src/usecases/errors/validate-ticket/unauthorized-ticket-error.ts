export class UnauthorizedTicketError extends Error {
  public name: string = "UnauthorizedTicketError";
  constructor(id: string) {
    super(`O ticket [${id}] é inválido!`);
  }
}
