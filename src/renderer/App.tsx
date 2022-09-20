import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChooseForm from './pages/choose-form';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseForm />} />
      </Routes>
    </Router>
  );
}
