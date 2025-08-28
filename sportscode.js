import React, { useState } from 'react';
import './quiztemplate.css';
import { useNavigate } from 'react-router-dom';

const SportsCode = ({ template, setSelectedTemplate }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  // ✅ New: state for share link and modal visibility
  const [shareLink, setShareLink] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    } else {
      alert('You can only add up to 10 options.');
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 4) {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
      if (parseInt(correctAnswer) === index) {
        setCorrectAnswer('');
      }
    } else {
      alert('Minimum 4 options are required.');
    }
  };

  const handleAddOrUpdateQuestion = () => {
    const filledOptions = options.filter(opt => opt.trim() !== '');
    if (question && filledOptions.length >= 4 && correctAnswer !== '') {
      const newQuestion = {
        question,
        options,
        correctAnswer: options[correctAnswer]
      };

      if (editingIndex !== null) {
        const updatedList = [...questionsList];
        updatedList[editingIndex] = newQuestion;
        setQuestionsList(updatedList);
        setEditingIndex(null);
      } else {
        setQuestionsList([...questionsList, newQuestion]);
      }

      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } else {
      alert('Please fill the question, any 4 options and mark the correct one.');
    }
  };

  const handleSubmitQuiz = () => {
    const quizId = Date.now(); // unique ID

    const quizData = {
      id: quizId,
      category: "sports",
      type: "mcq",
      templateId: template.id || null,
      templateName: template.name || '',
      templateImage: template.image || '',
      questions: questionsList,
    };

    // Save to localStorage with correct key
    const existingQuizzes = JSON.parse(localStorage.getItem("sportsQuizzes")) || [];
    existingQuizzes.push(quizData);
    localStorage.setItem("sportsQuizzes", JSON.stringify(existingQuizzes));

    // Generate shareable link
    const link = `${window.location.origin}/mcqquiz?quizId=${quizId}`;
    setShareLink(link);
    setShowModal(true); // ✅ Show modal popup
  };

  const handleLoadQuestion = (index) => {
    const q = questionsList[index];
    setQuestion(q.question);
    setOptions(q.options);
    setCorrectAnswer(q.options.findIndex(opt => opt === q.correctAnswer));
    setEditingIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updated = [...questionsList];
    updated.splice(index, 1);
    setQuestionsList(updated);
    if (previewIndex >= updated.length) {
      setPreviewIndex(Math.max(0, updated.length - 1));
    }
  };

  const previewQuestion = questionsList[previewIndex];

  return (
    <div className="container-fluid p-3 quiz-container">
      {/* Background Section */}
      <div
        className="quiz-bg-section p-4 rounded"
        style={{
          backgroundImage: `url(${template.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h3 className="fw-bold text-white text-center mb-3 template-heading">
          CREATE YOUR SPORTS QUIZ
        </h3>

        {/* Transparent input block */}
        <div className="bg-dark bg-opacity-50 p-3 rounded question-block">
          <label className="text-white">Question:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Enter your quiz question"
          />

          <div className="mt-2 options-block">
            {options.map((opt, idx) => (
              <div key={idx} className="d-flex align-items-center mb-2 flex-wrap">
                <span className="text-white me-2">{idx + 1}.</span>
                <input
                  type="text"
                  className="form-control me-2 small-option-input"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                />
                <input
                  type="radio"
                  name="correctOption"
                  className="form-check-input me-1"
                  value={idx}
                  checked={parseInt(correctAnswer) === idx}
                  onChange={e => setCorrectAnswer(e.target.value)}
                />
                <label className="text-white me-2">Correct</label>
                {options.length > 4 && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveOption(idx)}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddOption} className="btn btn-sm btn-outline-light mt-2">
              ➕ Add More Option
            </button>
          </div>
        </div>

        {/* Button group */}
        <div className="mt-3 button-group">
          <button className="btn btn-secondary" onClick={handleAddOrUpdateQuestion}>
            {editingIndex !== null ? 'Update Question' : 'Next Question'}
          </button>

          <button
            className="btn btn-outline-light back-to-template-btn"
            onClick={() => setSelectedTemplate(null)}
          >
            ⬅ Back to Template Selection
          </button>

          <button className="btn btn-primary" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">🎉 Quiz Submitted!</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p>Share this quiz with your friends:</p>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={shareLink}
                  readOnly
                  onClick={(e) => e.target.select()}
                />
                <button
                  className="btn btn-sm btn-outline-light mb-3"
                  onClick={() => navigator.clipboard.writeText(shareLink)}
                >
                  📋 Copy Link
                </button>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">WhatsApp</a>
                  <a href={`https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-sm">Instagram</a>
                  <a href={`sms:?body=${encodeURIComponent(shareLink)}`} className="btn btn-info btn-sm">SMS</a>
                  <a href={`mailto:?subject=Try this Quiz&body=${encodeURIComponent(shareLink)}`} className="btn btn-primary btn-sm">Email</a>
                  <a href={`https://t.me/share/url?url=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Telegram</a>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div
        className="mt-4 p-4 rounded"
        style={{
          backgroundImage: `url(${template.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <h3 className="fw-bold text-white text-center mb-3 template-heading">QUIZ PREVIEW</h3>
        {questionsList.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <div className="bg-dark bg-opacity-75 card p-3 text-white">
            <strong>Q{previewIndex + 1}:</strong> {previewQuestion.question}
            <ul>
              {previewQuestion.options.map((opt, idx) => (
                <li
                  key={idx}
                  style={{
                    fontWeight: previewQuestion.correctAnswer === opt ? 'bold' : 'normal',
                    color: previewQuestion.correctAnswer === opt ? 'lightgreen' : 'white'
                  }}
                >
                  {idx + 1}. {opt}
                </li>
              ))}
            </ul>

            <div className="mt-3 preview-buttons">
              <button
                className="btn btn-outline-light"
                onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))}
                disabled={previewIndex === 0}
              >
                ⬅ Previous
              </button>

              <button className="btn btn-outline-warning" onClick={() => handleLoadQuestion(previewIndex)}>
                ✏️ Edit
              </button>

              <button className="btn btn-outline-danger" onClick={() => handleDeleteQuestion(previewIndex)}>
                🗑️ Delete
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => setPreviewIndex(Math.min(questionsList.length - 1, previewIndex + 1))}
                disabled={previewIndex === questionsList.length - 1}
              >
                Next ➡
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsCode;
