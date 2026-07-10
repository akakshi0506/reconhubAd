import { UploadService } from "./service";

const service = new UploadService();

await service.createJobFolders("TEST_JOB");

console.log("Folders created.");