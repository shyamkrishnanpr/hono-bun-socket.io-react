import { z } from "zod-openapi";

export const openApiSpec = {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "OpenAPI Specification",
		description: "This is a sample OpenAPI specification for a simple API.",
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Local server",
		},
	],
	components: {
		schemas: {},
	},
	paths: {
		"/api/v1": {
			get: {
				summary: "Test route",
				description: "This is a test route to check if the server is working.",
				responses: {
					200: {
						description: "Successful response",
						content: {
							"text/plain": {
								schema: {
									type: "string",
									example: "Hono is working!",
								},
							},
						},
					},
				},
			},
		},
	},
};
