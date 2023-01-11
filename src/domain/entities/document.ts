import { Either, left, right } from "@/application/shared/either";
import { InvalidDocumentError } from "./errors/invalid-document-error";
import { valid } from "./validators/document-validator";

export class Document {
  public readonly value: string;

  private constructor(email: string) {
    this.value = email;
    Object.freeze(this);
  }

  public static create(
    documento: string
  ): Either<InvalidDocumentError, Document> {
    documento = this.format(documento);
    if (valid(documento)) {
      return right(new Document(documento));
    }
    return left(new InvalidDocumentError(documento));
  }

  private static format(documento: string) {
    documento = documento.replaceAll(".", "");
    documento = documento.replaceAll("-", "");
    documento = documento.trim();
    documento = documento.toUpperCase();
    return documento;
  }
}
