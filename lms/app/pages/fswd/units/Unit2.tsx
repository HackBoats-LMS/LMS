'use client';
import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import Video1 from '../components/Video1';

interface Unit2Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit2: React.FC<Unit2Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const unit2Quiz = [
    {
      question: "What is the primary purpose of deploying a frontend application?",
      options: ["To make it accessible on the internet", "To compress the code", "To add more features", "To test locally"],
      correctAnswer: 0,
      explanation: "Deployment makes your application accessible to users on the internet by hosting it on a server."
    },
    {
      question: "Which command is typically used to create a production build in Vite?",
      options: ["npm start", "npm run dev", "npm run build", "npm deploy"],
      correctAnswer: 2,
      explanation: "npm run build creates an optimized production build of your Vite application."
    },
    {
      question: "What does CI/CD stand for?",
      options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Deployment", "Central Integration/Central Distribution", "Custom Integration/Custom Delivery"],
      correctAnswer: 1,
      explanation: "CI/CD stands for Continuous Integration and Continuous Deployment, automating the build and deployment process."
    },
    {
      question: "Which folder contains the production build files in a Vite project?",
      options: ["build/", "dist/", "public/", "output/"],
      correctAnswer: 1,
      explanation: "Vite outputs production build files to the dist/ folder by default."
    },
    {
      question: "What is the benefit of using a CDN for deployment?",
      options: ["Cheaper hosting", "Faster content delivery globally", "Easier development", "Better code quality"],
      correctAnswer: 1,
      explanation: "CDNs (Content Delivery Networks) distribute your content across multiple servers globally, providing faster access to users worldwide."
    }
  ];

  const vercelQuiz = [
    {
      question: "What is Vercel primarily known for?",
      options: ["Database hosting", "Frontend deployment platform", "Backend API service", "Email service"],
      correctAnswer: 1,
      explanation: "Vercel is a leading platform for deploying frontend applications with zero configuration."
    },
    {
      question: "How does Vercel detect your project type?",
      options: ["Manual configuration", "Automatically from package.json", "You must specify it", "Random guess"],
      correctAnswer: 1,
      explanation: "Vercel automatically detects your framework by analyzing package.json and project structure."
    },
    {
      question: "What happens when you push to your Git repository connected to Vercel?",
      options: ["Nothing", "Manual deployment required", "Automatic deployment", "Email notification only"],
      correctAnswer: 2,
      explanation: "Vercel automatically deploys your app whenever you push changes to the connected Git repository."
    },
    {
      question: "What is a preview deployment in Vercel?",
      options: ["Production deployment", "Deployment for each pull request", "Local preview", "Backup deployment"],
      correctAnswer: 1,
      explanation: "Preview deployments are created for each pull request, allowing you to test changes before merging."
    },
    {
      question: "Where do you set environment variables in Vercel?",
      options: ["In code files", "In .env file only", "In Vercel dashboard", "Not possible"],
      correctAnswer: 2,
      explanation: "Environment variables are configured in the Vercel dashboard under project settings."
    }
  ];

  const netlifyQuiz = [
    {
      question: "What is unique about Netlify's deployment options?",
      options: ["CLI only", "Git only", "Drag-and-drop support", "FTP only"],
      correctAnswer: 2,
      explanation: "Netlify offers drag-and-drop deployment in addition to Git integration and CLI."
    },
    {
      question: "What file is used to configure Netlify deployments?",
      options: ["netlify.toml", "config.json", "deploy.yml", "netlify.config.js"],
      correctAnswer: 0,
      explanation: "netlify.toml is the configuration file for Netlify deployments."
    },
    {
      question: "What are Netlify Functions?",
      options: ["Frontend components", "Serverless backend functions", "CSS utilities", "Testing tools"],
      correctAnswer: 1,
      explanation: "Netlify Functions are serverless functions that add backend capabilities to your static site."
    },
    {
      question: "How do you handle form submissions in Netlify?",
      options: ["External service required", "Built-in form handling", "Not possible", "Manual backend needed"],
      correctAnswer: 1,
      explanation: "Netlify has built-in form handling that works without additional backend code."
    },
    {
      question: "What is Netlify's redirect configuration used for?",
      options: ["Styling", "SPA routing and URL rewrites", "Database queries", "Image optimization"],
      correctAnswer: 1,
      explanation: "Redirects handle SPA routing and URL rewrites for proper navigation."
    }
  ];

  const practiceQuiz1 = [
    {
      question: "What should you do before deploying to production?",
      options: ["Delete all files", "Test the production build locally", "Remove all dependencies", "Change all code"],
      correctAnswer: 1,
      explanation: "Always test your production build locally using npm run preview before deploying."
    },
    {
      question: "What command previews the production build locally?",
      options: ["npm run dev", "npm run preview", "npm start", "npm test"],
      correctAnswer: 1,
      explanation: "npm run preview serves the production build locally for testing."
    },
    {
      question: "Why might your deployed app show a blank page?",
      options: ["Too many users", "Incorrect base path or routing issues", "Server is slow", "Code is too large"],
      correctAnswer: 1,
      explanation: "Blank pages often result from incorrect base paths or routing configuration issues."
    },
    {
      question: "What is the purpose of a custom domain?",
      options: ["Faster loading", "Professional branding with your own URL", "Better security", "More storage"],
      correctAnswer: 1,
      explanation: "Custom domains provide professional branding instead of using platform subdomains."
    },
    {
      question: "How do you connect a Git repository to Vercel?",
      options: ["Email the code", "Through Vercel dashboard import", "FTP upload", "Not possible"],
      correctAnswer: 1,
      explanation: "You import your Git repository through the Vercel dashboard to enable automatic deployments."
    }
  ];

  const practiceQuiz2 = [
    {
      question: "What is the benefit of automatic deployments?",
      options: ["Slower updates", "No manual deployment needed on code changes", "More expensive", "Requires more setup"],
      correctAnswer: 1,
      explanation: "Automatic deployments eliminate manual work by deploying whenever you push code."
    },
    {
      question: "What is a deployment rollback?",
      options: ["Deleting the app", "Reverting to a previous deployment", "Creating a backup", "Updating dependencies"],
      correctAnswer: 1,
      explanation: "Rollback allows you to revert to a previous working deployment if issues occur."
    },
    {
      question: "Why use environment variables instead of hardcoding values?",
      options: ["Faster code", "Security and flexibility across environments", "Smaller file size", "Better styling"],
      correctAnswer: 1,
      explanation: "Environment variables keep sensitive data secure and allow different values per environment."
    },
    {
      question: "What is a build log?",
      options: ["User analytics", "Record of the build process and errors", "Code documentation", "Design file"],
      correctAnswer: 1,
      explanation: "Build logs show the deployment process and help debug build failures."
    },
    {
      question: "What does HTTPS provide?",
      options: ["Faster loading", "Encrypted secure connection", "Better SEO only", "More features"],
      correctAnswer: 1,
      explanation: "HTTPS encrypts data between the user and server, providing security."
    }
  ];

  const milestoneQuiz1 = [
    {
      question: "What is the first step in deploying a full project?",
      options: ["Buy a domain", "Ensure the build works locally", "Delete node_modules", "Change all code"],
      correctAnswer: 1,
      explanation: "Always verify your build works locally before attempting deployment."
    },
    {
      question: "What should you check if deployment fails?",
      options: ["User count", "Build logs for errors", "Color scheme", "Font sizes"],
      correctAnswer: 1,
      explanation: "Build logs contain detailed error messages that help identify deployment issues."
    },
    {
      question: "Why might API calls fail after deployment?",
      options: ["Too many users", "CORS or incorrect API URLs", "Code is minified", "CSS issues"],
      correctAnswer: 1,
      explanation: "API failures often result from CORS configuration or incorrect production API URLs."
    },
    {
      question: "What is a deployment preview URL?",
      options: ["Production URL", "Temporary URL for testing changes", "Local URL", "Backup URL"],
      correctAnswer: 1,
      explanation: "Preview URLs let you test changes before merging to production."
    },
    {
      question: "How do you update a deployed app?",
      options: ["Redeploy from scratch", "Push changes to Git (auto-deploys)", "Email updates", "Manual file upload"],
      correctAnswer: 1,
      explanation: "With Git integration, pushing changes automatically triggers a new deployment."
    }
  ];

  const milestoneQuiz2 = [
    {
      question: "What is performance monitoring?",
      options: ["Code review", "Tracking app speed and user experience", "Design feedback", "Security testing"],
      correctAnswer: 1,
      explanation: "Performance monitoring tracks metrics like load time and user interactions."
    },
    {
      question: "What is Lighthouse?",
      options: ["A database", "A tool for auditing web performance", "A CSS framework", "A backend service"],
      correctAnswer: 1,
      explanation: "Lighthouse audits web apps for performance, accessibility, and SEO."
    },
    {
      question: "Why optimize images for web?",
      options: ["Better colors", "Faster loading and less bandwidth", "More features", "Easier editing"],
      correctAnswer: 1,
      explanation: "Optimized images load faster and use less bandwidth, improving user experience."
    },
    {
      question: "What is lazy loading?",
      options: ["Slow internet", "Loading content only when needed", "Delaying deployment", "Caching everything"],
      correctAnswer: 1,
      explanation: "Lazy loading defers loading of non-critical resources until they're needed."
    },
    {
      question: "What is a CDN edge location?",
      options: ["Main server", "Server close to users for faster delivery", "Backup server", "Development server"],
      correctAnswer: 1,
      explanation: "Edge locations are servers distributed globally to serve content faster to nearby users."
    }
  ];

  const asapQuiz = [
    {
      question: "What should your final deployed project include?",
      options: ["Only code", "Working app with custom domain and monitoring", "Just HTML", "Only images"],
      correctAnswer: 1,
      explanation: "A complete deployment includes a working app, proper configuration, and monitoring."
    },
    {
      question: "Why document your deployment process?",
      options: ["Not necessary", "Helps others and your future self", "Wastes time", "Only for large teams"],
      correctAnswer: 1,
      explanation: "Documentation helps reproduce deployments and troubleshoot issues."
    },
    {
      question: "What is a deployment checklist?",
      options: ["Shopping list", "Steps to verify before going live", "Code review", "Design mockup"],
      correctAnswer: 1,
      explanation: "A checklist ensures you don't miss critical steps before deploying."
    },
    {
      question: "Why test on multiple devices after deployment?",
      options: ["Not needed", "Ensure responsive design works everywhere", "Waste of time", "Only for mobile apps"],
      correctAnswer: 1,
      explanation: "Testing on multiple devices ensures your app works well for all users."
    },
    {
      question: "What should you do after successful deployment?",
      options: ["Delete local code", "Monitor, gather feedback, and iterate", "Never touch it again", "Start over"],
      correctAnswer: 1,
      explanation: "Continuous monitoring and improvement based on feedback is essential."
    }
  ];

  const reviewQuiz = [
    {
      question: "What is the main difference between development and production builds?",
      options: ["No difference", "Production is optimized and minified", "Development is faster", "Production has more features"],
      correctAnswer: 1,
      explanation: "Production builds are optimized, minified, and ready for deployment."
    },
    {
      question: "Which platform offers zero-config deployment for Vite?",
      options: ["All platforms", "Vercel and Netlify", "None", "Only GitHub Pages"],
      correctAnswer: 1,
      explanation: "Vercel and Netlify automatically detect and configure Vite projects."
    },
    {
      question: "What is the purpose of preview deployments?",
      options: ["Replace production", "Test changes before merging", "Backup only", "Local development"],
      correctAnswer: 1,
      explanation: "Preview deployments let you test changes in a production-like environment."
    },
    {
      question: "Why is HTTPS important for deployed apps?",
      options: ["Faster loading", "Security and trust", "Better colors", "More storage"],
      correctAnswer: 1,
      explanation: "HTTPS encrypts data and builds user trust with secure connections."
    },
    {
      question: "What have you learned in Module 2?",
      options: ["Only theory", "Complete deployment workflow from build to production", "Backend only", "Design principles"],
      correctAnswer: 1,
      explanation: "Module 2 covered the entire deployment process for frontend applications."
    }
  ];
  
  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.1</div>
              <div className="lesson-title-main">
                <h1>Deploying your Front-end - An introduction</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Welcome to Frontend Deployment</h3>
              <div className="theory-box">
                <p><strong>Deployment</strong> is the process of taking your beautifully crafted React application and making it available to the world! Think of it as moving from your cozy development environment to the big stage where real users can access your app 24/7.</p>
                
                <div className="performance-metrics">
                  <h4>Why Deployment Matters</h4>
                  <p>Your app running on localhost:3000 is great, but it's time to go global:</p>
                  <ul>
                    <li><strong>Accessibility:</strong> Anyone with internet can access your app from anywhere</li>
                    <li><strong>Performance:</strong> Optimized builds load faster than development versions</li>
                    <li><strong>Reliability:</strong> Professional hosting ensures your app stays online</li>
                    <li><strong>Scalability:</strong> Handle thousands of users simultaneously</li>
                  </ul>
                </div>
              </div>
              
              <h4>The Deployment Journey</h4>
              <div className="example-box">
                <p>Deploying a frontend app involves several key steps:</p>
                <ul>
                  <li><strong>Build:</strong> Create an optimized production version of your app</li>
                  <li><strong>Choose a host:</strong> Select where your app will live (Vercel, Netlify, etc.)</li>
                  <li><strong>Configure:</strong> Set up environment variables and build settings</li>
                  <li><strong>Deploy:</strong> Upload your build to the hosting platform</li>
                  <li><strong>Monitor:</strong> Track performance and fix issues</li>
                </ul>
              </div>

              <h4>Development vs Production</h4>
              <div className="theory-box">
                <h5>Understanding the Difference</h5>
                <ul>
                  <li><strong>Development mode:</strong> Fast refresh, detailed errors, unoptimized code</li>
                  <li><strong>Production mode:</strong> Minified code, optimized assets, error tracking</li>
                  <li><strong>File size:</strong> Dev builds are large, production builds are compressed</li>
                  <li><strong>Performance:</strong> Production builds are significantly faster</li>
                </ul>
                
                <h5>What Happens During Build?</h5>
                <p>When you run npm run build, Vite performs magic behind the scenes: minifies JavaScript, optimizes images, removes unused code (tree-shaking), bundles everything efficiently, and generates static HTML files.</p>
              </div>

              <h4>Popular Deployment Platforms</h4>
              <div className="comparison-table">
                <h5>Vercel (Recommended for React)</h5>
                <ul>
                  <li><strong>Zero configuration:</strong> Detects Vite automatically</li>
                  <li><strong>Lightning fast:</strong> Global CDN with edge functions</li>
                  <li><strong>Git integration:</strong> Auto-deploy on every push</li>
                  <li><strong>Free tier:</strong> Perfect for personal projects</li>
                </ul>

                <h5>Netlify</h5>
                <ul>
                  <li><strong>Easy setup:</strong> Drag-and-drop deployment option</li>
                  <li><strong>Form handling:</strong> Built-in form submissions</li>
                  <li><strong>Split testing:</strong> A/B testing capabilities</li>
                  <li><strong>Serverless functions:</strong> Add backend functionality</li>
                </ul>

                <h5>GitHub Pages</h5>
                <ul>
                  <li><strong>Free hosting:</strong> For public repositories</li>
                  <li><strong>Simple setup:</strong> Deploy directly from GitHub</li>
                  <li><strong>Custom domains:</strong> Use your own domain name</li>
                  <li><strong>Version control:</strong> Integrated with Git workflow</li>
                </ul>

                <h5>Render</h5>
                <ul>
                  <li><strong>Full-stack support:</strong> Frontend and backend together</li>
                  <li><strong>Auto-deploy:</strong> From Git repositories</li>
                  <li><strong>Free SSL:</strong> HTTPS by default</li>
                  <li><strong>Database hosting:</strong> PostgreSQL, Redis support</li>
                </ul>
              </div>

              <h4>Key Deployment Concepts</h4>
              <div className="example-box">
                <h5>1. Static Site Generation (SSG)</h5>
                <p>Your React app is built into static HTML, CSS, and JavaScript files that can be served from any web server or CDN.</p>
                
                <h5>2. Environment Variables</h5>
                <p>Store sensitive data like API keys separately from your code. Different values for development and production.</p>
                
                <h5>3. Build Optimization</h5>
                <ul>
                  <li>Code splitting for faster initial load</li>
                  <li>Asset compression (gzip/brotli)</li>
                  <li>Image optimization</li>
                  <li>Lazy loading for better performance</li>
                </ul>

                <h5>4. Continuous Deployment</h5>
                <p>Automatically deploy your app whenever you push code to your repository. No manual uploads needed!</p>
              </div>

              <h4>Prerequisites for Deployment</h4>
              <div className="theory-box">
                <p>Before deploying, make sure you have:</p>
                <ul>
                  <li><strong>Working build:</strong> npm run build completes without errors</li>
                  <li><strong>Git repository:</strong> Code pushed to GitHub/GitLab/Bitbucket</li>
                  <li><strong>Account:</strong> Sign up for your chosen hosting platform</li>
                  <li><strong>Environment variables:</strong> Configured for production</li>
                </ul>
              </div>

              <h4>Common Deployment Challenges</h4>
              <div className="example-box">
                <p>Issues you might encounter and how to solve them:</p>
                <ul>
                  <li><strong>Routing issues:</strong> Configure redirects for single-page apps</li>
                  <li><strong>Environment variables:</strong> Set them in your hosting platform</li>
                  <li><strong>Build failures:</strong> Check Node version compatibility</li>
                  <li><strong>CORS errors:</strong> Configure API endpoints properly</li>
                  <li><strong>Asset paths:</strong> Use relative paths or configure base URL</li>
                </ul>
              </div>

              <div className="theory-box">
                <h4>Pro Tip</h4>
                <p><strong>Test your production build locally first!</strong> Run npm run build followed by npm run preview to see exactly how your app will behave in production before deploying.</p>
              </div>
            </section>

            <div className="video-embed">
              <h4>Introduction to Frontend Deployment</h4>
              <p>Understanding the deployment process and best practices.</p>
              
              <iframe width="50%" height="300" src="https://www.youtube.com/embed/Ow_Uzedfohk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <Quiz title="Frontend Deployment Quiz" questions={unit2Quiz} subject="FSWD" unitId={2} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={onBack} className="prev-module-btn">← Back to Overview</button>
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">Deep-dive Part #1 →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.2</div>
              <div className="lesson-title-main">
                <h1>Deploying your Front-end - Deep-dive part #1 (Vercel)</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Deploying with Vercel</h3>
              <div className="theory-box">
                <p>Vercel is the gold standard for deploying React applications. Created by the team behind Next.js, it offers zero-configuration deployment with exceptional performance.</p>
              </div>
              
              <h4>Step 1: Prepare Your Project</h4>
              <div className="example-box">
                <ul>
                  <li>Ensure npm run build works without errors</li>
                  <li>Test with npm run preview locally</li>
                  <li>Push your code to GitHub/GitLab/Bitbucket</li>
                  <li>Create a Vercel account at vercel.com</li>
                </ul>
              </div>

              <h4>Step 2: Import Your Project</h4>
              <div className="theory-box">
                <p>In Vercel dashboard:</p>
                <ul>
                  <li>Click "Add New Project"</li>
                  <li>Import your Git repository</li>
                  <li>Vercel auto-detects Vite configuration</li>
                  <li>Configure environment variables if needed</li>
                  <li>Click "Deploy"</li>
                </ul>
              </div>

              <h4>Step 3: Configure Build Settings</h4>
              <div className="example-box">
                <p>Vercel automatically sets:</p>
                <ul>
                  <li>Build Command: npm run build</li>
                  <li>Output Directory: dist</li>
                  <li>Install Command: npm install</li>
                  <li>Node Version: Latest LTS</li>
                </ul>
              </div>

              <h4>Advanced Features</h4>
              <div className="theory-box">
                <ul>
                  <li><strong>Preview Deployments:</strong> Every PR gets a unique URL</li>
                  <li><strong>Custom Domains:</strong> Add your own domain easily</li>
                  <li><strong>Analytics:</strong> Built-in performance monitoring</li>
                  <li><strong>Edge Functions:</strong> Serverless functions at the edge</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Deploying to Vercel</h4>
              <p>Complete guide to Vercel deployment.</p>
              <iframe width="50%" height="300" src="https://www.youtube.com/embed/2HBIzEx6IZA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <Quiz title="Vercel Deployment Quiz" questions={vercelQuiz} subject="FSWD" unitId={2} moduleId={2} />

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
              <div className="lesson-number-badge">2.3</div>
              <div className="lesson-title-main">
                <h1>Deploying your Front-end - Deep-dive part #2 (Netlify)</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Deploying with Netlify</h3>
              <div className="theory-box">
                <p>Netlify offers powerful deployment features with an intuitive interface. It's perfect for static sites and JAMstack applications.</p>
              </div>
              
              <h4>Deployment Methods</h4>
              <div className="example-box">
                <h5>1. Git Integration</h5>
                <ul>
                  <li>Connect your repository</li>
                  <li>Configure build settings</li>
                  <li>Auto-deploy on push</li>
                </ul>

                <h5>2. Drag and Drop</h5>
                <ul>
                  <li>Build locally: npm run build</li>
                  <li>Drag dist folder to Netlify</li>
                  <li>Instant deployment</li>
                </ul>

                <h5>3. Netlify CLI</h5>
                <ul>
                  <li>Install: npm install -g netlify-cli</li>
                  <li>Login: netlify login</li>
                  <li>Deploy: netlify deploy --prod</li>
                </ul>
              </div>

              <h4>Configuration with netlify.toml</h4>
              <div className="theory-box">
                <p>Create netlify.toml in your project root for custom configuration:</p>
                <ul>
                  <li>Build commands and settings</li>
                  <li>Redirect rules for SPA routing</li>
                  <li>Environment variables</li>
                  <li>Headers and security settings</li>
                </ul>
              </div>

              <h4>Netlify Features</h4>
              <div className="example-box">
                <ul>
                  <li><strong>Form Handling:</strong> Built-in form submissions</li>
                  <li><strong>Functions:</strong> Serverless backend functions</li>
                  <li><strong>Split Testing:</strong> A/B testing capabilities</li>
                  <li><strong>Deploy Previews:</strong> Test before going live</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Deploying to Netlify</h4>
              <p>Complete Netlify deployment tutorial.</p>
              <iframe width="50%" height="300" src="https://www.youtube.com/embed/sGBdp9r2GSg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <Quiz title="Netlify Deployment Quiz" questions={netlifyQuiz} subject="FSWD" unitId={2} moduleId={3} />

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
              <div className="lesson-number-badge">2.4</div>
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
                  questions={unit2Quiz}
                  subject="FSWD"
                  unitId={1}
                  moduleId={1}
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
              <div className="lesson-number-badge">2.5</div>
              <div className="lesson-title-main">
                <h1>Practice assignment #2</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Advanced Deployment Configuration</h3>
              <div className="theory-box">
                <p>Enhance your deployment with custom domains, environment variables, and monitoring.</p>
              </div>
              
              <h4>Assignment Tasks</h4>
              <div className="example-box">
                <ul>
                  <li>Add a custom domain (or use free subdomain)</li>
                  <li>Configure multiple environment variables</li>
                  <li>Set up automatic deployments from Git</li>
                  <li>Enable HTTPS</li>
                  <li>Test preview deployments</li>
                </ul>
              </div>

              <h4>Reference: StackBlitz Advanced Config</h4>
              <div className="example-box">
                <p>Reference project with environment variables:</p>
                <iframe src="https://stackblitz.com/edit/react?embed=1&file=src/App.js" width="100%" height="500" frameBorder="0"></iframe>
              </div>
            </section>

            <Quiz title="Practice Assignment #2 Quiz" questions={practiceQuiz2} subject="FSWD" unitId={2} moduleId={5} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Practice Assignment #1</button>
              <button onClick={() => setCurrentModule(6)} className="next-module-btn">Follow-along Milestone #17 →</button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.6</div>
              <div className="lesson-title-main">
                <h1>Follow-along project milestone #17</h1>
              </div>
            </div>
            
            <section className="content-section">
              <Video1 videoId={"dza65WX0qU8"} onComplete={() => setVideoCompleted(true)}></Video1>
            </section>

             <div className="mt-8">
                <Quiz
                  title="Vite Introduction Quiz"
                  questions={unit2Quiz}
                  subject="FSWD"
                  unitId={2}
                  moduleId={6}
                  isLocked={!videoCompleted}
                />
              </div>
            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(5)} className="prev-module-btn">← Practice Assignment #2</button>
              <button onClick={() => setCurrentModule(7)} className="next-module-btn">Follow-along Milestone #18 →</button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.7</div>
              <div className="lesson-title-main">
                <h1>Follow-along project milestone #18</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Monitoring and Optimization</h3>
              <div className="theory-box">
                <p>Learn to monitor your deployed application and optimize for performance.</p>
              </div>
              
              <h4>Monitoring Tools</h4>
              <div className="example-box">
                <ul>
                  <li><strong>Vercel Analytics:</strong> Built-in performance metrics</li>
                  <li><strong>Google Analytics:</strong> User behavior tracking</li>
                  <li><strong>Lighthouse:</strong> Performance audits</li>
                  <li><strong>Sentry:</strong> Error tracking and monitoring</li>
                </ul>
              </div>

              <h4>Optimization Techniques</h4>
              <div className="theory-box">
                <ul>
                  <li>Image optimization and lazy loading</li>
                  <li>Code splitting for faster initial load</li>
                  <li>Caching strategies</li>
                  <li>CDN configuration</li>
                  <li>Performance budgets</li>
                </ul>
              </div>
            </section>

            <Quiz title="Milestone #18 Quiz" questions={milestoneQuiz2} subject="FSWD" unitId={2} moduleId={7} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(6)} className="prev-module-btn">← Follow-along Milestone #17</button>
              <button onClick={() => setCurrentModule(8)} className="next-module-btn">ASAP Project →</button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.8</div>
              <div className="lesson-title-main">
                <h1>Assignment | ASAP Project - Deploy Your App</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Final Deployment Project</h3>
              <div className="theory-box">
                <p>Deploy your complete React application with all production best practices.</p>
              </div>
              
              <h4>Project Requirements</h4>
              <div className="example-box">
                <ul>
                  <li>Deploy your ASAP project from Module 1</li>
                  <li>Configure custom domain or subdomain</li>
                  <li>Set up environment variables properly</li>
                  <li>Enable HTTPS and security headers</li>
                  <li>Configure automatic deployments</li>
                  <li>Add performance monitoring</li>
                </ul>
              </div>

              <h4>Evaluation Criteria</h4>
              <div className="theory-box">
                <ul>
                  <li>Application is live and accessible</li>
                  <li>No console errors or warnings</li>
                  <li>Fast load times (&lt; 3 seconds)</li>
                  <li>Proper routing and navigation</li>
                  <li>Mobile responsive</li>
                  <li>Documentation of deployment process</li>
                </ul>
              </div>

              <h4>Reference: StackBlitz Full Deployment</h4>
              <div className="example-box">
                <p>Complete deployment reference project:</p>
                <iframe src="https://stackblitz.com/edit/react?embed=1&file=src/App.js" width="100%" height="500" frameBorder="0"></iframe>
              </div>
            </section>

            <Quiz title="ASAP Project Quiz" questions={asapQuiz} subject="FSWD" unitId={2} moduleId={8} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(7)} className="prev-module-btn">← Follow-along Milestone #18</button>
              <button onClick={() => setCurrentModule(9)} className="next-module-btn">Knowledge Review →</button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.9</div>
              <div className="lesson-title-main">
                <h1>Knowledge review #6</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Module 2 Summary</h3>
              <div className="theory-box">
                <p>Congratulations on completing Module 2! You now know how to deploy React applications to production.</p>
              </div>
              
              <h4>Key Takeaways</h4>
              <div className="example-box">
                <ul>
                  <li>Deployment makes your app accessible globally</li>
                  <li>Vercel and Netlify offer zero-config deployment</li>
                  <li>Production builds are optimized and minified</li>
                  <li>Environment variables keep sensitive data secure</li>
                  <li>Monitoring helps maintain app performance</li>
                </ul>
              </div>

              <h4>Self-Assessment Questions</h4>
              <div className="theory-box">
                <p>Test your understanding:</p>
                <ul>
                  <li>Can you deploy a React app to Vercel or Netlify?</li>
                  <li>Do you understand environment variables?</li>
                  <li>Can you configure custom domains?</li>
                  <li>Are you comfortable with Git-based deployments?</li>
                  <li>Can you troubleshoot deployment issues?</li>
                </ul>
              </div>

              <h4>Next Steps</h4>
              <div className="example-box">
                <p>Continue your learning journey:</p>
                <ul>
                  <li>Explore backend deployment</li>
                  <li>Learn about serverless functions</li>
                  <li>Study advanced performance optimization</li>
                  <li>Implement CI/CD pipelines</li>
                </ul>
              </div>
            </section>

            <Quiz title="Module 2 Review Quiz" questions={reviewQuiz} subject="FSWD" unitId={2} moduleId={9} />

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

export default Unit2;
