import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'

import "./index.css";
import App from "./App.jsx";
const clientId = import.meta.env.VITE_APP_CLIENT_ID_GOOGLE
createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
);
