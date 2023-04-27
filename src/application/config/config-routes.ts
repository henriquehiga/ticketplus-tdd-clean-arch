import { Router } from "express";
import { ticketRoutes } from "../routes/ticket-routes";

export const configRoutes = (router: Router) => {
  ticketRoutes(router);
};
