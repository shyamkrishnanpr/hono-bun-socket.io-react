import type { IFleet, OperationResult } from "../types/FleetType";
import type { Server } from "socket.io";
import ROSLIB from "roslib";

export default class Fleet implements IFleet {
	ros: ROSLIB.Ros;
	io?: Server;
	services: Record<string, [string, string]>;
	topics: Record<string, [string, string]>;

	constructor(ros: ROSLIB.Ros) {
		this.ros = ros;
		this.services = {
			addRobot: ["/add_robot", "msgs/AddRobot"],
		};
		this.topics = {};
	}
    initialize(io: Server) {
        this.io = io;
      }
    
      isConnected() {
        return this.ros.isConnected;
      }

	addRobot(robotDetail:any): Promise<OperationResult> {
		return new Promise((resolve, reject) => {
			const addRobot = new ROSLIB.Service({
				ros: this.ros,
				name: this.services.addRobot?.[0] || "",
				serviceType: this.services.addRobot?.[1] || "",
			});
			const request = new ROSLIB.ServiceRequest(robotDetail);
			addRobot.callService(request, (result: OperationResult) => {
				if (result.success) {
					resolve(result);
				} else {
					reject(result);
				}
			});
		});
	}
}
