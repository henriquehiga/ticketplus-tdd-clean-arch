import { UuidService } from "@/services/uuid-service";

describe("Uuid Service", () => {
  test("deve testar metodo que gera UUID", () => {
    const uuidGerado = UuidService.generate();
    expect(uuidGerado).not.toBeNull();
  });
});
