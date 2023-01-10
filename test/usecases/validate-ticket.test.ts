import { ValidateTicket } from "@/usecases/validate-ticket";

describe("ValidateTicketUseCase", () => {
  test("deve retornar true caso o ticket seja válido", async () => {
    const ticket = {
      id: "845cefe0-8d65-4949-ab79-dce2c8515aaa",
      authCode: "$2b$10$eFM5pdX5qFhd4E9QqS9eQO9svLD8J56NWaVcDyjaBWD448DtYwmjy",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2023-12-25T19:00:00.000Z",
        usado: false,
      },
    };
    const validateTicketUseCase = new ValidateTicket();
    const valido = (await validateTicketUseCase.execute(ticket)).value;
    expect(valido).toBe(true);
  });

  test("deve retornar erro de UsedTicketError caso o ticket tenha sido utilizado", async () => {
    const ticket = {
      id: "845cefe0-8d65-4949-ab79-dce2c8515aaa",
      authCode: "$2b$10$eFM5pdX5qFhd4E9QqS9eQO9svLD8J56NWaVcDyjaBWD448DtYwmjy",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2023-12-25T19:00:00.000Z",
        usado: true,
      },
    };
    const validateTicketUseCase = new ValidateTicket();
    const erro = (await validateTicketUseCase.execute(ticket)).value as Error;
    expect(erro.name).toBe("UsedTicketError");
    expect(erro.message).toBe(`O ticket [${ticket.id}] já foi utilizado!`);
  });

  test("deve retornar erro de ExpiredTicketError caso a validade do ticket tenha acabado", async () => {
    const ticket = {
      id: "845cefe0-8d65-4949-ab79-dce2c8515aaa",
      authCode: "$2b$10$eFM5pdX5qFhd4E9QqS9eQO9svLD8J56NWaVcDyjaBWD448DtYwmjy",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2022-12-25T19:00:00.000Z",
        usado: false,
      },
    };
    const validateTicketUseCase = new ValidateTicket();
    const erro = (await validateTicketUseCase.execute(ticket)).value as Error;
    expect(erro.name).toBe("ExpiredTicketError");
    expect(erro.message).toBe(`A validade do ticket [${ticket.id}] expirou!`);
  });
});
