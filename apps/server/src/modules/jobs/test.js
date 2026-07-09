import { JobService } from "./service";
import { WorkflowType } from "./types";

const service = new JobService();

const job = service.create({
  workflow: WorkflowType.UC_SAP,
});

console.log(job);