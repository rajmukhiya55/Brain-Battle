import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Mycomponents/navbar';
import QuizRouter from './Mycomponents/quizrouter';
import Result from './Mycomponents/result';
import Footer from './Mycomponents/footer'; // ✅ Added footer
import Login from "./Mycomponents/login";
import Signup from "./Mycomponents/signup";


function App() {
  const location = useLocation();
  const [visibleSection, setVisibleSection] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (location.pathname === '/' && location.state?.sectionId) {
      setVisibleSection(location.state.sectionId);
    }
  }, [location]);

  useEffect(() => {
    if (visibleSection !== 'history-quiz') {
      setSelectedTemplate(null);
    }
  }, [visibleSection]);

  useEffect(() => {
    if (visibleSection !== 'geography-quiz') {
      setSelectedTemplate(null);
    }
  }, [visibleSection]);

  return (
    <div className="App"> {/* ✅ Wrap everything in a flex column */}
      <Navbar onShowSection={setVisibleSection} />

      <div className="App-content"> {/* ✅ Flex grow for main content */}
        <Routes>
          <Route
            path="/"
            element={
              <QuizRouter
                visibleSection={visibleSection}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            }
          />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
      </div>

      <Footer /> {/* ✅ Always sticks to bottom if page is short */}
    </div>
  );
}

export default App;
