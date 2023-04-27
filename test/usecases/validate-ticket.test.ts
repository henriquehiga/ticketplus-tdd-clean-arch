import { AuthenticationService } from "@/application/services/authentication-service";
import { TicketRepository } from "@/data/ports/ticket-repository";
import { ValidateTicket } from "@/domain/usecases/validate-ticket";
import { InMemoryTicketRepository } from "./../repository/in-memory-ticket-repository";

describe("ValidateTicketUseCase", () => {
  test("deve retornar true caso o ticket seja válido", async () => {
    const ticketList = [];
    const ticketRepository: TicketRepository = new InMemoryTicketRepository(
      ticketList
    );
    let ticket = {
      id: "ticket-valido",
      authCode: "",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2100-12-25T19:00:00.000Z",
        usado: false,
        dados: null,
      },
    };
    let validAuthCode = AuthenticationService.generate(ticket.payload);
    ticket = {
      ...ticket,
      authCode: validAuthCode,
    };
    await ticketRepository.save(ticket);
    const validateTicketUseCase = new ValidateTicket(ticketRepository);
    const valido = (await validateTicketUseCase.execute(ticket.id)).value;
    expect(valido).toBe(true);
  });

  test("deve retornar erro de UsedTicketError caso o ticket tenha sido utilizado", async () => {
    const ticketList = [];
    const ticketRepository: TicketRepository = new InMemoryTicketRepository(
      ticketList
    );
    const ticket = {
      id: "bf052985-9489-4801-b3f6-a27f5ffd8bd1",
      authCode:
        "U2FsdGVkX1+ff3ZTbhnxRh8aqqk3HRPxRwbKIN3WPWykn3/ja7WoGIP9Bukys3kPHqxHzvK9z/11CjOgZ9Pi+K+WFlwD39EK7JadUGPX3gqnl50cLsA6/u3R59LTQMPk2ilYab0bvKze0yNpiEgduqwQMJuDhpgbHJvewiCGzkw=",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2023-12-25T19:00:00.000Z",
        usado: true,
        dados: null,
      },
    };
    await ticketRepository.save(ticket);
    const validateTicketUseCase = new ValidateTicket(ticketRepository);
    const erro = (await validateTicketUseCase.execute(ticket.id))
      .value as Error;
    expect(erro.name).toBe("UsedTicketError");
    expect(erro.message).toBe(`O ticket [${ticket.id}] já foi utilizado!`);
  });

  test("deve retornar erro de ExpiredTicketError caso a validade do ticket tenha acabado", async () => {
    const ticketList = [];
    const ticketRepository: TicketRepository = new InMemoryTicketRepository(
      ticketList
    );
    const ticket = {
      id: "bf052985-9489-4801-b3f6-a27f5ffd8bd1",
      authCode:
        "U2FsdGVkX1+ff3ZTbhnxRh8aqqk3HRPxRwbKIN3WPWykn3/ja7WoGIP9Bukys3kPHqxHzvK9z/11CjOgZ9Pi+K+WFlwD39EK7JadUGPX3gqnl50cLsA6/u3R59LTQMPk2ilYab0bvKze0yNpiEgduqwQMJuDhpgbHJvewiCGzkw=",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2022-12-25T19:00:00.000Z",
        usado: false,
        dados: null,
      },
    };
    await ticketRepository.save(ticket);
    const validateTicketUseCase = new ValidateTicket(ticketRepository);
    const erro = (await validateTicketUseCase.execute(ticket.id))
      .value as Error;
    expect(erro.name).toBe("ExpiredTicketError");
    expect(erro.message).toBe(`A validade do ticket [${ticket.id}] expirou!`);
  });

  test("deve retornar erro de UnauthorizedTicketError caso o ticket não seja autenticado", async () => {
    const ticketList = [];
    const ticketRepository: TicketRepository = new InMemoryTicketRepository(
      ticketList
    );
    const ticket = {
      id: "bf052985-9489-4801-b3f6-a27f5ffd8bd1",
      authCode: "invalid-auth-code",
      payload: {
        documento: "RG/12345678-X",
        nome: "Cliente Um",
        validade: "2023-12-25T19:00:00.000Z",
        usado: false,
        dados: null,
      },
    };
    await ticketRepository.save(ticket);
    const validateTicketUseCase = new ValidateTicket(ticketRepository);
    const erro = (await validateTicketUseCase.execute(ticket.id))
      .value as Error;
    expect(erro.name).toBe("UnauthorizedTicketError");
    expect(erro.message).toBe(`O ticket [${ticket.id}] é inválido!`);
  });

  test("deve retornar erro de TicketNotFoundError caso o ticket não exista", async () => {
    const ticketList = [];
    const ticketRepository: TicketRepository = new InMemoryTicketRepository(
      ticketList
    );
    const validateTicketUseCase = new ValidateTicket(ticketRepository);
    const id = "not-exist-ticket-id";
    const erro = (await validateTicketUseCase.execute(id)).value as Error;
    expect(erro.name).toBe("TicketNotFoundError");
    expect(erro.message).toBe(`O ticket de id: ${id} não foi encontrado!`);
  });
});
