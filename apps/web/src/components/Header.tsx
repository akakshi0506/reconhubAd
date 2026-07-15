interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "ReconHub",
  subtitle = "Intelligent Financial Reconciliation Platform",
}: HeaderProps) {
  return (
    <header
      style={{
        background: "#1d4ed8",
        color: "white",
        padding: "40px",
        textAlign: "center",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>{title}</h1>

      <p style={{ opacity: 0.9 }}>{subtitle}</p>
    </header>
  );
}
