// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import "./index.css";
import TimersView from "./views/TimersView";
import DocumentationView from "./views/DocumentationView";
import PageIndex from "./components/pageIndex/PageIndex";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary"; // Import ErrorBoundary

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    children: [
      { index: true, element: <TimersView /> },
      { path: "/docs", element: <DocumentationView /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary> {/* Wrap app with ErrorBoundary */}
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
);