import { ITicket } from "../../src/application/dto/ticket";
import { Ticket } from "./../../src/domain/entities/ticket";

describe("Ticket entity", () => {
  test("deve retornar valores corretos no get", () => {
    const id = "abc-123";
    const authCode = "ABC-123";
    const payload = {
      nome: "Client 1",
      documento: "RG/12345678-X",
      validade: new Date().toISOString(),
      usado: false,
      dados: null,
    };
    const ticket = Ticket.create(id, authCode, payload).value as ITicket;
    expect(ticket.id).toBe(id);
    expect(ticket.authCode).toBe(authCode);
    expect(ticket.payload).toEqual(payload);
  });

  test("deve retornar JSON utilizando metodo toJson", () => {
    const id = "abc-123";
    const authCode = "ABC-123";
    const payload = {
      nome: "Client 1",
      documento: "RG/12345678-X",
      validade: new Date().toISOString(),
      usado: false,
      dados: null,
    };
    const ticket = Ticket.create(id, authCode, payload).value as ITicket;
    const expectedJson = {
      id: id,
      authCode: authCode,
      payload: payload,
    };
    expect(ticket).toEqual(expectedJson);
  });
});
