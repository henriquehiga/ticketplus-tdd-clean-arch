import { cryptojs } from "@/libs/cryptojs";
import { config } from "dotenv";
import { TicketPayload } from "../dto/ticket-payload";
config();

export class EncryptHashService {
  static generate(payload: string) {
    const encrypt = cryptojs.AES.encrypt(payload, process.env.PASSPHRASE).toString();
    return encrypt;
  }

  static isValid(authCode: string, payload: TicketPayload) {
    const decrypt = cryptojs.AES.decrypt(
      authCode,
      process.env.PASSPHRASE
    ).toString(cryptojs.enc.Utf8);
    try {
      const decryptedPayload = JSON.parse(decrypt);
      return decryptedPayload.nome === payload.nome;
    } catch(e) {
      return false;
    }
  }
}
