import { useState } from "react";
import "./App.css";
import UrlInput from "./components/urlinput/App.jsx";
import QualitySelector from "./components/qualitySelector/App.jsx";
import DownloadButton from "./components/downloadButton/App.jsx";

export default function App() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const fetchFormats = async () => {
    if (!url.trim() || !isValidUrl(url)) {
      setMessage("Por favor, insira uma URL válida!");
      return;
    }

    setMessage("Obtendo formatos disponíveis...");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/list-formats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormats(data.formats);
        setMessage("Formatos obtidos. Selecione um formato e clique em Baixar.");
      } else {
        const error = await response.json();
        setMessage(error.error || "Falha ao obter formatos!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocorreu um erro ao processar a solicitação!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (quality) => {
    if (!url.trim() || !isValidUrl(url)) {
      setMessage("Por favor, insira uma URL válida!");
      return;
    }

    setMessage("Processando...");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, quality }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "video.mp4";
        link.click();
        setMessage("Download iniciado!");
      } else {
        const error = await response.json();
        setMessage(error.error || "Falha ao baixar o vídeo!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocorreu um erro ao processar a solicitação!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Bia dos downloads</h1>
      <UrlInput
        url={url}
        setUrl={setUrl}
        fetchQualities={fetchFormats}
        loading={loading}
      />
      {formats.length > 0 && (
        <QualitySelector
          formats={formats}
          handleDownload={handleDownload}
        />
      )}
      <p className="message">{message}</p>
    </div>
  );
}