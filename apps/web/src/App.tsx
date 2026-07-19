import { useState } from "react";
import "./App.css";
import {
  createJob,
  uploadFile,
  reconcileJob,
  generateEmamiReport,
} from "./services/api";

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

  const [summary, setSummary] = useState<Summary>({
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

  async function handleGenerateEmamiReport() {
    if (!jobId) {
      alert("Create a Job first");
      return;
    }

    try {
      await generateEmamiReport(jobId);

      alert("Emami Report Generated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to generate Emami report");
    }
  }

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="logo-section">
          <div className="logo-circle">R</div>

          <div>
            <h1>ReconHub</h1>
            <p>Emami Financial Reconciliation Dashboard</p>
          </div>
        </div>

        <div className="job-status">
          <span>Current Job</span>

          <strong>{jobId || "No Active Job"}</strong>
        </div>
      </header>

      <section className="hero-banner">
        <div className="hero-left">
          <h2>UC ↔ SAP Reconciliation</h2>

          <p>
            Upload financial workbooks, reconcile transactions, and generate an
            Emami reconciliation report.
          </p>

          <button
            className="primary-btn"
            onClick={handleCreateJob}
            disabled={loading}
          >
            {loading ? "Creating Job..." : "Create New Job"}
          </button>
        </div>

        <div className="hero-right">
          <div className="workflow-box">
            <div>1. Create Job</div>
            <div>2. Upload Files</div>
            <div>3. Reconcile</div>
            <div>4. Download Report</div>
          </div>
        </div>
      </section>
      <main className="dashboard-content">
        {/* Upload Section */}

        <section className="card upload-card">
          <div className="card-header">
            <h2>Upload Workbooks</h2>

            <span>Excel (.xlsx)</span>
          </div>

          <div className="upload-grid">
            <div className="upload-box">
              <h3>UC Workbook</h3>

              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setUcFile(e.target.files?.[0] ?? null)}
              />

              {ucFile && <div className="file-chip">{ucFile.name}</div>}
            </div>

            <div className="upload-box">
              <h3>SAP Workbook</h3>

              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setSapFile(e.target.files?.[0] ?? null)}
              />

              {sapFile && <div className="file-chip">{sapFile.name}</div>}
            </div>
          </div>

          <div className="button-row">
            <button
              className="primary-btn"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </button>

            <button
              className="secondary-btn"
              onClick={handleReconcile}
              disabled={reconciling}
            >
              {reconciling ? "Reconciling..." : "Start Reconciliation"}
            </button>

            <button className="success-btn" onClick={handleGenerateEmamiReport}>
              Generate Emami Report
            </button>
          </div>
        </section>

        {/* Statistics */}

        <section className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-title">Total UC</div>

            <div className="stat-value">{summary.totalUc}</div>
          </div>

          <div className="stat-card cyan">
            <div className="stat-title">Total SAP</div>

            <div className="stat-value">{summary.totalSap}</div>
          </div>

          <div className="stat-card green">
            <div className="stat-title">Matched</div>

            <div className="stat-value">{summary.matched}</div>
          </div>

          <div className="stat-card orange">
            <div className="stat-title">Mismatched</div>

            <div className="stat-value">{summary.mismatched}</div>
          </div>
          <div className="stat-card red">
            <div className="stat-title">Missing in UC</div>

            <div className="stat-value">{summary.missingInUc}</div>
          </div>

          <div className="stat-card gray">
            <div className="stat-title">Missing in SAP</div>

            <div className="stat-value">{summary.missingInSap}</div>
          </div>
        </section>

        {/* Job Information */}

        <section className="card">
          <div className="card-header">
            <h2>Job Information</h2>

            <span>Status</span>
          </div>

          <div className="job-info">
            <div className="info-item">
              <label>Job ID</label>

              <div className="info-value">{jobId || "No Job Created"}</div>
            </div>

            <div className="info-item">
              <label>UC Workbook</label>

              <div className="info-value">
                {ucFile ? ucFile.name : "Not Uploaded"}
              </div>
            </div>

            <div className="info-item">
              <label>SAP Workbook</label>

              <div className="info-value">
                {sapFile ? sapFile.name : "Not Uploaded"}
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}

        <section className="card">
          <div className="card-header">
            <h2>Workflow Progress</h2>

            <span>Current Session</span>
          </div>

          <div className="timeline">
            <div className={jobId ? "timeline-step active" : "timeline-step"}>
              <div className="circle">1</div>

              <div>
                <h4>Create Job</h4>
                <p>Create reconciliation session.</p>
              </div>
            </div>

            <div
              className={
                ucFile && sapFile ? "timeline-step active" : "timeline-step"
              }
            >
              <div className="circle">2</div>

              <div>
                <h4>Upload Files</h4>
                <p>Upload UC and SAP workbooks.</p>
              </div>
            </div>

            <div
              className={
                summary.totalUc > 0 ? "timeline-step active" : "timeline-step"
              }
            >
              <div className="circle">3</div>

              <div>
                <h4>Reconciliation</h4>
                <p>Compare financial transactions.</p>
              </div>
            </div>
            <div
              className={
                summary.totalUc > 0 ? "timeline-step active" : "timeline-step"
              }
            >
              <div className="circle">4</div>

              <div>
                <h4>Generate Report</h4>
                <p>Create the final Emami reconciliation report.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Statistics */}

        <section className="card">
          <div className="card-header">
            <h2>Reconciliation Overview</h2>

            <span>Summary</span>
          </div>

          <div className="overview-grid">
            <div className="overview-item">
              <h4>Total Records</h4>

              <h1>{summary.totalUc + summary.totalSap}</h1>

              <p>Combined UC & SAP entries</p>
            </div>

            <div className="overview-item">
              <h4>Successful Matches</h4>

              <h1>{summary.matched}</h1>

              <p>Automatically reconciled</p>
            </div>

            <div className="overview-item">
              <h4>Exceptions</h4>

              <h1>{summary.mismatched}</h1>

              <p>Need manual verification</p>
            </div>

            <div className="overview-item">
              <h4>Missing Records</h4>

              <h1>{summary.missingInUc + summary.missingInSap}</h1>

              <p>Available in only one source</p>
            </div>
          </div>
        </section>

        {/* Download Report */}

        <section className="card report-card">
          <div>
            <h2>Final Report</h2>

            <p>
              Download the reconciliation report generated for the current job.
            </p>
          </div>

          <button
            className="download-btn"
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

      <footer className="footer">
        <div className="footer-left">
          <h3>ReconHub</h3>
          <p>Enterprise Financial Reconciliation Platform</p>
        </div>

        <div className="footer-right">
          <span>Powered for Emami Ltd.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;