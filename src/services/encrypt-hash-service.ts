import { TicketPayload } from "@/entities/ports/ticket-payload";
import * as CryptoJS from "crypto-js";
import { config } from "dotenv";
config();

export class EncryptHashService {
  static generate(payload: string) {
    const encrypt = CryptoJS.AES.encrypt(payload, process.env.PASSPHRASE);
    return encrypt;
  }

  static isValid(authCode: string, payload: TicketPayload) {
    const decrypt = CryptoJS.AES.decrypt(
      authCode,
      process.env.PASSPHRASE
    ).toString();
    if (JSON.parse(decrypt).nome == payload.nome) {
      return true;
    }
    return false;
  }
}
