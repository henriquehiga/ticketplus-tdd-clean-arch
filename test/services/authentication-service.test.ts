import { TicketPayload } from "@/application/dto/ticket-payload";
import { AuthenticationService } from "@/application/services/authentication-service";

describe("Authentication service", () => {
  test("deve gerar um codigo de autenticação baseado no payload passado", () => {
    const payload: TicketPayload = {
      documento: "RG/12345678-X",
      nome: "Cliente Um",
      validade: "2023-12-25T19:00:000.00Z",
      usado: false,
    };
    const authService = AuthenticationService;
    const authCode = authService.generate(payload);
    const authCodeIsValid = authService.isValid(authCode, payload);
    expect(authCodeIsValid).toBeTruthy();
  });
});
