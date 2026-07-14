import { useState } from "react";
import "./App.css";
import { createJob, uploadFile } from "./services/api";

function App() {
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [ucFile, setUcFile] = useState<File | null>(null);
  const [sapFile, setSapFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleCreateJob() {
    try {
      setLoading(true);

      const response = await createJob();

      setJobId(response.data.id);
    } catch (error) {
      console.error(error);
      alert("Unable to create job");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
  if (!jobId) {
    alert("Create a job first");
    return;
  }

  if (!ucFile || !sapFile) {
    alert("Please select both files");
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

  return (
    <div className="app">
      <header className="hero">
        <h1>ReconHub</h1>
        <p>Intelligent Reconciliation Platform</p>
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

            {jobId || "No job created"}
          </div>
        </section>

        <section className="card">
  <h2>Upload Workbooks</h2>

  <div className="upload-group">
    <label>UC Workbook</label>

    <input
      type="file"
      accept=".xlsx"
      onChange={(e) =>
        setUcFile(e.target.files?.[0] ?? null)
      }
    />

    {ucFile && <p>{ucFile.name}</p>}
  </div>

  <div className="upload-group">
    <label>SAP Workbook</label>

    <input
      type="file"
      accept=".xlsx"
      onChange={(e) =>
        setSapFile(e.target.files?.[0] ?? null)
      }
    />

    {sapFile && <p>{sapFile.name}</p>}
  </div>

  <button
    className="primary"
    onClick={handleUpload}
    disabled={uploading}
  >
    {uploading
      ? "Uploading..."
      : "Upload Files"}
  </button>
</section>

        <section className="summary-grid">
          <div className="summary-card">
            <h3>Total UC</h3>
            <span>0</span>
          </div>

          <div className="summary-card">
            <h3>Total SAP</h3>
            <span>0</span>
          </div>

          <div className="summary-card">
            <h3>Matched</h3>
            <span>0</span>
          </div>

          <div className="summary-card">
            <h3>Mismatch</h3>
            <span>0</span>
          </div>

          <div className="summary-card">
            <h3>Missing UC</h3>
            <span>0</span>
          </div>

          <div className="summary-card">
            <h3>Missing SAP</h3>
            <span>0</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;