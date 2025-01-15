import React from "react";

export default function DownloadButton({ handleDownload, loading, selectedQuality }) {
  return (
    <button onClick={handleDownload} disabled={loading || !selectedQuality}>
      {loading ? "Processando..." : "Baixar"}
    </button>
  );
}