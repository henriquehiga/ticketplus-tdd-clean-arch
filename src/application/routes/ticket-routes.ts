import { Router } from "express";
import { makeGenerateTicketController } from "../factories/makeGenerateTicketController";
import { makeUseTicketController } from "../factories/makeUseTicketController";
import { makeValidateTicketController } from "../factories/makeValidateTicketController";

export const ticketRoutes = (router: Router) => {
  router.post("/generate-ticket", async (req, res) => {
    const result = await makeGenerateTicketController().handle(req);
    res.json(result);
  });

  router.post("/validate-ticket", async (req, res) => {
    const result = await makeValidateTicketController().handle(req);
    res.json(result);
  });

  router.post("/use-ticket", async (req, res) => {
    const result = await makeUseTicketController().handle(req);
    res.json(result);
  });
};
