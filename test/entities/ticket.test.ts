import { Ticket } from "@/domain/entities/ticket";

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
    const ticket = Ticket.create(id, authCode, payload).value as Ticket;
    expect(ticket.getId()).toBe(id);
    expect(ticket.getAuthCode()).toBe(authCode);
    expect(ticket.getPayload()).toEqual(payload);
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
    const ticket = Ticket.create(id, authCode, payload).value as Ticket;
    const expectedJson = {
      id: id,
      authCode: authCode,
      payload: payload,
    };
    expect(ticket.toJson()).toEqual(expectedJson);
  });
});
