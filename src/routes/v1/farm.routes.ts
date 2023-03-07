import { RequestHandler, Router } from "express";
import { FarmsController } from "modules/farms/farms.controller";

const router = Router();
const farmsController = new FarmsController();

router.post("/", farmsController.create.bind(farmsController) as RequestHandler);

export default router;
