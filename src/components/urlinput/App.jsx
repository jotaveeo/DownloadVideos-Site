import React from "react";

export default function UrlInput({ url, setUrl, fetchQualities, loading }) {
  return (
    <div>
      <p>Insira o link do vídeo que deseja baixar:</p>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Cole o link do vídeo aqui"
      />
      <button onClick={fetchQualities} disabled={loading}>
        {loading ? "Processando..." : "Obter Qualidades"}
      </button>
    </div>
  );
}