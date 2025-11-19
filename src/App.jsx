import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout';
import AnalyticsPage from './pages/Analytics';
import ClientsPage from './pages/Clients';
import ContentPlanningPage from './pages/ContentPlanning';
import WorkflowsPage from './pages/Workflows';
import FinancePage from './pages/Finance';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<AnalyticsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/content" element={<ContentPlanningPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/finance" element={<FinancePage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
