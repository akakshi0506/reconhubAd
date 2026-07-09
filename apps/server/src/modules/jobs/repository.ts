import { Job } from "./types";

class JobRepository {
  private readonly jobs = new Map<string, Job>();

  create(job: Job) {
    this.jobs.set(job.id, job);
    return job;
  }

  findById(id: string) {
    return this.jobs.get(id);
  }

  findAll() {
    return [...this.jobs.values()];
  }

  delete(id: string) {
    return this.jobs.delete(id);
  }

  update(job: Job) {
    this.jobs.set(job.id, job);
    return job;
  }
}

export const jobRepository = new JobRepository();