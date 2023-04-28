import { UseTicket } from "../../domain/usecases/use-ticket";
import { Controller } from "../protocols/controller";
import { Request } from "../protocols/request";
import { Response } from "../protocols/response";

export class UseTicketController implements Controller {
  constructor(private readonly usecase: UseTicket) {}

  async handle(request: Request<any>): Promise<Response> {
    const result = await this.usecase.execute(request.body.id);
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
        usado: result.value,
      },
      statusCode: 200,
    };
  }
}
