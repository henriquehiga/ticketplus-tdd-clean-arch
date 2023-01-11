import { uuid } from "@/libs/uuid";

export class UuidService {
  static generate() {
    return uuid.v4();
  }
}
