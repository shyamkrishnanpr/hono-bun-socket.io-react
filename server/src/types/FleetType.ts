import type { Server } from "socket.io";
import type ROSLIB from "roslib";

export interface IFleet {
	ros: ROSLIB.Ros;
	io?: Server;
	services: Record<string, [string, string]>;
	topics: Record<string, [string, string]>;

	initialize(io: Server): void;
	isConnected(): boolean;
}

export interface OperationResult {
	success: boolean;
	message: string;
}
