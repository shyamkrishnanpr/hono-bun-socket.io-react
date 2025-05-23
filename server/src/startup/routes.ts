import router from "../routes/routes";
import type { Hono } from "hono";

export default function setupRoutes(app: Hono) {
	// Mount the router
	app.route("/api/v1", router);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	app.all("*", (c: any) => {
		c.status("404");
		c.text("404 Not Found");
		return c.res;
	});
}
