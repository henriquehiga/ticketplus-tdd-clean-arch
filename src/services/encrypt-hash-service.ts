import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

export class EncryptHashService {
  static generate(payload: string) {
    const salt = bcrypt.genSaltSync(10);
    payload = process.env.PASSPHRASE + payload;
    return bcrypt.hashSync(payload, salt);
  }

  static isValid(authCode: string, payload: string) {
    payload = process.env.PASSPHRASE + payload;
    return bcrypt.compareSync(payload, authCode);
  }
}
