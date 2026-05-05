export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        padding: "14px 24px",
        background: "var(--surface-container-low)",
        borderTop: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
        marginTop: "auto",
      }}
    >
      <p style={{ fontSize: "0.72rem", color: "var(--foreground-subtle)" }}>
        © {year} Ayaweisoft Pay. All rights reserved.
      </p>
      <p style={{ fontSize: "0.72rem", color: "var(--foreground-faint)" }}>
        Banking services provided by Mbawula Microfinance Bank.
      </p>
    </footer>
  );
}