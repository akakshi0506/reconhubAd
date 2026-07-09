import { randomUUID } from "node:crypto";

import { CreateJobDto } from "./dto";
import { jobRepository } from "./repository";
import { Job, JobStatus } from "./types";

export class JobService {
  constructor(
    private readonly repository = jobRepository
  ) {}

  create(dto: CreateJobDto): Job {
    const now = new Date();

    const job: Job = {
      id: this.generateJobId(),

      workflow: dto.workflow,

      status: JobStatus.CREATED,

      createdAt: now,

      updatedAt: now,

      files: [],
    };

    return this.repository.create(job);
  }

  getById(id: string): Job | undefined {
    return this.repository.findById(id);
  }

  getAll(): Job[] {
    return this.repository.findAll();
  }

  delete(id: string): boolean {
    return this.repository.delete(id);
  }

  private generateJobId(): string {
    return randomUUID();
  }
}