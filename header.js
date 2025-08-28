import React, { useState } from 'react';
import Navbar from './navbar';
import QuizRouter from './quizrouter';

export default function Header() {
  const [visibleSection, setVisibleSection] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const showSection = (sectionId) => {
    setVisibleSection(sectionId);
    setSelectedTemplate(null); // Reset template on section change
  };
  return (
    <div>
      <Navbar onShowSection={showSection} />
      <QuizRouter
        visibleSection={visibleSection}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
    </div>
  );
}