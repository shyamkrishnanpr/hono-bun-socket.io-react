import { Hono } from "hono";

import userRoutes from "./userRoutes";
import robotRoutes from "./robotRoutes";
import openApiRoutes from "./openApiRoutes";

const router = new Hono();

router.route("/users", userRoutes);
router.route("/robots", robotRoutes);
router.route("/openApi", openApiRoutes);

export default router;
