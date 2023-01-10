export class InvalidDocumentError extends Error {
  public readonly name: string = "InvalidDocumentError";
  constructor(documento: string) {
    super(`O documento: ${documento} é inválido!`);
  }
}
