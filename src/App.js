import { Suspense } from 'react';
import './App.css';
import SignInSide from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
       <Suspense fallback={<> this is Lodding... </>}>
          <Routes>
            <Route exact path="/" element={<SignInSide />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
      </Suspense>
      </Router>
    </div>
  );
}

export default App;
