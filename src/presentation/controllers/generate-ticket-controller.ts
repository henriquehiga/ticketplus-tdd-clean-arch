import { NewTicketPayload } from "../../application/dto/new-ticket-payload";
import { GenerateNewTicket } from "../../domain/usecases/generate-new-ticket";
import { Controller } from "../protocols/controller";
import { Request } from "../protocols/request";
import { Response } from "../protocols/response";

export class GenerateTicketController implements Controller {
  constructor(private readonly generateTicketUsecase: GenerateNewTicket) {}

  async handle(request: Request<NewTicketPayload>): Promise<Response> {
    const result = await this.generateTicketUsecase.execute(request.body);
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
        ticket_id: result.value.id,
      },
      statusCode: 201,
    };
  }
}
