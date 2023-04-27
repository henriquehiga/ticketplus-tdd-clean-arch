import express, { json } from "express";
import { configRoutes } from "./config/config-routes";
const app = express();

app.use(json());
configRoutes(app);

app.listen(3035, () => {
  console.log("On!");
});
