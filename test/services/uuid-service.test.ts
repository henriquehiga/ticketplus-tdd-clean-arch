import { UuidService } from "@/services/uuid-service";

describe("Uuid Service", () => {
  test("deve gerar uuid no metodo generate", () => {
    const uuidGerado = UuidService.generate();
    expect(uuidGerado).not.toBeNull();
  });
});
