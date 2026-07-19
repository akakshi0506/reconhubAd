const API_BASE = "http://localhost:3000/api/v1";

export interface Job {
  id: string;
  workflow: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function createJob() {
  const response = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workflow: "UC_SAP",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data as ApiResponse<Job>;
}

export async function uploadFile(jobId: string, file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_BASE}/jobs/${jobId}/files`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function reconcileJob(jobId: string) {
  const response = await fetch(
    `http://localhost:3000/jobs/${jobId}/reconcile`,
    {
      method: "POST",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Reconciliation failed");
  }

  return data;
}
export async function generateEmamiReport(jobId: string) {
  const response = await fetch(`${API_BASE}/jobs/${jobId}/emami`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Emami report generation failed");
  }

  return data;
}