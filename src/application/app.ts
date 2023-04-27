import express, { json } from "express";
import { InMemoryTicketRepository } from "./../../test/repository/in-memory-ticket-repository";
import { configRoutes } from "./config/config-routes";
const app = express();

app.use(json());

export const inMemoryTicketRepo = new InMemoryTicketRepository([]);

configRoutes(app);

app.listen(3035, () => {
  console.log("On!");
});
