import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onShowSection }) {
  const navigate = useNavigate();

  const handleSectionNavigation = (sectionId) => {
    navigate('/', { state: { sectionId } }); // Navigate to home with section info
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => onShowSection('')}>
          Brain Battle
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => onShowSection('')}>
                Home
              </Link>
            </li>

            {/* Create a Quiz Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create a Quiz
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('general-knowledge-quiz')}>
                    General Knowledge
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('history-quiz')}>
                    History
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('geography-quiz')}>
                    Geography
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('science-quiz')}>
                    Science
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('sports-quiz')}>
                    Sports
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('animals-quiz')}>
                    Animals
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('otherquiztemplate')}>
                    Other quiz 
                  </button>
                </li>
              </ul>
            </li>

            {/* Take a Quiz Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Take a Quiz
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('mcq-quiz')}>
                    MCQ Quizzes
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('timed-quiz')}>
                    Timed Quizzes
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSectionNavigation('practice-mode')}>
                    Practice Mode
                  </button>
                </li>
              </ul>
            </li>

            {/* Overall Result */}
            <li className="nav-item">
              <Link className="nav-link" to="/result">
                Overall Result
              </Link>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex">
            <Link className="btn btn-outline-primary me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
