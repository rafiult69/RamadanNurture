import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Route } from 'react-router-dom'; // Added import for Route

createRoot(document.getElementById("root")!).render(<App />);