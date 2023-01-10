import { Either, left, right } from "@/shared/either";
import { Document } from "./document";
import { InvalidDocumentError } from "./errors/invalid-document-error";
import { TicketPayload } from "./ports/ticket-payload";

export class Ticket {
  private id: string;
  private authCode: string;
  private payload: TicketPayload;

  private constructor(id: string, authCode: string, payload: TicketPayload) {
    this.id = id;
    this.authCode = authCode;
    this.payload = payload;
  }

  static create(
    id: string,
    authCode: string,
    payload: TicketPayload
  ): Either<InvalidDocumentError, Ticket> {
    const documentoOrError = Document.create(payload.documento);
    if (documentoOrError.isRight()) {
      const ticket = new Ticket(id, authCode, payload);
      return right(ticket);
    } else {
      return left(documentoOrError.value);
    }
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
