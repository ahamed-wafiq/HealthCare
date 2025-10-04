import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from '@clerk/clerk-react'


const clerk= import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
createRoot(document.getElementById("root")!).render(<App />);

  <ClerkProvider publishableKey={clerk}>
      <App />
    </ClerkProvider>
    