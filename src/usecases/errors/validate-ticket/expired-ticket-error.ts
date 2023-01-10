export class ExpiredTicketError extends Error {
  public name: string = "ExpiredTicketError";

  constructor(id: string) {
    super(`A validade do ticket [${id}] expirou!`);
  }
}
