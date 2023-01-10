import { TicketPayload } from "./ports/ticket-payload";

export class Ticket {
  private id: string;
  private authCode: string;
  private payload: TicketPayload;

  constructor(id: string, authCode: string, payload: TicketPayload) {
    this.id = id;
    this.authCode = authCode;
    this.payload = payload;
  }

  public getId(): string {
    return this.id;
  }

  public getAuthCode(): string {
    return this.authCode;
  }

  public getPayload(): TicketPayload {
    return this.payload;
  }

  public toJson() {
    return {
      id: this.id,
      authCode: this.authCode,
      payload: this.payload,
    };
  }
}
