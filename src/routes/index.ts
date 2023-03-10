import { Router } from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import v1 from "./v1";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/v1", v1);

export default routes;
