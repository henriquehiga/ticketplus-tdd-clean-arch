import { TicketPayload } from "@/entities/ports/ticket-payload";
import * as CryptoJS from "crypto-js";
import { config } from "dotenv";
config();

export class EncryptHashService {
  static generate(payload: string) {
    const encrypt = CryptoJS.AES.encrypt(payload, "Oi").toString();
     this.isValid(encrypt, JSON.parse(payload))
    return encrypt;
  }

  static isValid(authCode: string, payload: TicketPayload) {
    const decrypt = CryptoJS.AES.decrypt(
      authCode,
      "Oi"
    ).toString();
    console.log(decrypt)
    if (JSON.parse(decrypt).nome == payload.nome) {
      return true;
    }
    return false;
  }
}
