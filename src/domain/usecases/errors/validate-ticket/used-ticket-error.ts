export class UsedTicketError extends Error {
  public name: string = "UsedTicketError";

  constructor(id: string) {
    super(`O ticket [${id}] já foi utilizado!`);
  }
}
