'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: Question[];
  subject: string;
  unitId: number;
  moduleId: number;
  isLocked?: boolean;
}

const Quiz: React.FC<QuizProps> = ({ title, questions, subject, unitId, moduleId, isLocked = false }) => {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // New state for strict mode
  const [quizStarted, setQuizStarted] = useState(false);
  const [showStartWarning, setShowStartWarning] = useState(false);
  const [terminationMessage, setTerminationMessage] = useState<string | null>(null);

  const quizRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session) {
      fetchProgress();
    } else if (session === null) {
      setLoading(false);
    }
  }, [session]);

  // Strict mode listeners
  useEffect(() => {
    if (!quizStarted || showResults) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        terminateQuiz("Quiz terminated: You switched tabs.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        terminateQuiz("Quiz terminated: You exited fullscreen mode.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [quizStarted, showResults]);

  const terminateQuiz = (reason: string) => {
    setQuizStarted(false);
    setShowStartWarning(false);
    setTerminationMessage(reason);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error("Exit fullscreen error:", err));
    }
  };

  const handleStartClick = () => {
    setTerminationMessage(null);
    setShowStartWarning(true);
  };

  const confirmStartQuiz = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().then(() => {
        setQuizStarted(true);
        setShowStartWarning(false);
      }).catch(err => {
        console.error("Error attempting to enable full-screen mode:", err);
        // Fallback: allow start even if fullscreen fails (optional, or force it)
        // For strict mode we might want to alert again
        alert("Fullscreen mode is required. Please check your browser permissions.");
      });
    } else {
      // Fallback for older browsers if needed, or just start
      setQuizStarted(true);
      setShowStartWarning(false);
    }
  };

  const fetchProgress = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/progress?userEmail=${session.user.email}&subject=${subject}`);
      const data = await res.json();
      if (data.success) {
        const progress = data.data.find((p: any) =>
          (String(p.unitId) === String(unitId) || String(p.unit_id) === String(unitId)) &&
          (String(p.moduleId) === String(moduleId) || String(p.module_id) === String(moduleId))
        );
        if (progress) {
          setPreviousScore(progress.score);
          setScore(progress.score);
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (finalScore: number) => {
    if (!session?.user?.email) return;
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: session.user.email,
          subject,
          unitId,
          moduleId,
          score: finalScore,
          totalQuestions: questions.length,
          completed: finalScore >= Math.ceil(questions.length * 0.6)
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPreviousScore(finalScore);
        }
      }
    } catch (error) {
      console.error('Failed to save progress');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    await saveProgress(correctCount);

    // Exit fullscreen when submitting
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    }

    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setScore(0);
    setQuizStarted(false);
    setShowStartWarning(true); // Skip start screen, show strict mode warning
  };

  if (loading) {
    return <div className="quiz-container">Loading...</div>;
  }

  // Warning Modal
  if (showStartWarning) {
    return (
      <div className="quiz-modal-overlay">
        <div className="quiz-modal-content">
          <h3 className="quiz-modal-title">⚠️ Fullscreen Required</h3>
          <div className="quiz-modal-text">
            This quiz requires fullscreen mode.
            <br /><br />
            <strong>Rules:</strong>
            <ul className="quiz-modal-list">
              <li>The quiz will enter fullscreen mode automatically.</li>
              <li>If you exit fullscreen, the quiz will <span className="text-danger">terminate</span>.</li>
              <li>If you switch tabs, the quiz will <span className="text-danger">terminate</span>.</li>
            </ul>
          </div>
          <div className="quiz-modal-actions">
            <button
              onClick={() => setShowStartWarning(false)}
              className="quiz-modal-btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={confirmStartQuiz}
              className="quiz-modal-btn-start"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = ((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="quiz-card-wrapper">
        <div className="quiz-card">
          <div className="quiz-card-left">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="45" r="20" fill="#FFE4B5" stroke="#2B2B2B" strokeWidth="2" />
              <circle cx="52" cy="42" r="3" fill="#2B2B2B" />
              <circle cx="68" cy="42" r="3" fill="#2B2B2B" />
              <path d="M 52 52 Q 60 58 68 52" stroke="#2B2B2B" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="35" y="65" width="50" height="40" rx="5" fill="#4CAF50" stroke="#2B2B2B" strokeWidth="2" />
              <path d="M 50 75 L 55 82 L 70 68" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="quiz-card-right">
            <div className="quiz-card-header">
              <div className="quiz-card-title-section">
                <div className="quiz-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="#4CAF50" stroke="#4CAF50" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Quiz Completed</h3>
              </div>
              <div className="quiz-best-score">
                <div className="score-label">Your Score</div>
                <div className="score-value">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="#FFB300" />
                  </svg>
                  <span>{score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)</span>
                </div>
              </div>
            </div>
            <p className="quiz-message">
              {passed
                ? "Well done! You've successfully passed this quiz."
                : "You didn't pass this time. Review the material and try again."}
            </p>
            <button className="quiz-retake-button" onClick={handleRetake}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz Interface (Fullscreen container)
  if (quizStarted) {
    return (
      <div ref={quizRef} className="quiz-fullscreen-container">
        <div className="max-w-3xl">
          <h3>{title}</h3>

          <div className="quiz-progress-fs">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <div className="question-container">
            <p className="question-text">{questions[currentQuestion].question}</p>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-navigation">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="quiz-fullscreen-btn-prev"
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="quiz-fullscreen-btn-next"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="quiz-fullscreen-btn-submit"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Start Screen (Default view embedded in page)
  if (isLocked && !showResults) {
    return null;
  }

  return (
    <div className="quiz-card-wrapper" ref={quizRef}>
      {/* We attach ref here too so we can request fullscreen on this element initially, 
            but strictly speaking we want the 'Active Quiz' return above to be what shows IN fullscreen. 
            Actually, commonly we request fullscreen on a wrapper. 
        */}
      <div className="quiz-card">
        <div className="quiz-card-left">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div className="quiz-card-right">
          <div className="quiz-card-header">
            <div className="quiz-card-title-section">
              <h3>{title}</h3>
            </div>
          </div>

          {terminationMessage && (
            <div className="quiz-termination-alert">
              {terminationMessage}
            </div>
          )}

          <p className="mb-4 text-gray-600 text-sm">
            This quiz consists of {questions.length} questions. You need 60% to pass.
            <br />
            <strong>Note:</strong> This quiz must be taken in fullscreen mode.
          </p>

          {previousScore !== null && (
            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-2 rounded inline-block">
              Previous Best: {previousScore}/{questions.length} ({Math.round((previousScore / questions.length) * 100)}%)
            </div>
          )}

          <button className="quiz-retake-button" onClick={handleStartClick}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;