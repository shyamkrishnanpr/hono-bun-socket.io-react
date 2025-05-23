import type { Context, Next } from "hono";
import type { ZodSchema, ZodError } from "zod";

export const validateRequest = (
	schema: ZodSchema,
	source: "body" | "query" | "params" = "body",
) => {
	return async (c: Context, next: Next) => {
		try {
			let data: unknown;
			if (source === "body") {
				data = await c.req.json();
			} else if (source === "query") {
				data = c.req.query();
			} else {
				data = c.req.param();
			}

			// Validate using safeParse to avoid throwing errors
			const result = schema.safeParse(data);

			if (!result.success) {
				// Extract detailed error issues from Zod
				const issues = result.error.issues.map((issue) => ({
					message: issue.message,
					path: issue.path,
					code: issue.code,
				}));

				return c.json({ issues }, { status: 400 });
			}

			// Proceed to the next middleware or route handler if validation passes
			await next();
		} catch (error) {
			// Handle unexpected errors
			if (error instanceof Error) {
				return c.json({ message: error.message }, { status: 400 });
			}
			// Handle unknown errors
			return c.json({ message: "Invalid request data" }, { status: 400 });
		}
	};
};
