import type { Context } from "hono";

export const sendResponse = (
	c: Context,
	success: boolean,
	errorMsg: string,
	statusCode: number,
	data: unknown[] = [],
) => {
	return c.json({
		success,
		data,
		errorMsg,
		statusCode,
	});
};
