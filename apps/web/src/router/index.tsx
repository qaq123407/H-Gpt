import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AgentPage } from "../pages/AgentPage";
import { ChatPage } from "../pages/ChatPage";
import { DashboardPage } from "../pages/DashboardPage";
import { KnowledgePage } from "../pages/KnowledgePage";
import { WorkflowPage } from "../pages/WorkflowPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "agents", element: <AgentPage /> },
      { path: "workflows", element: <WorkflowPage /> },
      { path: "knowledge", element: <KnowledgePage /> },
      { path: "chat", element: <ChatPage /> }
    ]
  }
]);
