import { ValidateTicket } from "../../domain/usecases/validate-ticket";
import { Controller } from "../protocols/controller";
import { Request } from "../protocols/request";
import { Response } from "../protocols/response";

export class ValidateTicketController implements Controller {
  constructor(private readonly validateTicket: ValidateTicket) {}

  async handle(request: Request<any>): Promise<Response> {
    const result = await this.validateTicket.execute(request.body.id);
    if (result.isLeft()) {
      return {
        body: {
          error: result.value.name,
          message: result.value.message,
        },
        statusCode: 500,
      };
    }
    return {
      body: {
        is_valid: result.value,
      },
      statusCode: 200,
    };
  }
}
