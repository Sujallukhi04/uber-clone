import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import App from "./App.jsx";
import SocketContext from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <SocketContext>
          <App />
        </SocketContext>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
