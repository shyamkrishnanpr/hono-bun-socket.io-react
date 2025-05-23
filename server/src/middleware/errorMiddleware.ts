import type { ErrorHandler, NotFoundHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

// Error Handler
export const errorHandler: ErrorHandler = (err, c) => {
	const currentStatus =
		"status" in err ? err.status : c.newResponse(null).status;
	const statusCode =
		currentStatus !== 200 ? (currentStatus as StatusCode) : 500;
	return c.json(
		{
			success: false,
			message: err?.message || "Internal Server Error",
		},
		statusCode,
	);
};

// Not Found Handler
export const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			success: false,
			message: `Not Found - [${c.req.method}]:[${c.req.url}]`,
		},
		404, // Explicitly set 404 status
	);
};
