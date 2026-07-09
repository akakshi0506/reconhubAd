import { APP } from "../../core/constants";

export class HealthService {
  getHealth() {
    return {
      status: "UP",
      application: APP.NAME,
      version: APP.VERSION,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}