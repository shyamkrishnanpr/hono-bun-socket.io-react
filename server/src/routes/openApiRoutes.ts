import { Hono } from "hono";
import { openApiSpec } from "../openapi/openApiSpec";
import { swaggerUI } from "@hono/swagger-ui";

const openApiRoutes = new Hono();

openApiRoutes.get("/doc", (c) => {
	return c.json(openApiSpec);
});

openApiRoutes.get(
	"/ui",
	swaggerUI({
		url: "/api/v1/openApi/doc",
	}),
);

export default openApiRoutes;
