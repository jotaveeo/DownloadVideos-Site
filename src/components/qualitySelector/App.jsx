import React from "react";
import "./style.css"

export default function QualitySelector({ formats, handleDownload }) {
  return (
    <div>
      <p>Selecione a qualidade:</p>
      {formats.map((format) => (
        <button
          key={format.id}
          onClick={() => handleDownload(format.id)}
        >
          {format.ext} - {format.resolution}
        </button>
      ))}
    </div>
  );
}
