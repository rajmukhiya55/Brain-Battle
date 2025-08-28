import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // make sure this file exists

export default function Home() {
  const navigate = useNavigate();

  const handleSectionNavigation = (sectionId) => {
    navigate("/", { state: { sectionId } });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h2>🧠 Ready to Test Your Brain?</h2>
          <p>
            Take exciting quizzes or create your own.
            <br />
            Compete, learn, and have fun.
          </p>

          {/* Take a Quiz Dropdown */}
          <div className="btn-group me-3">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Take a Quiz
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("mcq-quiz")}
                >
                  MCQ Quizzes
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("timed-quiz")}
                >
                  Timed Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Create a Quiz Dropdown */}
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Create a Quiz
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() =>
                    handleSectionNavigation("general-knowledge-quiz")
                  }
                >
                  General Knowledge
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("history-quiz")}
                >
                  History
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("geography-quiz")}
                >
                  Geography
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("science-quiz")}
                >
                  Science
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("sports-quiz")}
                >
                  Sports
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("animals-quiz")}
                >
                  Animals
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSectionNavigation("otherquiztemplate")}
                >
                  Other Quiz
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-img">
          <img src="/home.jpg" alt="Quiz Illustration" />
        </div>
      </div>

      {/* Quiz Categories */}
      <h3 className="text-center mt-5">Quiz Categories</h3>
      <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
        <div className="category-card bg-success-subtle text-center">
          <h5>General Knowledge</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("general-knowledge-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-warning-subtle text-center">
          <h5>History</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("history-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-danger-subtle text-center">
          <h5>Science</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("science-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-success-subtle text-center">
          <h5>Sports</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("sports-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-warning-subtle text-center">
          <h5>Geography</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("geography-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-danger-subtle text-center">
          <h5>Animals</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("animals-quiz")}
          >
            Start
          </button>
        </div>

        <div className="category-card bg-warning-subtle text-center">
          <h5>Other Quiz</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSectionNavigation("otherquiztemplate")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
