'use client';
import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import Video1 from '../components/Video1';
interface Unit1Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit1: React.FC<Unit1Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const unit1Quiz = [
    {
      question: "What does Vite mean in French?",
      options: ["Fast", "Quick", "Speed", "Build"],
      correctAnswer: 1,
      explanation: "Vite is French for 'quick', reflecting its lightning-fast build and development speed."
    },
    {
      question: "Which tool does Vite use for pre-bundling dependencies?",
      options: ["Webpack", "Rollup", "esbuild", "Parcel"],
      correctAnswer: 2,
      explanation: "Vite uses esbuild, a Go-based bundler that's 10-100x faster than JavaScript-based bundlers."
    },
    {
      question: "What is the main advantage of Vite in development mode?",
      options: ["Smaller bundle size", "Native ES modules", "Better TypeScript support", "More plugins"],
      correctAnswer: 1,
      explanation: "Vite serves code as native ES modules in development, eliminating the need for bundling and enabling instant server start."
    },
    {
      question: "Which bundler does Vite use for production builds?",
      options: ["Webpack", "Rollup", "esbuild", "Parcel"],
      correctAnswer: 1,
      explanation: "Vite uses Rollup for production builds, which provides excellent tree-shaking and code-splitting capabilities."
    },
    {
      question: "What is HMR in the context of Vite?",
      options: ["Hot Module Replacement", "High Memory Requirement", "Hybrid Module Resolution", "HTTP Module Request"],
      correctAnswer: 0,
      explanation: "HMR stands for Hot Module Replacement, which allows modules to be updated in the browser without a full page reload."
    }
  ];

  const setupQuiz = [
    {
      question: "What is the command to create a new Vite React project?",
      options: ["npm init vite", "npm create vite@latest", "npm install vite", "vite create app"],
      correctAnswer: 1,
      explanation: "The command 'npm create vite@latest' is used to scaffold a new Vite project."
    },
    {
      question: "What is the default port for Vite development server?",
      options: ["3000", "8080", "5173", "4200"],
      correctAnswer: 2,
      explanation: "Vite uses port 5173 by default for the development server."
    },
    {
      question: "Where is the entry HTML file located in a Vite project?",
      options: ["public/index.html", "src/index.html", "index.html (root)", "build/index.html"],
      correctAnswer: 2,
      explanation: "Unlike Create React App, Vite places index.html in the project root, not in the public folder."
    },
    {
      question: "Which command starts the Vite development server?",
      options: ["npm start", "npm run dev", "npm run serve", "vite start"],
      correctAnswer: 1,
      explanation: "The command 'npm run dev' starts the Vite development server."
    },
    {
      question: "What folder contains your React components in a Vite project?",
      options: ["components/", "src/", "app/", "public/"],
      correctAnswer: 1,
      explanation: "The src/ folder contains all your React components and application code."
    }
  ];

  const configQuiz = [
    {
      question: "What file is used to configure Vite?",
      options: ["vite.config.js", "webpack.config.js", "config.json", "settings.js"],
      correctAnswer: 0,
      explanation: "vite.config.js is the configuration file for Vite projects."
    },
    {
      question: "How do you change the development server port in Vite?",
      options: ["In package.json", "In vite.config.js server settings", "In .env file only", "Command line flag only"],
      correctAnswer: 1,
      explanation: "You configure the port in vite.config.js under the server.port option."
    },
    {
      question: "What prefix is used for environment variables in Vite?",
      options: ["REACT_APP_", "VITE_", "ENV_", "APP_"],
      correctAnswer: 1,
      explanation: "Vite uses the VITE_ prefix for environment variables that should be exposed to the client."
    },
    {
      question: "Which plugin provides React support in Vite?",
      options: ["vite-react", "@vitejs/plugin-react", "react-vite-plugin", "vite-plugin-react"],
      correctAnswer: 1,
      explanation: "@vitejs/plugin-react is the official plugin that provides React support with Fast Refresh."
    },
    {
      question: "What is the purpose of path aliases in Vite?",
      options: ["Faster builds", "Shorter import paths", "Better performance", "Automatic code splitting"],
      correctAnswer: 1,
      explanation: "Path aliases create shortcuts for imports, making them shorter and more maintainable (e.g., @components instead of ../../components)."
    }
  ];

  const practiceQuiz1 = [
    {
      question: "What command creates a new Vite project with React template?",
      options: ["npm init react-app", "npm create vite@latest -- --template react", "npx create-react-app", "vite new react"],
      correctAnswer: 1,
      explanation: "The command 'npm create vite@latest -- --template react' scaffolds a new Vite project with React."
    },
    {
      question: "Where should you place static assets like images in a Vite project?",
      options: ["src/assets/", "public/", "static/", "images/"],
      correctAnswer: 1,
      explanation: "Static assets that don't need processing should go in the public/ folder."
    },
    {
      question: "How do you import a component in React?",
      options: ["require('./Component')", "import Component from './Component'", "include './Component'", "use './Component'"],
      correctAnswer: 1,
      explanation: "ES6 import syntax is used: import Component from './Component'"
    },
    {
      question: "What file extension is used for React components?",
      options: [".js or .jsx", ".react", ".component", ".rc"],
      correctAnswer: 0,
      explanation: "React components use .js or .jsx file extensions (.tsx for TypeScript)."
    },
    {
      question: "How do you configure a custom port in vite.config.js?",
      options: ["port: 3000", "server: { port: 3000 }", "dev: { port: 3000 }", "config: { port: 3000 }"],
      correctAnswer: 1,
      explanation: "Port is configured in the server object: server: { port: 3000 }"
    }
  ];

  const practiceQuiz2 = [
    {
      question: "What is TypeScript?",
      options: ["A JavaScript framework", "A superset of JavaScript with static typing", "A CSS preprocessor", "A build tool"],
      correctAnswer: 1,
      explanation: "TypeScript is a superset of JavaScript that adds static type checking."
    },
    {
      question: "Which library is commonly used for routing in React?",
      options: ["react-navigation", "react-router-dom", "react-routes", "react-path"],
      correctAnswer: 1,
      explanation: "react-router-dom is the standard routing library for React web applications."
    },
    {
      question: "What is Tailwind CSS?",
      options: ["A JavaScript library", "A utility-first CSS framework", "A React component library", "A build tool"],
      correctAnswer: 1,
      explanation: "Tailwind CSS is a utility-first CSS framework for rapid UI development."
    },
    {
      question: "How do you install a package with npm?",
      options: ["npm add package-name", "npm get package-name", "npm install package-name", "npm download package-name"],
      correctAnswer: 2,
      explanation: "Use 'npm install package-name' to install packages."
    },
    {
      question: "What is CSS Modules?",
      options: ["A CSS framework", "Scoped CSS for components", "A preprocessor", "A build tool"],
      correctAnswer: 1,
      explanation: "CSS Modules provide locally scoped CSS by default, preventing style conflicts."
    }
  ];

  const milestoneQuiz1 = [
    {
      question: "What is a React component?",
      options: ["A CSS file", "A reusable piece of UI", "A database", "A server"],
      correctAnswer: 1,
      explanation: "React components are reusable, self-contained pieces of UI."
    },
    {
      question: "What hook is used for managing state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1,
      explanation: "useState is the primary hook for managing component state."
    },
    {
      question: "How do you store data in the browser that persists after refresh?",
      options: ["sessionStorage", "localStorage", "cookies", "All of the above"],
      correctAnswer: 3,
      explanation: "All three methods can persist data, but localStorage is most commonly used for client-side storage."
    },
    {
      question: "What is responsive design?",
      options: ["Fast loading websites", "Websites that adapt to different screen sizes", "Interactive websites", "Animated websites"],
      correctAnswer: 1,
      explanation: "Responsive design ensures websites work well on all device sizes."
    },
    {
      question: "What is the purpose of props in React?",
      options: ["To style components", "To pass data between components", "To manage state", "To handle events"],
      correctAnswer: 1,
      explanation: "Props are used to pass data from parent to child components."
    }
  ];

  const milestoneQuiz2 = [
    {
      question: "What is authentication?",
      options: ["Styling a website", "Verifying user identity", "Database management", "API testing"],
      correctAnswer: 1,
      explanation: "Authentication is the process of verifying a user's identity."
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Process Integration", "Application Process Interface"],
      correctAnswer: 0,
      explanation: "API stands for Application Programming Interface."
    },
    {
      question: "What is the purpose of loading states?",
      options: ["To make the app slower", "To show users that data is being fetched", "To add animations", "To save data"],
      correctAnswer: 1,
      explanation: "Loading states provide feedback to users while data is being fetched."
    },
    {
      question: "What is error handling?",
      options: ["Ignoring errors", "Managing and responding to errors gracefully", "Creating errors", "Logging errors only"],
      correctAnswer: 1,
      explanation: "Error handling involves catching and managing errors to provide a good user experience."
    },
    {
      question: "What is code splitting?",
      options: ["Dividing code into multiple files", "Loading code only when needed", "Removing unused code", "Compressing code"],
      correctAnswer: 1,
      explanation: "Code splitting loads code on-demand, improving initial load time."
    }
  ];

  const asapQuiz = [
    {
      question: "What should be included in a well-structured React project?",
      options: ["Only one component", "Organized folder structure with multiple components", "All code in one file", "No configuration files"],
      correctAnswer: 1,
      explanation: "A good project has an organized structure with components separated by concern."
    },
    {
      question: "What is routing in a React application?",
      options: ["Styling components", "Navigating between different pages/views", "Managing state", "Fetching data"],
      correctAnswer: 1,
      explanation: "Routing enables navigation between different views in a single-page application."
    },
    {
      question: "Why is code documentation important?",
      options: ["It makes code slower", "It helps others understand your code", "It's not important", "It increases file size"],
      correctAnswer: 1,
      explanation: "Documentation helps other developers (and your future self) understand the code."
    },
    {
      question: "What is component reusability?",
      options: ["Using the same component in multiple places", "Copying code", "Deleting components", "Renaming components"],
      correctAnswer: 0,
      explanation: "Reusable components can be used in multiple places, reducing code duplication."
    },
    {
      question: "What command builds your Vite project for production?",
      options: ["npm run dev", "npm run build", "npm start", "npm compile"],
      correctAnswer: 1,
      explanation: "'npm run build' creates an optimized production build."
    }
  ];

  const reviewQuiz = [
    {
      question: "What is the main advantage of using Vite over Create React App?",
      options: ["More features", "Faster development experience", "Better documentation", "Larger community"],
      correctAnswer: 1,
      explanation: "Vite provides significantly faster development experience with instant server start and HMR."
    },
    {
      question: "What does HMR stand for?",
      options: ["High Memory Requirement", "Hot Module Replacement", "Hybrid Module Resolution", "HTTP Module Request"],
      correctAnswer: 1,
      explanation: "HMR (Hot Module Replacement) updates modules without full page reload."
    },
    {
      question: "Where is the entry HTML file located in a Vite project?",
      options: ["src/index.html", "public/index.html", "index.html (root)", "build/index.html"],
      correctAnswer: 2,
      explanation: "Vite places index.html in the project root, unlike CRA which uses public/."
    },
    {
      question: "What is the purpose of vite.config.js?",
      options: ["To store data", "To configure Vite settings", "To write components", "To manage state"],
      correctAnswer: 1,
      explanation: "vite.config.js is used to customize Vite's behavior and settings."
    },
    {
      question: "What have you learned in Module 1?",
      options: ["Only theory", "Setting up and configuring Vite with React", "Backend development", "Database management"],
      correctAnswer: 1,
      explanation: "Module 1 covered setting up, configuring, and building React apps with Vite."
    }
  ];



  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.1</div>
              <div className="lesson-title-main">
                <h1>Setting up a simple React app using Vite - An introduction</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Welcome to Modern React Development with Vite</h3>

              <Video1 videoId={"NDXU2MMNBLY"} onComplete={() => setVideoCompleted(true)}></Video1>

              <div className="mt-8">
                <Quiz
                  title="Vite Introduction Quiz"
                  questions={unit1Quiz}
                  subject="FSWD"
                  unitId={1}
                  moduleId={1}
                  isLocked={!videoCompleted}
                />
              </div>

              <div className="navigation-buttons">
                <button onClick={onBack} className="prev-module-btn">← Back to Overview</button>
                <button onClick={() => setCurrentModule(2)} className="next-module-btn">Deep-dive Part #1 →</button>
              </div>
            </section>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.2</div>
              <div className="lesson-title-main">
                <h1>Setting up a simple React app using Vite - Deep-dive part #1</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Installing and Setting Up Vite</h3>
              <div className="theory-box">
                <p>Let's get hands-on! In this module, we'll walk through the complete setup process for creating a React application with Vite.</p>
              </div>

              <h4>Step 1: Prerequisites Check</h4>
              <div className="example-box">
                <p>Before we begin, ensure you have:</p>
                <ul>
                  <li><strong>Node.js:</strong> Version 14.18+ or 16+ installed</li>
                  <li><strong>npm or yarn:</strong> Package manager (comes with Node.js)</li>
                  <li><strong>Code editor:</strong> VS Code recommended</li>
                  <li><strong>Terminal:</strong> Command line access</li>
                </ul>
              </div>

              <h4>Step 2: Creating Your First Vite Project</h4>
              <div className="theory-box">
                <h5>Using npm</h5>
                <p><code>npm create vite@latest my-react-app -- --template react</code></p>

                <h5>Using yarn</h5>
                <p><code>yarn create vite my-react-app --template react</code></p>

                <h5>What This Command Does</h5>
                <ul>
                  <li>Creates a new directory with your project name</li>
                  <li>Sets up the basic Vite configuration</li>
                  <li>Installs React and React DOM</li>
                  <li>Creates a starter template with example components</li>
                </ul>
              </div>

              <h4>Step 3: Understanding the Project Structure</h4>
              <div className="example-box">
                <p>Your new Vite project contains:</p>
                <ul>
                  <li><strong>node_modules/:</strong> All dependencies</li>
                  <li><strong>public/:</strong> Static assets (images, fonts)</li>
                  <li><strong>src/:</strong> Your React components and code</li>
                  <li><strong>index.html:</strong> Entry point (in root, not public!)</li>
                  <li><strong>package.json:</strong> Project configuration and scripts</li>
                  <li><strong>vite.config.js:</strong> Vite-specific settings</li>
                </ul>
              </div>

              <h4>Step 4: Installing Dependencies</h4>
              <div className="theory-box">
                <p>Navigate to your project and install dependencies:</p>
                <p><code>cd my-react-app</code></p>
                <p><code>npm install</code></p>
              </div>

              <h4>Step 5: Starting the Development Server</h4>
              <div className="example-box">
                <p>Run the development server:</p>
                <p><code>npm run dev</code></p>
                <p>Your app will be available at <code>http://localhost:5173</code></p>
              </div>
            </section>

            <div className="video-embed">
              <h4>Vite Setup Tutorial</h4>
              <p>Step-by-step guide to setting up Vite with React.</p>
              <iframe width="50%" height="300" src="https://www.youtube.com/embed/89NJdbYTgJ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <Quiz title="Vite Setup Quiz" questions={setupQuiz} subject="FSWD" unitId={1} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← An introduction</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">Deep-dive Part #2 →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.3</div>
              <div className="lesson-title-main">
                <h1>Setting up a simple React app using Vite - Deep-dive part #2</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Configuring and Customizing Vite</h3>
              <div className="theory-box">
                <p>Now that your project is running, let's explore configuration options and best practices.</p>
              </div>

              <h4>Understanding vite.config.js</h4>
              <div className="example-box">
                <p>The configuration file controls Vite's behavior:</p>
                <ul>
                  <li><strong>plugins:</strong> Add functionality (React, TypeScript, etc.)</li>
                  <li><strong>server:</strong> Dev server settings (port, proxy)</li>
                  <li><strong>build:</strong> Production build options</li>
                  <li><strong>resolve:</strong> Module resolution settings</li>
                </ul>
              </div>

              <h4>Essential Configuration Options</h4>
              <div className="theory-box">
                <h5>Changing the Port</h5>
                <p>Customize your development server port in vite.config.js</p>

                <h5>Setting Up Path Aliases</h5>
                <p>Create shortcuts for imports (e.g., @components instead of ../../components)</p>

                <h5>Environment Variables</h5>
                <p>Use .env files for different environments (development, production)</p>
              </div>

              <h4>Adding Popular Plugins</h4>
              <div className="example-box">
                <ul>
                  <li><strong>@vitejs/plugin-react:</strong> React support with Fast Refresh</li>
                  <li><strong>vite-plugin-svgr:</strong> Import SVGs as React components</li>
                  <li><strong>vite-plugin-pwa:</strong> Progressive Web App support</li>
                  <li><strong>vite-tsconfig-paths:</strong> TypeScript path mapping</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Vite Configuration Deep Dive</h4>
              <p>Advanced configuration and customization options.</p>
              <iframe width="50%" height="300" src="https://www.youtube.com/embed/VAeRhmpcWEQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <Quiz title="Vite Configuration Quiz" questions={configQuiz} subject="FSWD" unitId={1} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← Deep-dive Part #1</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">Practice Assignment #1 →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.4</div>
              <div className="lesson-title-main">
                <h1>Practice assignment #1</h1>
              </div>
            </div>

           <section className="content-section">
              <Video1 videoId={"dza65WX0qU8"} onComplete={() => setVideoCompleted(true)}></Video1>
            </section>

             <div className="mt-8">
                <Quiz
                  title="Vite Introduction Quiz"
                  questions={unit1Quiz}
                  subject="FSWD"
                  unitId={1}
                  moduleId={4}
                  isLocked={!videoCompleted}
                />
              </div>
            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← Deep-dive Part #2</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Practice Assignment #2 →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.5</div>
              <div className="lesson-title-main">
                <h1>Practice assignment #2</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Advanced Vite Configuration</h3>
              <div className="theory-box">
                <p>Build on your previous assignment with more advanced features.</p>
              </div>

              <h4>Assignment Tasks</h4>
              <div className="example-box">
                <ul>
                  <li>Add TypeScript support</li>
                  <li>Install and configure a UI library (Material-UI or Chakra)</li>
                  <li>Set up CSS modules or Tailwind CSS</li>
                  <li>Create a multi-page application with routing</li>
                  <li>Optimize build configuration</li>
                </ul>
              </div>

              <h4>Reference: StackBlitz Advanced Template</h4>
              <div className="example-box">
                <p>Use this StackBlitz template with routing as a reference:</p>
                <iframe src="https://stackblitz.com/edit/react?embed=1&file=src/App.js" width="100%" height="500" frameBorder="0"></iframe>
              </div>
            </section>

            <Quiz title="Practice Assignment #2 Quiz" questions={practiceQuiz2} subject="FSWD" unitId={1} moduleId={5} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Practice Assignment #1</button>
              <button onClick={() => setCurrentModule(6)} className="next-module-btn">Follow-along Milestone #15 →</button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.6</div>
              <div className="lesson-title-main">
                <h1>Follow-along project milestone #15</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Building a Real-World Project</h3>
              <div className="theory-box">
                <p>Follow along as we build a complete React application using Vite.</p>
              </div>

              <h4>Project Overview</h4>
              <div className="example-box">
                <p>We'll create a task management application with:</p>
                <ul>
                  <li>Component-based architecture</li>
                  <li>State management with hooks</li>
                  <li>Local storage integration</li>
                  <li>Responsive design</li>
                </ul>
              </div>
            </section>

            <Quiz title="Milestone #15 Quiz" questions={milestoneQuiz1} subject="FSWD" unitId={1} moduleId={6} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(5)} className="prev-module-btn">← Practice Assignment #2</button>
              <button onClick={() => setCurrentModule(7)} className="next-module-btn">Follow-along Milestone #16 →</button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.7</div>
              <div className="lesson-title-main">
                <h1>Follow-along project milestone #16</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Enhancing Your Project</h3>
              <div className="theory-box">
                <p>Continue building on milestone #15 with advanced features.</p>
              </div>

              <h4>New Features</h4>
              <div className="example-box">
                <ul>
                  <li>Add authentication flow</li>
                  <li>Implement API integration</li>
                  <li>Add loading states and error handling</li>
                  <li>Optimize performance</li>
                </ul>
              </div>
            </section>

            <Quiz title="Milestone #16 Quiz" questions={milestoneQuiz2} subject="FSWD" unitId={1} moduleId={7} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(6)} className="prev-module-btn">← Follow-along Milestone #15</button>
              <button onClick={() => setCurrentModule(8)} className="next-module-btn">ASAP Project →</button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.8</div>
              <div className="lesson-title-main">
                <h1>Assignment | ASAP Project - Setting up React app</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Final Project Assignment</h3>
              <div className="theory-box">
                <p>Create a complete React application using Vite from scratch.</p>
              </div>

              <h4>Project Requirements</h4>
              <div className="example-box">
                <ul>
                  <li>Set up a new Vite React project</li>
                  <li>Configure development environment</li>
                  <li>Create at least 5 components</li>
                  <li>Implement routing</li>
                  <li>Add styling (CSS/Tailwind/styled-components)</li>
                  <li>Ensure the app runs smoothly</li>
                </ul>
              </div>

              <h4>Evaluation Criteria</h4>
              <div className="theory-box">
                <ul>
                  <li>Code quality and organization</li>
                  <li>Proper use of React hooks</li>
                  <li>Component reusability</li>
                  <li>Performance optimization</li>
                  <li>Documentation</li>
                </ul>
              </div>

              <h4>Reference: StackBlitz Full Project</h4>
              <div className="example-box">
                <p>Use this complete StackBlitz project as a reference:</p>
                <iframe src="https://stackblitz.com/edit/react?embed=1&file=src/App.js" width="100%" height="500" frameBorder="0"></iframe>
              </div>
            </section>

            <Quiz title="ASAP Project Quiz" questions={asapQuiz} subject="FSWD" unitId={1} moduleId={8} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(7)} className="prev-module-btn">← Follow-along Milestone #16</button>
              <button onClick={() => setCurrentModule(9)} className="next-module-btn">Knowledge Review →</button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.9</div>
              <div className="lesson-title-main">
                <h1>Knowledge review #5</h1>
              </div>
            </div>

            <section className="content-section">
              <h3>Module 1 Summary</h3>
              <div className="theory-box">
                <p>Congratulations on completing Module 1! Let's review what you've learned.</p>
              </div>

              <h4>Key Takeaways</h4>
              <div className="example-box">
                <ul>
                  <li>Vite is a fast, modern build tool for React</li>
                  <li>Setting up a Vite project is quick and easy</li>
                  <li>Configuration options allow customization</li>
                  <li>Vite provides excellent developer experience</li>
                  <li>Production builds are optimized automatically</li>
                </ul>
              </div>

              <h4>Self-Assessment Questions</h4>
              <div className="theory-box">
                <p>Test your understanding:</p>
                <ul>
                  <li>Can you create a Vite React project from scratch?</li>
                  <li>Do you understand the project structure?</li>
                  <li>Can you configure vite.config.js?</li>
                  <li>Are you comfortable with environment variables?</li>
                  <li>Can you add plugins to extend functionality?</li>
                </ul>
              </div>
            </section>

            <Quiz title="Module 1 Review Quiz" questions={reviewQuiz} subject="FSWD" unitId={1} moduleId={9} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(8)} className="prev-module-btn">← ASAP Project</button>
              <button onClick={onBack} className="next-module-btn">Back to Overview →</button>
            </div>
          </div>
        );

      default:
        return <div>Module not found</div>;
    }
  };

  return <div className="unit-container">{renderModule()}</div>;
};

export default Unit1;
