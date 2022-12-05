import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSocketEvents } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';

function App() {
  useSocketEvents()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={
          <Dashboard />
        } />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
