import bcrypt from "bcrypt";

export class EncryptHashService {
  static generate(payload: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(payload, salt);
  }

  static isValid(authCode: string, payload: string) {
    return bcrypt.compareSync(payload, authCode);
  }
}
