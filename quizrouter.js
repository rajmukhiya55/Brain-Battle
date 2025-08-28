import React, { useState, useEffect } from 'react';
import TemplateSelectorHistory from './templateselectorhistory';
import HistoryQuiz from './historycode';
import TemplateSelectorGeography from './templateselectorgeography';
import GeographyQuiz from './geographycode';
import TemplateSelectorScience from './templateselectorscience';
import ScienceQuiz from './sciencecode';
import TemplateSelectorSports from './templateselectorsports'; 
import SportsQuiz from './sportscode';
import TemplateSelectorAnimals from './templateselectoranimals';
import AnimalsQuiz from './animalscode';

import TemplateSelectorGeneralKnowledge from './templateselectorgeneralknowledge';  // <-- import general knowledge selector
import GeneralKnowledgeQuiz from './generalknowledgecode';                           // <-- import general knowledge quiz

import TemplateSelectorOtherQuiz from './templateselectorotherquiz'; // updated import line
import OtherQuizTemplate from './otherquizcode';  // assuming your otherquizcode file exports this component

import McqQuiz from './mcqquizcode';
import TimedQuiz from './timedquizcode';
import PracticeMode from './practicemode';

import Home from './home';

export default function QuizRouter({ visibleSection, selectedTemplate, setSelectedTemplate, setVisibleSection }) {
  const [createdQuizData, setCreatedQuizData] = useState(null);

  useEffect(() => {
    if (visibleSection === 'mcq-quiz') {
      const savedHistoryQuiz = localStorage.getItem('createdHistoryQuiz');
      const savedGeographyQuiz = localStorage.getItem('createdGeographyQuiz');
      const savedScienceQuiz = localStorage.getItem('createdScienceQuiz');
      const savedSportsQuiz = localStorage.getItem('createdSportsQuiz');
      const savedAnimalsQuiz = localStorage.getItem('createdAnimalsQuiz');
      const savedGeneralKnowledgeQuiz = localStorage.getItem('createdGeneralKnowledgeQuiz');
      const savedOtherQuiz = localStorage.getItem('createdOtherQuiz');  // <-- new localStorage key for other quiz

      if (savedHistoryQuiz) {
        setCreatedQuizData(JSON.parse(savedHistoryQuiz));
      } else if (savedGeographyQuiz) {
        setCreatedQuizData(JSON.parse(savedGeographyQuiz));
      } else if (savedScienceQuiz) {
        setCreatedQuizData(JSON.parse(savedScienceQuiz));
      } else if (savedSportsQuiz) {
        setCreatedQuizData(JSON.parse(savedSportsQuiz));
      } else if (savedAnimalsQuiz) {
        setCreatedQuizData(JSON.parse(savedAnimalsQuiz));
      } else if (savedGeneralKnowledgeQuiz) {
        setCreatedQuizData(JSON.parse(savedGeneralKnowledgeQuiz));
      } else if (savedOtherQuiz) {  // <-- check for other quiz data
        setCreatedQuizData(JSON.parse(savedOtherQuiz));
      }
    }
  }, [visibleSection]);

  // Handlers to save quizzes for all categories
  const handleHistoryQuizSubmit = (quizData) => {
    localStorage.setItem('createdHistoryQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  const handleGeographyQuizSubmit = (quizData) => {
    localStorage.setItem('createdGeographyQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  const handleScienceQuizSubmit = (quizData) => {
    localStorage.setItem('createdScienceQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  const handleSportsQuizSubmit = (quizData) => {
    localStorage.setItem('createdSportsQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  const handleAnimalsQuizSubmit = (quizData) => {
    localStorage.setItem('createdAnimalsQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  const handleGeneralKnowledgeQuizSubmit = (quizData) => {
    localStorage.setItem('createdGeneralKnowledgeQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  // <-- New handler for Other Quiz
  const handleOtherQuizSubmit = (quizData) => {
    localStorage.setItem('createdOtherQuiz', JSON.stringify(quizData));
    setVisibleSection('mcq-quiz');
  };

  return (
    <div className="container mt-4">
      {!visibleSection && <Home />}

      {/* History Section */}
      {visibleSection === 'history-quiz' && !selectedTemplate && (
        <TemplateSelectorHistory onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'history-quiz' && selectedTemplate && (
        <HistoryQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleHistoryQuizSubmit}
        />
      )}

      {/* Geography Section */}
      {visibleSection === 'geography-quiz' && !selectedTemplate && (
        <TemplateSelectorGeography onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'geography-quiz' && selectedTemplate && (
        <GeographyQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleGeographyQuizSubmit}
        />
      )}

      {/* Science Section */}
      {visibleSection === 'science-quiz' && !selectedTemplate && (
        <TemplateSelectorScience onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'science-quiz' && selectedTemplate && (
        <ScienceQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleScienceQuizSubmit}
        />
      )}

      {/* Sports Section */}
      {visibleSection === 'sports-quiz' && !selectedTemplate && (
        <TemplateSelectorSports onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'sports-quiz' && selectedTemplate && (
        <SportsQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleSportsQuizSubmit}
        />
      )}

      {/* Animals Section */}
      {visibleSection === 'animals-quiz' && !selectedTemplate && (
        <TemplateSelectorAnimals onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'animals-quiz' && selectedTemplate && (
        <AnimalsQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleAnimalsQuizSubmit}
        />
      )}

      {/* General Knowledge Section */}
      {visibleSection === 'general-knowledge-quiz' && !selectedTemplate && (
        <TemplateSelectorGeneralKnowledge onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'general-knowledge-quiz' && selectedTemplate && (
        <GeneralKnowledgeQuiz
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleGeneralKnowledgeQuizSubmit}
        />
      )}

      {/* Other Quiz Section */}
      {visibleSection === 'otherquiztemplate' && !selectedTemplate && (
        <TemplateSelectorOtherQuiz onSelect={setSelectedTemplate} />
      )}
      {visibleSection === 'otherquiztemplate' && selectedTemplate && (
        <OtherQuizTemplate
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onFinalSubmit={handleOtherQuizSubmit}
        />
      )}

      {/* Other Sections */}
      {visibleSection === 'mcq-quiz' && <McqQuiz quizData={createdQuizData} />}
      {visibleSection === 'timed-quiz' && <TimedQuiz />}
      {visibleSection === 'practice-mode' && <PracticeMode />}
    </div>
  );
}
