import { useState } from "react";
import "./App.css";
import { createJob, uploadFile, reconcileJob } from "./services/api";

interface Summary {
  totalUc: number;
  totalSap: number;
  matched: number;
  mismatched: number;
  missingInUc: number;
  missingInSap: number;
}

function App() {
  const [jobId, setJobId] = useState("");

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [reconciling, setReconciling] = useState(false);

  const [ucFile, setUcFile] = useState<File | null>(null);

  const [sapFile, setSapFile] = useState<File | null>(null);

  const [summary,setSummary] = useState<Summary>({
    totalUc: 0,
    totalSap: 0,
    matched: 0,
    mismatched: 0,
    missingInUc: 0,
    missingInSap: 0,
  });

  async function handleCreateJob() {
    try {
      setLoading(true);

      const response = await createJob();

      setJobId(response.data.id);

      alert("Job created successfully");
    } catch (error) {
      console.error(error);

      alert("Unable to create job");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
    if (!jobId) {
      alert("Create a Job first");

      return;
    }

    if (!ucFile || !sapFile) {
      alert("Please choose both UC and SAP workbooks");

      return;
    }

    try {
      setUploading(true);

      await uploadFile(jobId, ucFile);

      await uploadFile(jobId, sapFile);

      alert("Files uploaded successfully");
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleReconcile() {
    if (!jobId) {
      alert("Create a Job first");

      return;
    }

    try {
      setReconciling(true);

      const response = await reconcileJob(jobId);

      console.log(response);

      setSummary({
        totalUc: response.data.totalUc,
        totalSap: response.data.totalSap,
        matched: response.data.matched.length,
        mismatched: response.data.mismatched.length,
        missingInUc: response.data.missingInUc.length,
        missingInSap: response.data.missingInSap.length,
      });

      alert("Reconciliation completed successfully");
    } catch (error) {
      console.error(error);

      alert("Reconciliation failed");
    } finally {
      setReconciling(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>ReconHub</h1>

        <p>Intelligent Financial Reconciliation Platform</p>
      </header>

      <main className="container">
        <section className="card">
          <h2>Create Job</h2>

          <button
            className="primary"
            onClick={handleCreateJob}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create New Job"}
          </button>

          <div className="job-id">
            <strong>Job ID</strong>

            <br />

            {jobId || "No Job Created"}
          </div>
        </section>

        <section className="card">
          <h2>Upload Workbooks</h2>

          <div className="upload-group">
            <label>UC Workbook</label>

            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setUcFile(e.target.files?.[0] ?? null)}
            />

            {ucFile && <p>{ucFile.name}</p>}
          </div>

          <div className="upload-group">
            <label>SAP Workbook</label>

            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setSapFile(e.target.files?.[0] ?? null)}
            />

            {sapFile && <p>{sapFile.name}</p>}
          </div>

          <button
            className="primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>

          <button
            className="primary"
            onClick={handleReconcile}
            disabled={reconciling}
            style={{ marginTop: "16px" }}
          >
            {reconciling ? "Reconciling..." : "Start Reconciliation"}
          </button>
        </section>

        <section className="summary-grid">
          <div className="summary-card">
            <h3>Total UC</h3>
            <span>{summary.totalUc}</span>
          </div>

          <div className="summary-card">
            <h3>Total SAP</h3>
            <span>{summary.totalSap}</span>
          </div>

          <div className="summary-card">
            <h3>Matched</h3>
            <span>{summary.matched}</span>
          </div>

          <div className="summary-card">
            <h3>Mismatch</h3>
            <span>{summary.mismatched}</span>
          </div>

          <div className="summary-card">
            <h3>Missing UC</h3>
            <span>{summary.missingInUc}</span>
          </div>

          <div className="summary-card">
            <h3>Missing SAP</h3>
            <span>{summary.missingInSap}</span>
          </div>
        </section>

        <section className="card">
          <h2>Report</h2>

          <button
            className="primary"
            onClick={() => {
              if (!jobId) {
                alert("Create a Job first");
                return;
              }

              window.open(
                `http://localhost:3000/jobs/${jobId}/report`,
                "_blank",
              );
            }}
          >
            Download Report
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
