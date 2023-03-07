import { Router } from "express";
import farm from "./farm.routes";

const routes = Router();

routes.use("/farms", farm);

export default routes;
