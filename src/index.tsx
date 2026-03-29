import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@app/styles/index.css";

import App from "@/app";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
