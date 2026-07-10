import { storageService } from "./storage.service";

await storageService.createJobWorkspace("TEST_JOB");

await storageService.saveMetadata("TEST_JOB", {
  status: "CREATED",
});

console.log("Workspace created.");