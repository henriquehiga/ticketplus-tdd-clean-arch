import { Document } from "./../../src/domain/entities/document";

describe("Documento entity", () => {
  test("deve criar novo documento válido", () => {
    let documentoStringValidoEFormatado = "RG/12345678X";
    const documento = Document.create(documentoStringValidoEFormatado)
      .value as Document;
    expect(documento.value).toBe(documentoStringValidoEFormatado);
  });
});
