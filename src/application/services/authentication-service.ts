import { TicketPayload } from "../dto/ticket-payload";
import { EncryptHashService } from "./encrypt-hash-service";

export class AuthenticationService {
  static generate(payload: TicketPayload) {
    const payloadAsStringJson = JSON.stringify(payload);
    return EncryptHashService.generate(payloadAsStringJson);
  }

  static isValid(authCode: string, payload: TicketPayload) {
    return EncryptHashService.isValid(authCode, payload);
  }
}
