import * as uuid from "uuid";

export class UuidService {
  static generate() {
    return uuid.v4();
  }
}
