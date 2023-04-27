import { ValidateTicket } from "../../domain/usecases/validate-ticket";
import { Controller } from "../protocols/controller";
import { Request } from "../protocols/request";
import { Response } from "../protocols/response";

export class ValidateTicketController implements Controller {
  constructor(private readonly validateTicket: ValidateTicket) {}

  async handle(request: Request<string>): Promise<Response> {
    const result = await this.validateTicket.execute(request.body);
    if (result.isLeft()) {
      return {
        body: result.value,
        statusCode: 500,
      };
    }
    return {
      body: {
        is_valid: result.value,
      },
      statusCode: 201,
    };
  }
}
