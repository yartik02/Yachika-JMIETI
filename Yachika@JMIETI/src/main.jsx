import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/auth.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        {/* <Loader /> */}
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
