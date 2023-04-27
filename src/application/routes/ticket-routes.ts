import { Router } from "express";
import { makeGenerateTicketController } from "../factories/makeGenerateTicketController";

export const ticketRoutes = (router: Router) => {
  router.post("/generate-ticket", async (req, res) => {
    const result = await makeGenerateTicketController().handle(req);
    res.json(result);
  });
};
