'use client';
import React from 'react';
import Quiz from '../components/Quiz';

interface Unit2Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit2: React.FC<Unit2Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const module1Quiz = [
    {
      question: "What is a process?",
      options: ["A program in execution", "A program stored on disk", "A CPU instruction", "A memory location"],
      correctAnswer: 0,
      explanation: "A process is a program in execution. It includes the program code, current activity, and allocated resources."
    },
    {
      question: "Which state comes after the 'Ready' state?",
      options: ["New", "Running", "Waiting", "Terminated"],
      correctAnswer: 1,
      explanation: "After Ready state, when the scheduler selects the process, it moves to Running state."
    },
    {
      question: "What does PCB stand for?",
      options: ["Process Control Block", "Program Control Block", "Process Code Block", "Program Code Block"],
      correctAnswer: 0,
      explanation: "PCB stands for Process Control Block, which contains all information about a process."
    }
  ];

  const module2Quiz = [
    {
      question: "Which scheduler selects processes from the job pool?",
      options: ["Short-term scheduler", "Long-term scheduler", "Medium-term scheduler", "CPU scheduler"],
      correctAnswer: 1,
      explanation: "Long-term scheduler (job scheduler) selects processes from the job pool and loads them into memory."
    },
    {
      question: "What is the main criterion for FCFS scheduling?",
      options: ["Priority", "Burst time", "Arrival time", "Deadline"],
      correctAnswer: 2,
      explanation: "FCFS (First Come First Serve) schedules processes based on their arrival time."
    },
    {
      question: "Which scheduling algorithm is optimal?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      correctAnswer: 1,
      explanation: "SJF (Shortest Job First) is optimal as it gives minimum average waiting time."
    }
  ];

  const module3Quiz = [
    {
      question: "In FCFS scheduling, which process is executed first?",
      options: ["Shortest process", "Highest priority", "First arrived process", "Last arrived process"],
      correctAnswer: 2,
      explanation: "FCFS executes processes in the order they arrive in the ready queue."
    },
    {
      question: "What is the main disadvantage of FCFS?",
      options: ["Complex implementation", "Convoy effect", "High overhead", "Starvation"],
      correctAnswer: 1,
      explanation: "FCFS suffers from convoy effect where short processes wait for long processes."
    },
    {
      question: "Which algorithm can cause starvation?",
      options: ["FCFS", "Round Robin", "Priority Scheduling", "SJF"],
      correctAnswer: 2,
      explanation: "Priority scheduling can cause starvation where low priority processes may never execute."
    }
  ];

  const module4Quiz = [
    {
      question: "What is a thread?",
      options: ["A lightweight process", "A heavy process", "A system call", "A scheduler"],
      correctAnswer: 0,
      explanation: "A thread is a lightweight process, the basic unit of CPU utilization."
    },
    {
      question: "What is IPC?",
      options: ["Internet Protocol Communication", "Inter-Process Communication", "Internal Process Control", "Integrated Process Communication"],
      correctAnswer: 1,
      explanation: "IPC stands for Inter-Process Communication, mechanisms for processes to communicate."
    },
    {
      question: "Which IPC mechanism uses a buffer?",
      options: ["Shared Memory", "Message Passing", "Pipes", "Sockets"],
      correctAnswer: 1,
      explanation: "Message passing uses a buffer (mailbox) to exchange messages between processes."
    }
  ];

  const unit2Quiz = [
    {
      question: "What happens during context switching?",
      options: ["Process creation", "Saving and loading process state", "Process termination", "Memory allocation"],
      correctAnswer: 1,
      explanation: "Context switching involves saving the state of current process and loading the state of next process."
    },
    {
      question: "Which scheduling is preemptive?",
      options: ["FCFS", "SJF (non-preemptive)", "Round Robin", "All of the above"],
      correctAnswer: 2,
      explanation: "Round Robin is a preemptive scheduling algorithm with time quantum."
    },
    {
      question: "What is the time quantum in Round Robin?",
      options: ["Total execution time", "Fixed time slice", "Waiting time", "Turnaround time"],
      correctAnswer: 1,
      explanation: "Time quantum is a fixed time slice allocated to each process in Round Robin scheduling."
    },
    {
      question: "Which has lower overhead: threads or processes?",
      options: ["Threads", "Processes", "Both equal", "Depends on OS"],
      correctAnswer: 0,
      explanation: "Threads have lower overhead as they share resources within the same process."
    },
    {
      question: "What is the main advantage of multithreading?",
      options: ["Increased memory", "Better resource utilization", "Simpler code", "Faster disk access"],
      correctAnswer: 1,
      explanation: "Multithreading provides better resource utilization and responsiveness."
    },
    {
      question: "What is the difference between user-level and kernel-level threads?",
      options: ["User-level threads are faster", "Kernel-level threads are managed by the OS, user-level by runtime", "User-level threads use more memory", "There is no difference"],
      correctAnswer: 1,
      explanation: "Kernel-level threads are managed by the operating system, while user-level threads are managed by the runtime system."
    },
    {
      question: "What is a race condition?",
      options: ["A situation where two processes compete for the same resource", "An undesirable situation where output depends on sequence of execution", "A type of scheduling algorithm", "A hardware malfunction"],
      correctAnswer: 1,
      explanation: "A race condition is an undesirable situation where the output depends on the sequence or timing of process execution."
    },
    {
      question: "What is mutual exclusion?",
      options: ["A technique to speed up processes", "A requirement that only one process can access a resource at a time", "A type of process state", "A scheduling policy"],
      correctAnswer: 1,
      explanation: "Mutual exclusion is a requirement that only one process can access a critical resource at a time."
    },
    {
      question: "What is a semaphore?",
      options: ["A hardware device", "A synchronization tool that uses integer counters", "A type of memory allocation", "A process scheduling algorithm"],
      correctAnswer: 1,
      explanation: "A semaphore is a synchronization tool that uses integer counters to control access to shared resources."
    },
    {
      question: "What is the producer-consumer problem?",
      options: ["A problem about resource allocation", "A classic synchronization problem involving shared buffer access", "A scheduling problem", "A memory management issue"],
      correctAnswer: 1,
      explanation: "The producer-consumer problem is a classic synchronization problem involving coordinated access to a shared buffer."
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
                <h1>Process Concepts</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>What is a Process?</h3>
              <div className="theory-box">
                <p>A process is a program in execution - an active entity that transforms from passive code into a dynamic computational unit. It represents the fundamental abstraction of a running program, encapsulating both the executable instructions and the execution context required for computation.</p>
                
                <div className="performance-metrics">
                  <h4>Process Performance Characteristics</h4>
                  <ul>
                    <li><strong>Creation Time:</strong> 1-10ms (varies by OS and system load)</li>
                    <li><strong>Context Switch Time:</strong> 0.1-1ms (hardware dependent)</li>
                    <li><strong>Memory Footprint:</strong> 4KB-4GB+ (application dependent)</li>
                    <li><strong>Maximum Processes:</strong> 32,768 (Linux default), 2,048 (Windows default)</li>
                  </ul>
                </div>
              </div>
              
              <h4>Program vs Process: Fundamental Distinction</h4>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr><th>Aspect</th><th>Program</th><th>Process</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Nature</td><td>Passive entity (static code)</td><td>Active entity (executing code)</td></tr>
                    <tr><td>Storage</td><td>Stored on disk/storage device</td><td>Loaded in main memory</td></tr>
                    <tr><td>State</td><td>No execution state</td><td>Has execution state (PC, registers)</td></tr>
                    <tr><td>Resources</td><td>No resource allocation</td><td>Allocated CPU, memory, I/O</td></tr>
                    <tr><td>Lifetime</td><td>Permanent until deleted</td><td>Temporary during execution</td></tr>
                  </tbody>
                </table>
              </div>

              <h4>Process Memory Layout Architecture</h4>
              <div className="architecture-details">
                <h5>1. Text Segment (Code Segment)</h5>
                <ul>
                  <li><strong>Content:</strong> Machine code instructions, constants, string literals</li>
                  <li><strong>Properties:</strong> Read-only, shareable among multiple processes</li>
                  <li><strong>Size:</strong> Fixed at compile time, typically 1KB-100MB</li>
                  <li><strong>Protection:</strong> Execute and read permissions only</li>
                </ul>

                <h5>2. Data Segment</h5>
                <ul>
                  <li><strong>Initialized Data:</strong> Global and static variables with initial values</li>
                  <li><strong>Uninitialized Data (BSS):</strong> Global and static variables without initial values</li>
                  <li><strong>Size:</strong> Determined at compile time, typically 1KB-10MB</li>
                  <li><strong>Growth:</strong> Fixed size, cannot expand during execution</li>
                </ul>

                <h5>3. Stack Segment</h5>
                <ul>
                  <li><strong>Content:</strong> Function call frames, local variables, return addresses</li>
                  <li><strong>Growth:</strong> Grows downward (high to low addresses)</li>
                  <li><strong>Size:</strong> Typically 1-8MB default limit (configurable)</li>
                  <li><strong>Management:</strong> Automatic allocation/deallocation (LIFO)</li>
                </ul>

                <h5>4. Heap Segment</h5>
                <ul>
                  <li><strong>Content:</strong> Dynamically allocated memory (malloc, new)</li>
                  <li><strong>Growth:</strong> Grows upward (low to high addresses)</li>
                  <li><strong>Size:</strong> Limited by available virtual memory</li>
                  <li><strong>Management:</strong> Manual allocation/deallocation required</li>
                </ul>
              </div>

              <h4>Process Identification and Attributes</h4>
              <div className="technical-details">
                <h5>Process Identifier (PID) System</h5>
                <ul>
                  <li><strong>PID Range:</strong> 1-32,767 (Linux), 4-65,535 (Windows)</li>
                  <li><strong>PID 0:</strong> Swapper process (kernel scheduler)</li>
                  <li><strong>PID 1:</strong> Init process (parent of all user processes)</li>
                  <li><strong>PID Recycling:</strong> Reused after process termination</li>
                </ul>

                <h5>Process Relationships</h5>
                <ul>
                  <li><strong>Parent Process ID (PPID):</strong> Identifies creating process</li>
                  <li><strong>Process Group ID (PGID):</strong> Groups related processes</li>
                  <li><strong>Session ID (SID):</strong> Groups process groups</li>
                  <li><strong>User ID (UID/EUID):</strong> Process ownership and permissions</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://cdn-images-1.medium.com/max/900/1*6vsoP1cWzQkN95AlEt2WoA.jpeg" alt="Process in Memory" />
                <p className="image-caption">Figure 2.1: Process in Memory</p>
              </div>

              <h3>Process State Management</h3>
              <div className="theory-box">
                <p>Process state management is a critical OS function that tracks and controls the execution lifecycle of processes. The state model provides a systematic approach to resource allocation and CPU scheduling.</p>
                
                <div className="performance-metrics">
                  <h4>State Transition Performance</h4>
                  <ul>
                    <li><strong>New → Ready:</strong> 0.1-5ms (memory allocation time)</li>
                    <li><strong>Ready → Running:</strong> 0.01-0.1ms (scheduler dispatch)</li>
                    <li><strong>Running → Waiting:</strong> 0.1-1ms (I/O request processing)</li>
                    <li><strong>Waiting → Ready:</strong> 0.1-10ms (I/O completion handling)</li>
                  </ul>
                </div>
              </div>

              <h4>Detailed Process States</h4>
              <div className="state-details">
                <h5>1. New State</h5>
                <ul>
                  <li><strong>Definition:</strong> Process creation initiated but not yet admitted to ready queue</li>
                  <li><strong>Activities:</strong> PCB creation, memory allocation, resource initialization</li>
                  <li><strong>Duration:</strong> Typically 1-10ms depending on system load</li>
                  <li><strong>Limitations:</strong> Limited by system's process creation rate</li>
                </ul>

                <h5>2. Ready State</h5>
                <ul>
                  <li><strong>Definition:</strong> Process loaded in memory, waiting for CPU assignment</li>
                  <li><strong>Queue Management:</strong> Priority-based or FIFO ready queue</li>
                  <li><strong>Scheduling:</strong> Subject to CPU scheduler selection algorithms</li>
                  <li><strong>Resource Status:</strong> All resources allocated except CPU</li>
                </ul>

                <h5>3. Running State</h5>
                <ul>
                  <li><strong>Definition:</strong> Process currently executing on CPU</li>
                  <li><strong>Limitations:</strong> Only one process per CPU core</li>
                  <li><strong>Time Quantum:</strong> 10-100ms in time-sharing systems</li>
                  <li><strong>Preemption:</strong> Can be interrupted by higher priority processes</li>
                </ul>

                <h5>4. Waiting (Blocked) State</h5>
                <ul>
                  <li><strong>Definition:</strong> Process suspended pending event completion</li>
                  <li><strong>Common Events:</strong> I/O operations, semaphore waits, message reception</li>
                  <li><strong>Queue Types:</strong> Device queues, semaphore queues, message queues</li>
                  <li><strong>Wake-up Mechanism:</strong> Interrupt-driven event notification</li>
                </ul>

                <h5>5. Terminated State</h5>
                <ul>
                  <li><strong>Definition:</strong> Process execution completed or abnormally terminated</li>
                  <li><strong>Cleanup:</strong> Resource deallocation, PCB removal, parent notification</li>
                  <li><strong>Exit Codes:</strong> 0 (success), non-zero (error conditions)</li>
                  <li><strong>Zombie Prevention:</strong> Parent must collect child exit status</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://miro.medium.com/1*4NrwsHUMDF7M1OfoMzBsKw.jpeg" alt="Process State Diagram" />
                <p className="image-caption">Figure 2.2: Process State Diagram</p>
              </div>

              <h3>Process Control Block (PCB) Architecture</h3>
              <div className="theory-box">
                <p>The Process Control Block serves as the comprehensive data repository for process management. It contains all critical information required for process execution, scheduling, and resource management.</p>
                
                <div className="performance-metrics">
                  <h4>PCB Performance Characteristics</h4>
                  <ul>
                    <li><strong>PCB Size:</strong> 1-4KB (varies by OS implementation)</li>
                    <li><strong>Access Time:</strong> 10-100ns (memory-resident structure)</li>
                    <li><strong>Update Frequency:</strong> Every context switch and state change</li>
                    <li><strong>Storage Location:</strong> Kernel memory space (protected)</li>
                  </ul>
                </div>
              </div>

              <h4>Comprehensive PCB Components</h4>
              <div className="pcb-details">
                <h5>1. Process Identification Information</h5>
                <ul>
                  <li><strong>Process ID (PID):</strong> Unique system-wide identifier</li>
                  <li><strong>Parent Process ID (PPID):</strong> Creator process identifier</li>
                  <li><strong>User ID (UID):</strong> Process owner identification</li>
                  <li><strong>Group ID (GID):</strong> Process group membership</li>
                </ul>

                <h5>2. Process State Information</h5>
                <ul>
                  <li><strong>Current State:</strong> New, Ready, Running, Waiting, Terminated</li>
                  <li><strong>Program Counter (PC):</strong> Next instruction address</li>
                  <li><strong>CPU Registers:</strong> General-purpose, index, stack pointer</li>
                  <li><strong>Condition Codes:</strong> Flags register, status bits</li>
                </ul>

                <h5>3. CPU Scheduling Information</h5>
                <ul>
                  <li><strong>Process Priority:</strong> Static and dynamic priority values</li>
                  <li><strong>Scheduling Queue Pointers:</strong> Ready queue, device queue links</li>
                  <li><strong>CPU Burst History:</strong> Previous execution time patterns</li>
                  <li><strong>Scheduling Algorithm Data:</strong> Algorithm-specific parameters</li>
                </ul>

                <h5>4. Memory Management Information</h5>
                <ul>
                  <li><strong>Base and Limit Registers:</strong> Memory protection boundaries</li>
                  <li><strong>Page Tables:</strong> Virtual-to-physical address translation</li>
                  <li><strong>Segment Tables:</strong> Segmentation information</li>
                  <li><strong>Memory Allocation:</strong> Heap, stack, data segment pointers</li>
                </ul>

                <h5>5. Accounting Information</h5>
                <ul>
                  <li><strong>CPU Time Used:</strong> Total and recent CPU utilization</li>
                  <li><strong>Real Time Used:</strong> Wall-clock execution time</li>
                  <li><strong>Time Limits:</strong> Maximum allowed execution time</li>
                  <li><strong>Account Numbers:</strong> Billing and resource tracking</li>
                </ul>

                <h5>6. I/O Status Information</h5>
                <ul>
                  <li><strong>Open File Table:</strong> File descriptors and access modes</li>
                  <li><strong>I/O Device List:</strong> Allocated devices and their status</li>
                  <li><strong>Pending I/O Requests:</strong> Outstanding operations queue</li>
                  <li><strong>I/O Completion Status:</strong> Results of completed operations</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240618163537/Process-Control-Block.png" alt="PCB" />
                <p className="image-caption">Figure 2.3: Process Control Block structure</p>
              </div>

              <h3>Process Operations</h3>

              <h4>1. Process Creation</h4>
              <p>A process may create several new processes during execution. The creating process is called parent, and new processes are called children.</p>
              
              <div className="example-box">
                <h5>Process Creation Steps</h5>
                <ol>
                  <li>Process Request (fork/exec system call)</li>
                  <li>Allocate Process Control Block (PCB)</li>
                  <li>Assign Unique Process ID (PID)</li>
                  <li>Allocate Memory Space</li>
                  <li>Initialize PCB with process attributes</li>
                  <li>Load program code and data into memory</li>
                  <li>Set initial register values and program counter</li>
                  <li>Insert process into ready queue</li>
                  <li>Process becomes eligible for scheduling</li>
                </ol>
              </div>

              <h5>Process Creation Methods:</h5>
              <ul>
                <li><strong>fork():</strong> Create child process (Unix/Linux)</li>
                <li><strong>exec():</strong> Replace process image with new program</li>
                <li><strong>spawn():</strong> Create and execute new process (Windows)</li>
                <li><strong>system():</strong> Execute command via shell</li>
              </ul>

              <h5>Process Hierarchy:</h5>
              <ul>
                <li><strong>Parent Process:</strong> Creates other processes</li>
                <li><strong>Child Process:</strong> Created by parent process</li>
                <li><strong>Process Tree:</strong> Hierarchical process organization</li>
                <li><strong>Zombie Process:</strong> Terminated but not cleaned up by parent</li>
                <li><strong>Orphan Process:</strong> Parent terminated before child</li>
              </ul>

              <h4>2. Process Termination</h4>
              <p>Process terminates when it finishes executing its final statement.</p>
              
              <h5>Termination Conditions:</h5>
              <ul>
                <li><strong>Normal completion:</strong> exit() system call</li>
                <li><strong>Fatal error:</strong> Segmentation fault, divide by zero</li>
                <li><strong>Killed by another process:</strong> kill() system call</li>
                <li><strong>Parent termination:</strong> Cascading termination of children</li>
              </ul>

              <div className="example-box">
                <h5>Example: fork() System Call</h5>
                <p>In Unix/Linux, fork() creates a child process:</p>
                <ul>
                  <li>Returns 0 to child process</li>
                  <li>Returns child's PID to parent process</li>
                  <li>Returns -1 if creation fails</li>
                  <li>Child is duplicate of parent with separate memory space</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Introduction to Processes</h4>
              <p>Comprehensive introduction to processes, process states, and process control block in operating systems.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/OrM7nZcxXZU"
                title="Introduction to Processes"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Process State Diagram</h4>
              <p>Detailed explanation of process state transitions and the process lifecycle.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/jZ_6PXoaoxo"
                title="Process State Diagram"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 1 Quiz" questions={module1Quiz} subject="OS" unitId={2} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">Process Scheduling →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.2</div>
              <div className="lesson-title-main">
                <h1>Process Scheduling</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Process Scheduling Architecture</h3>
              <div className="theory-box">
                <p>Process scheduling is the cornerstone of multiprogramming systems, enabling efficient CPU utilization through systematic process selection and execution management. Modern schedulers implement sophisticated algorithms to balance system throughput, response time, and fairness.</p>
                
                <div className="performance-metrics">
                  <h4>Scheduler Performance Characteristics</h4>
                  <ul>
                    <li><strong>Scheduling Overhead:</strong> 0.1-2% of total CPU time</li>
                    <li><strong>Decision Time:</strong> 10-100μs per scheduling decision</li>
                    <li><strong>Context Switch Frequency:</strong> 100-1000 switches/second</li>
                    <li><strong>Queue Management:</strong> O(1) to O(log n) complexity</li>
                  </ul>
                </div>
              </div>

              <h4>Hierarchical Scheduler Architecture</h4>
              <div className="scheduler-details">
                <h5>1. Long-Term Scheduler (Admission Scheduler)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Primary Function:</strong> Controls degree of multiprogramming</li>
                    <li><strong>Selection Criteria:</strong> Memory availability, I/O vs CPU bound mix</li>
                    <li><strong>Execution Frequency:</strong> Seconds to minutes between decisions</li>
                    <li><strong>Performance Impact:</strong> Determines system throughput and stability</li>
                    <li><strong>Implementation:</strong> Job queues, admission control policies</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Admission Control Algorithm</h6>
                    <p>Multiprogramming Level = (Total Memory - OS Memory) / Average Process Size</p>
                    <p>Optimal Range: 5-20 processes for typical systems</p>
                  </div>
                </div>

                <h5>2. Short-Term Scheduler (CPU Scheduler)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Primary Function:</strong> Selects next process for CPU execution</li>
                    <li><strong>Execution Frequency:</strong> Every 10-100ms (time quantum)</li>
                    <li><strong>Performance Requirements:</strong> Must be extremely fast (μs range)</li>
                    <li><strong>Data Structures:</strong> Ready queues, priority heaps, run queues</li>
                    <li><strong>Algorithms:</strong> FCFS, SJF, Priority, Round Robin, CFS</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Scheduler Efficiency Metrics</h6>
                    <p>Scheduler Overhead = (Scheduling Time / Total Time) × 100%</p>
                    <p>Target: Less than 1% for production systems</p>
                  </div>
                </div>

                <h5>3. Medium-Term Scheduler (Swapper)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Primary Function:</strong> Memory management through swapping</li>
                    <li><strong>Swapping Decisions:</strong> Based on memory pressure and process activity</li>
                    <li><strong>Execution Frequency:</strong> Minutes to hours between operations</li>
                    <li><strong>Performance Impact:</strong> Balances memory utilization and thrashing</li>
                    <li><strong>Modern Implementation:</strong> Virtual memory systems, page replacement</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Swapping Threshold</h6>
                    <p>Swap Out When: Memory Utilization &gt; 85% AND Page Fault Rate &gt; Threshold</p>
                    <p>Swap In When: Memory Utilization &lt; 70% AND Process Priority &gt; Threshold</p>
                  </div>
                </div>
              </div>

              <h4>Advanced Scheduling Concepts</h4>
              <div className="advanced-concepts">
                <h5>Preemptive vs Non-Preemptive Scheduling</h5>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr><th>Aspect</th><th>Preemptive</th><th>Non-Preemptive</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>CPU Control</td><td>OS can forcibly remove process</td><td>Process voluntarily yields CPU</td></tr>
                      <tr><td>Response Time</td><td>Better (1-100ms)</td><td>Worse (100ms-seconds)</td></tr>
                      <tr><td>Context Switches</td><td>Higher overhead</td><td>Lower overhead</td></tr>
                      <tr><td>Fairness</td><td>Better resource sharing</td><td>Potential starvation</td></tr>
                      <tr><td>Implementation</td><td>Complex (timer interrupts)</td><td>Simple (cooperative)</td></tr>
                    </tbody>
                  </table>
                </div>

                <h5>Modern Scheduler Implementations</h5>
                <ul>
                  <li><strong>Linux CFS (Completely Fair Scheduler):</strong> O(log n) complexity, virtual runtime</li>
                  <li><strong>Windows Scheduler:</strong> 32 priority levels, multilevel feedback queues</li>
                  <li><strong>Real-Time Schedulers:</strong> Rate Monotonic, Earliest Deadline First</li>
                  <li><strong>Multicore Schedulers:</strong> Load balancing, CPU affinity, NUMA awareness</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKHItrJ8RsHnrfHCKt7bBIjYO1TVaMlKKFwB-KyLh0orzhkif0JZVZa_P_mnCbZTeOk6CFQ&s=10" alt="Schedulers" />
                <p className="image-caption">Figure 2.4: Types of Schedulers</p>
              </div>

              <h3>Scheduling Performance Criteria</h3>
              <div className="theory-box">
                <p>Scheduling algorithms are evaluated based on multiple performance metrics that often conflict with each other. Understanding these trade-offs is essential for selecting appropriate scheduling policies for different system requirements.</p>
                
                <div className="performance-metrics">
                  <h4>Typical Performance Ranges</h4>
                  <ul>
                    <li><strong>CPU Utilization:</strong> 40% (lightly loaded) to 90% (heavily loaded)</li>
                    <li><strong>Throughput:</strong> 10-1000 processes/second (system dependent)</li>
                    <li><strong>Response Time:</strong> 1ms (interactive) to 1s (batch)</li>
                    <li><strong>Context Switch Overhead:</strong> 0.1-10ms per switch</li>
                  </ul>
                </div>
              </div>

              <h4>Comprehensive Performance Metrics</h4>
              <div className="metrics-details">
                <h5>1. CPU Utilization</h5>
                <ul>
                  <li><strong>Definition:</strong> Percentage of time CPU is actively executing processes</li>
                  <li><strong>Formula:</strong> (Total CPU Time - Idle Time) / Total Time × 100%</li>
                  <li><strong>Target Range:</strong> 70-90% for optimal performance</li>
                  <li><strong>Factors:</strong> I/O wait time, context switching overhead, interrupt handling</li>
                </ul>

                <h5>2. Throughput</h5>
                <ul>
                  <li><strong>Definition:</strong> Number of processes completed per unit time</li>
                  <li><strong>Formula:</strong> Completed Processes / Total Time</li>
                  <li><strong>Units:</strong> Processes per second, jobs per hour</li>
                  <li><strong>Optimization:</strong> Minimize process overhead, maximize CPU utilization</li>
                </ul>

                <h5>3. Turnaround Time</h5>
                <ul>
                  <li><strong>Definition:</strong> Total time from process submission to completion</li>
                  <li><strong>Formula:</strong> Completion Time - Arrival Time</li>
                  <li><strong>Components:</strong> Waiting time + CPU time + I/O time</li>
                  <li><strong>Typical Range:</strong> Milliseconds (interactive) to hours (batch)</li>
                </ul>

                <h5>4. Waiting Time</h5>
                <ul>
                  <li><strong>Definition:</strong> Total time process spends in ready queue</li>
                  <li><strong>Formula:</strong> Turnaround Time - CPU Burst Time</li>
                  <li><strong>Impact:</strong> Directly affects user-perceived performance</li>
                  <li><strong>Optimization Goal:</strong> Minimize average and variance</li>
                </ul>

                <h5>5. Response Time</h5>
                <ul>
                  <li><strong>Definition:</strong> Time from request submission to first response</li>
                  <li><strong>Formula:</strong> First Response Time - Arrival Time</li>
                  <li><strong>Critical For:</strong> Interactive systems, real-time applications</li>
                  <li><strong>Target:</strong> Under 100ms for interactive systems</li>
                </ul>
              </div>

              <h4>Performance Optimization Strategies</h4>
              <div className="optimization-strategies">
                <h5>Conflicting Objectives</h5>
                <ul>
                  <li><strong>Throughput vs Response Time:</strong> Batch processing vs interactive systems</li>
                  <li><strong>CPU Utilization vs Fairness:</strong> Efficiency vs equal resource sharing</li>
                  <li><strong>Predictability vs Adaptability:</strong> Static vs dynamic scheduling</li>
                </ul>

                <h5>System-Specific Optimizations</h5>
                <ul>
                  <li><strong>Interactive Systems:</strong> Minimize response time, prioritize foreground processes</li>
                  <li><strong>Batch Systems:</strong> Maximize throughput, minimize turnaround time</li>
                  <li><strong>Real-Time Systems:</strong> Meet deadlines, predictable response times</li>
                  <li><strong>Server Systems:</strong> Balance load, maximize concurrent request handling</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Process Schedulers</h4>
              <p>Learn about different types of schedulers and their roles in process management.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/pro8cU5Uzdg"
                title="Process Schedulers"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>CPU Scheduling Criteria</h4>
              <p>Understanding the criteria used to evaluate CPU scheduling algorithms.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/rFt1hwh-8zU"
                title="CPU Scheduling Criteria"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 2 Quiz" questions={module2Quiz} subject="OS" unitId={2} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← Process Concepts</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">Scheduling Algorithms →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.3</div>
              <div className="lesson-title-main">
                <h1>Scheduling Algorithms</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>CPU Scheduling Algorithms: Comprehensive Analysis</h3>
              <div className="theory-box">
                <p>CPU scheduling algorithms form the core of process management, determining how system resources are allocated among competing processes. Each algorithm represents different trade-offs between performance metrics and system objectives.</p>
                
                <div className="performance-metrics">
                  <h4>Algorithm Performance Comparison</h4>
                  <ul>
                    <li><strong>FCFS Average Waiting Time:</strong> O(n²) worst case, simple implementation</li>
                    <li><strong>SJF Optimality:</strong> Provably optimal for average waiting time</li>
                    <li><strong>Round Robin Overhead:</strong> 5-15% CPU time for context switching</li>
                    <li><strong>Priority Scheduling:</strong> Real-time response &lt; 1ms achievable</li>
                  </ul>
                </div>
              </div>

              <h4>1. First-Come, First-Served (FCFS) Scheduling</h4>
              <div className="algorithm-details">
                <h5>Algorithm Characteristics</h5>
                <ul>
                  <li><strong>Implementation:</strong> Simple FIFO queue using linked list or array</li>
                  <li><strong>Time Complexity:</strong> O(1) for insertion, O(1) for selection</li>
                  <li><strong>Space Complexity:</strong> O(n) where n is number of processes</li>
                  <li><strong>Preemption:</strong> Non-preemptive by design</li>
                </ul>

                <div className="algorithm-box">
                  <h6>FCFS Performance Analysis</h6>
                  <p>Average Waiting Time = Σ(Waiting Time) / Number of Processes</p>
                  <p>Convoy Effect Impact: Short processes can wait 10-100x their execution time</p>
                  <p>Best Case: All processes have equal burst times</p>
                  <p>Worst Case: Long process followed by many short processes</p>
                </div>

                <h5>Convoy Effect Analysis</h5>
                <ul>
                  <li><strong>Definition:</strong> Short processes blocked behind long CPU-bound process</li>
                  <li><strong>Impact:</strong> Reduces CPU and device utilization significantly</li>
                  <li><strong>Example:</strong> 1 CPU-bound process + 10 I/O-bound processes</li>
                  <li><strong>Mitigation:</strong> Use preemptive scheduling algorithms</li>
                </ul>
              </div>

              <h4>2. Shortest Job First (SJF) Scheduling</h4>
              <div className="algorithm-details">
                <h5>Theoretical Foundation</h5>
                <ul>
                  <li><strong>Optimality Proof:</strong> Minimizes average waiting time (proven mathematically)</li>
                  <li><strong>Greedy Algorithm:</strong> Always selects shortest remaining job</li>
                  <li><strong>Variants:</strong> Non-preemptive SJF and Preemptive SRTF</li>
                  <li><strong>Implementation:</strong> Priority queue or min-heap data structure</li>
                </ul>

                <div className="algorithm-box">
                  <h6>SJF Mathematical Properties</h6>
                  <p>Optimal Average Waiting Time = Σ(i × burst_time[i]) / n</p>
                  <p>where processes are sorted by burst time in ascending order</p>
                  <p>Reduction in waiting time: 20-60% compared to FCFS</p>
                </div>

                <h5>Burst Time Prediction Techniques</h5>
                <ul>
                  <li><strong>Exponential Averaging:</strong> τ(n+1) = α × t(n) + (1-α) × τ(n)</li>
                  <li><strong>Historical Analysis:</strong> Use past execution patterns</li>
                  <li><strong>Static Estimation:</strong> User-provided estimates with penalties</li>
                  <li><strong>Dynamic Profiling:</strong> Runtime behavior analysis</li>
                </ul>

                <h5>Starvation Problem</h5>
                <ul>
                  <li><strong>Cause:</strong> Continuous arrival of shorter processes</li>
                  <li><strong>Impact:</strong> Long processes may never execute</li>
                  <li><strong>Solution:</strong> Aging mechanism increases priority over time</li>
                  <li><strong>Implementation:</strong> Priority = Base Priority + (Current Time - Arrival Time)</li>
                </ul>
              </div>

              <h4>3. Priority Scheduling</h4>
              <div className="algorithm-details">
                <h5>Priority Assignment Strategies</h5>
                <ul>
                  <li><strong>Static Priorities:</strong> Fixed at process creation (real-time systems)</li>
                  <li><strong>Dynamic Priorities:</strong> Change based on behavior and system state</li>
                  <li><strong>Internal Priorities:</strong> OS-defined (I/O completion, system processes)</li>
                  <li><strong>External Priorities:</strong> User-defined (nice values, process classes)</li>
                </ul>

                <div className="algorithm-box">
                  <h6>Priority Calculation Examples</h6>
                  <p>Linux Nice Values: Priority = 20 + nice_value (-20 to +19)</p>
                  <p>Windows Priority Classes: Real-time (24-31), High (13-15), Normal (6-10)</p>
                  <p>Aging Formula: New_Priority = Old_Priority + Age_Factor</p>
                </div>

                <h5>Advanced Priority Mechanisms</h5>
                <ul>
                  <li><strong>Priority Inheritance:</strong> Prevents priority inversion in synchronization</li>
                  <li><strong>Priority Ceiling:</strong> Raises priority to highest possible level</li>
                  <li><strong>Multilevel Priorities:</strong> Separate queues for different priority levels</li>
                  <li><strong>Deadline-based:</strong> Priority inversely related to deadline proximity</li>
                </ul>
              </div>

              <h4>4. Round Robin (RR) Scheduling</h4>
              <div className="algorithm-details">
                <h5>Time Quantum Optimization</h5>
                <ul>
                  <li><strong>Small Quantum (1-10ms):</strong> Better response time, higher overhead</li>
                  <li><strong>Large Quantum (100ms+):</strong> Approaches FCFS behavior</li>
                  <li><strong>Optimal Range:</strong> 10-100ms for most interactive systems</li>
                  <li><strong>Adaptive Quantum:</strong> Adjust based on system load and process behavior</li>
                </ul>

                <div className="algorithm-box">
                  <h6>Round Robin Performance Metrics</h6>
                  <p>Context Switch Overhead = (Switch Time / Quantum) × 100%</p>
                  <p>Optimal Quantum ≈ 80% of average CPU burst time</p>
                  <p>Response Time ≤ (n-1) × quantum for n processes</p>
                </div>

                <h5>Implementation Considerations</h5>
                <ul>
                  <li><strong>Timer Interrupts:</strong> Hardware timer generates periodic interrupts</li>
                  <li><strong>Queue Management:</strong> Circular queue for ready processes</li>
                  <li><strong>Context Switching:</strong> Save/restore process state efficiently</li>
                  <li><strong>Quantum Expiry:</strong> Move process to end of ready queue</li>
                </ul>
              </div>

              <h4>5. Advanced Scheduling Algorithms</h4>
              <div className="algorithm-details">
                <h5>Multilevel Queue Scheduling</h5>
                <ul>
                  <li><strong>Queue Classification:</strong> System, Interactive, Batch, Student processes</li>
                  <li><strong>Fixed Priority:</strong> Higher level queues always served first</li>
                  <li><strong>Time Slicing:</strong> Allocate percentage of CPU time to each queue</li>
                  <li><strong>Process Migration:</strong> Processes cannot move between queues</li>
                </ul>

                <h5>Multilevel Feedback Queue (MLFQ)</h5>
                <ul>
                  <li><strong>Dynamic Classification:</strong> Processes move between queues based on behavior</li>
                  <li><strong>CPU-bound Detection:</strong> Demote processes that use full quantum</li>
                  <li><strong>I/O-bound Promotion:</strong> Promote processes that block before quantum</li>
                  <li><strong>Aging Prevention:</strong> Periodic promotion to prevent starvation</li>
                </ul>

                <div className="algorithm-box">
                  <h6>MLFQ Rules (Simplified)</h6>
                  <p>Rule 1: If Priority(A) &gt; Priority(B), A runs</p>
                  <p>Rule 2: If Priority(A) = Priority(B), run in RR</p>
                  <p>Rule 3: New processes start at highest priority</p>
                  <p>Rule 4: Demote after using full time slice</p>
                  <p>Rule 5: Periodic priority boost to prevent starvation</p>
                </div>
              </div>
            </section>

            <div className="video-embed">
              <h4>CPU Scheduling Algorithms</h4>
              <p>Comprehensive explanation of FCFS, SJF, Priority, and Round Robin scheduling algorithms.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/YxNyJ-CUINc"
                title="CPU Scheduling Algorithms"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Scheduling Algorithm Examples</h4>
              <p>Step-by-step examples and calculations for different scheduling algorithms.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/TxjIlNYRZ5M"
                title="Scheduling Algorithm Examples"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 3 Quiz" questions={module3Quiz} subject="OS" unitId={2} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← Process Scheduling</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">Multithreading & IPC →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.4</div>
              <div className="lesson-title-main">
                <h1>Multithreading & IPC</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Multithreading Architecture & Implementation</h3>
              <div className="theory-box">
                <p>Multithreading represents a fundamental paradigm shift in process design, enabling concurrent execution within a single address space. This architecture maximizes resource utilization while minimizing the overhead associated with traditional process-based concurrency.</p>
                
                <div className="performance-metrics">
                  <h4>Threading Performance Characteristics</h4>
                  <ul>
                    <li><strong>Thread Creation:</strong> 10-100x faster than process creation</li>
                    <li><strong>Context Switch:</strong> 2-5x faster than process context switch</li>
                    <li><strong>Memory Overhead:</strong> 2-8KB per thread vs 1-4MB per process</li>
                    <li><strong>Communication:</strong> Shared memory access in nanoseconds</li>
                  </ul>
                </div>
              </div>

              <h4>Thread Architecture and Components</h4>
              <div className="thread-details">
                <h5>Thread Control Block (TCB) Structure</h5>
                <ul>
                  <li><strong>Thread ID (TID):</strong> Unique identifier within process context</li>
                  <li><strong>Register Set:</strong> CPU registers including program counter</li>
                  <li><strong>Stack Pointer:</strong> Points to thread's private stack area</li>
                  <li><strong>Thread State:</strong> Running, Ready, Blocked, Terminated</li>
                  <li><strong>Priority:</strong> Scheduling priority within process</li>
                  <li><strong>Signal Mask:</strong> Thread-specific signal handling configuration</li>
                </ul>

                <h5>Shared vs Private Resources</h5>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr><th>Resource Type</th><th>Shared Among Threads</th><th>Private to Each Thread</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Memory</td><td>Code, Data, Heap segments</td><td>Stack, Registers</td></tr>
                      <tr><td>Files</td><td>Open file descriptors</td><td>File position pointers</td></tr>
                      <tr><td>Signals</td><td>Signal handlers</td><td>Signal masks, pending signals</td></tr>
                      <tr><td>IPC</td><td>Pipes, message queues</td><td>Thread-local storage</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h4>Multithreading Models: Implementation Strategies</h4>
              <div className="threading-models">
                <h5>1. Many-to-One Model (User-Level Threading)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Implementation:</strong> Thread library manages all threading operations</li>
                    <li><strong>Kernel Awareness:</strong> Kernel sees only single-threaded process</li>
                    <li><strong>Performance:</strong> Fast thread operations (no system calls)</li>
                    <li><strong>Limitations:</strong> No true parallelism, blocking system calls affect all threads</li>
                    <li><strong>Examples:</strong> GNU Portable Threads, early Java green threads</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>User-Level Threading Performance</h6>
                    <p>Thread Creation Time: 1-10 microseconds</p>
                    <p>Context Switch Time: 0.1-1 microseconds</p>
                    <p>Scalability: Limited by single kernel thread</p>
                  </div>
                </div>

                <h5>2. One-to-One Model (Kernel-Level Threading)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Implementation:</strong> Each user thread maps to kernel thread</li>
                    <li><strong>Concurrency:</strong> True parallelism on multiprocessor systems</li>
                    <li><strong>Blocking Behavior:</strong> Individual thread blocking doesn't affect others</li>
                    <li><strong>Overhead:</strong> Higher due to kernel involvement in thread operations</li>
                    <li><strong>Examples:</strong> Windows threads, Linux NPTL, Solaris threads</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Kernel-Level Threading Performance</h6>
                    <p>Thread Creation Time: 10-100 microseconds</p>
                    <p>Context Switch Time: 1-10 microseconds</p>
                    <p>Scalability: Limited by kernel thread limits (1000-10000)</p>
                  </div>
                </div>

                <h5>3. Many-to-Many Model (Hybrid Threading)</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Implementation:</strong> M user threads multiplexed onto N kernel threads</li>
                    <li><strong>Flexibility:</strong> Combines benefits of both previous models</li>
                    <li><strong>Scheduler Activations:</strong> Kernel notifies user-level scheduler of events</li>
                    <li><strong>Complexity:</strong> Requires sophisticated scheduling coordination</li>
                    <li><strong>Examples:</strong> Solaris (historical), some research systems</li>
                  </ul>
                </div>
              </div>

              <h4>Advanced Threading Concepts</h4>
              <div className="advanced-threading">
                <h5>Thread Pools and Management</h5>
                <ul>
                  <li><strong>Thread Pool Benefits:</strong> Reduced creation overhead, controlled resource usage</li>
                  <li><strong>Pool Sizing:</strong> Typically CPU cores × 2 for CPU-bound tasks</li>
                  <li><strong>Work Stealing:</strong> Idle threads steal work from busy thread queues</li>
                  <li><strong>Dynamic Sizing:</strong> Adjust pool size based on workload characteristics</li>
                </ul>

                <h5>Thread Synchronization Primitives</h5>
                <ul>
                  <li><strong>Mutex (Mutual Exclusion):</strong> Binary semaphore for critical sections</li>
                  <li><strong>Condition Variables:</strong> Wait for specific conditions to become true</li>
                  <li><strong>Read-Write Locks:</strong> Multiple readers or single writer access</li>
                  <li><strong>Atomic Operations:</strong> Hardware-supported lock-free operations</li>
                </ul>
              </div>

              <h3>Inter-Process Communication: Comprehensive Framework</h3>
              <div className="theory-box">
                <p>Inter-Process Communication (IPC) provides the fundamental mechanisms for process coordination and data exchange in modern operating systems. These mechanisms enable complex distributed applications and system services through various communication paradigms.</p>
                
                <div className="performance-metrics">
                  <h4>IPC Performance Comparison</h4>
                  <ul>
                    <li><strong>Shared Memory:</strong> 1-10 GB/s throughput, lowest latency</li>
                    <li><strong>Pipes:</strong> 100-500 MB/s throughput, moderate latency</li>
                    <li><strong>Message Queues:</strong> 10-100 MB/s, higher latency but reliable</li>
                    <li><strong>Sockets:</strong> 1-10 GB/s (local), network-dependent (remote)</li>
                  </ul>
                </div>
              </div>

              <h4>Fundamental IPC Paradigms</h4>
              <div className="ipc-paradigms">
                <h5>1. Shared Memory Communication</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Implementation:</strong> Memory-mapped files, System V shared memory, POSIX shared memory</li>
                    <li><strong>Synchronization Required:</strong> Semaphores, mutexes, or atomic operations</li>
                    <li><strong>Performance:</strong> Fastest IPC method, direct memory access</li>
                    <li><strong>Scalability:</strong> Limited by memory bandwidth and cache coherency</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Shared Memory Performance Analysis</h6>
                    <p>Bandwidth: Limited by memory bus speed (10-100 GB/s)</p>
                    <p>Latency: CPU cache access time (1-10 ns)</p>
                    <p>Overhead: Synchronization primitives (10-100 ns)</p>
                  </div>
                  
                  <h6>Producer-Consumer Implementation</h6>
                  <ul>
                    <li><strong>Circular Buffer:</strong> Fixed-size buffer with head/tail pointers</li>
                    <li><strong>Synchronization:</strong> Full/empty semaphores + mutex for buffer access</li>
                    <li><strong>Bounded Buffer:</strong> Prevents buffer overflow/underflow conditions</li>
                    <li><strong>Performance Optimization:</strong> Lock-free algorithms using atomic operations</li>
                  </ul>
                </div>

                <h5>2. Message Passing Communication</h5>
                <div className="technical-details">
                  <ul>
                    <li><strong>Direct Communication:</strong> Processes explicitly name each other</li>
                    <li><strong>Indirect Communication:</strong> Messages sent through mailboxes/ports</li>
                    <li><strong>Synchronization:</strong> Blocking (synchronous) vs Non-blocking (asynchronous)</li>
                    <li><strong>Buffering:</strong> Zero capacity, bounded capacity, unbounded capacity</li>
                  </ul>
                  
                  <div className="algorithm-box">
                    <h6>Message Passing Models</h6>
                    <p>Synchronous: send() blocks until receive() called</p>
                    <p>Asynchronous: send() returns immediately, message buffered</p>
                    <p>Rendezvous: Both send() and receive() block until handshake</p>
                  </div>
                </div>
              </div>

              <h4>Advanced IPC Mechanisms</h4>
              <div className="advanced-ipc">
                <h5>1. Pipes and Named Pipes (FIFOs)</h5>
                <div className="pipe-details">
                  <h6>Anonymous Pipes</h6>
                  <ul>
                    <li><strong>Scope:</strong> Parent-child process communication only</li>
                    <li><strong>Implementation:</strong> Kernel buffer (typically 4-64KB)</li>
                    <li><strong>Characteristics:</strong> Unidirectional, byte-stream oriented</li>
                    <li><strong>Performance:</strong> 100-500 MB/s throughput</li>
                  </ul>
                  
                  <h6>Named Pipes (FIFOs)</h6>
                  <ul>
                    <li><strong>Scope:</strong> Any processes with appropriate permissions</li>
                    <li><strong>Persistence:</strong> Exists in filesystem namespace</li>
                    <li><strong>Bidirectional:</strong> Can be opened for read/write by different processes</li>
                    <li><strong>Blocking Behavior:</strong> Configurable blocking/non-blocking modes</li>
                  </ul>
                </div>

                <h5>2. Message Queues</h5>
                <div className="queue-details">
                  <h6>System V Message Queues</h6>
                  <ul>
                    <li><strong>Message Structure:</strong> Type field + data payload</li>
                    <li><strong>Selection:</strong> FIFO or by message type</li>
                    <li><strong>Limits:</strong> System-wide limits on queues, messages, total size</li>
                    <li><strong>Persistence:</strong> Survives process termination</li>
                  </ul>
                  
                  <h6>POSIX Message Queues</h6>
                  <ul>
                    <li><strong>Priority-based:</strong> Messages have priority levels</li>
                    <li><strong>Notification:</strong> Asynchronous notification mechanisms</li>
                    <li><strong>Real-time:</strong> Suitable for real-time applications</li>
                    <li><strong>Portability:</strong> POSIX standard compliance</li>
                  </ul>
                </div>

                <h5>3. Sockets</h5>
                <div className="socket-details">
                  <h6>Unix Domain Sockets</h6>
                  <ul>
                    <li><strong>Performance:</strong> Optimized for local communication</li>
                    <li><strong>Types:</strong> Stream (SOCK_STREAM) and Datagram (SOCK_DGRAM)</li>
                    <li><strong>File Descriptor Passing:</strong> Can pass file descriptors between processes</li>
                    <li><strong>Security:</strong> Filesystem permissions control access</li>
                  </ul>
                  
                  <h6>Network Sockets</h6>
                  <ul>
                    <li><strong>TCP Sockets:</strong> Reliable, connection-oriented communication</li>
                    <li><strong>UDP Sockets:</strong> Unreliable, connectionless communication</li>
                    <li><strong>Performance:</strong> Network-dependent, 1-100 Gbps possible</li>
                    <li><strong>Scalability:</strong> Supports distributed systems architecture</li>
                  </ul>
                </div>
              </div>

              <h4>Synchronization and Coordination</h4>
              <div className="synchronization-details">
                <h5>Critical Section Problem</h5>
                <ul>
                  <li><strong>Mutual Exclusion:</strong> Only one process in critical section</li>
                  <li><strong>Progress:</strong> Selection cannot be postponed indefinitely</li>
                  <li><strong>Bounded Waiting:</strong> Limit on waiting time for critical section entry</li>
                  <li><strong>Performance:</strong> Minimize overhead of synchronization</li>
                </ul>

                <h5>Synchronization Primitives</h5>
                <div className="primitives-table">
                  <table>
                    <thead>
                      <tr><th>Primitive</th><th>Use Case</th><th>Performance</th><th>Complexity</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Semaphores</td><td>Resource counting, signaling</td><td>10-100 ns</td><td>Low</td></tr>
                      <tr><td>Mutexes</td><td>Critical section protection</td><td>10-50 ns</td><td>Low</td></tr>
                      <tr><td>Condition Variables</td><td>Event waiting</td><td>100-1000 ns</td><td>Medium</td></tr>
                      <tr><td>Monitors</td><td>High-level synchronization</td><td>100-1000 ns</td><td>High</td></tr>
                      <tr><td>Barriers</td><td>Phase synchronization</td><td>1-10 μs</td><td>Medium</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="video-embed">
              <h4>Multithreading in Operating Systems</h4>
              <p>Understanding threads, multithreading models, and benefits of multithreading.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/exbKr6fnoUw"
                title="Multithreading in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Inter-Process Communication</h4>
              <p>Learn about IPC mechanisms including shared memory and message passing.</p>
              <iframe
                width="50%"
                height="300"
                src="https://www.youtube.com/embed/dJuYKfR8vec"
                title="Inter-Process Communication"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 4 Quiz" questions={module4Quiz} subject="OS" unitId={2} moduleId={4} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← Scheduling Algorithms</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Unit 2 Comprehensive Quiz →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">2.5</div>
              <div className="lesson-title-main">
                <h1>Unit 2 Comprehensive Assessment</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Process Management Mastery Evaluation</h3>
              <div className="theory-box">
                <p>This comprehensive assessment evaluates your understanding of fundamental process management concepts, scheduling algorithms, multithreading architectures, and inter-process communication mechanisms. The quiz integrates theoretical knowledge with practical implementation scenarios.</p>
                
                <div className="performance-metrics">
                  <h4>Assessment Coverage</h4>
                  <ul>
                    <li><strong>Process Concepts:</strong> 25% - PCB, states, operations, memory layout</li>
                    <li><strong>Scheduling:</strong> 30% - Algorithms, performance metrics, optimization</li>
                    <li><strong>Multithreading:</strong> 25% - Models, synchronization, performance</li>
                    <li><strong>IPC Mechanisms:</strong> 20% - Communication paradigms, implementation</li>
                  </ul>
                </div>
              </div>

              <h4>Learning Objectives Assessment</h4>
              <div className="assessment-objectives">
                <h5>1. Process Architecture Understanding</h5>
                <ul>
                  <li>Analyze process memory layout and component interactions</li>
                  <li>Evaluate process state transitions and lifecycle management</li>
                  <li>Compare process creation and termination mechanisms</li>
                  <li>Assess PCB structure and information management</li>
                </ul>

                <h5>2. Scheduling Algorithm Proficiency</h5>
                <ul>
                  <li>Calculate performance metrics for different scheduling algorithms</li>
                  <li>Analyze trade-offs between throughput, response time, and fairness</li>
                  <li>Design optimal scheduling policies for specific system requirements</li>
                  <li>Evaluate preemptive vs non-preemptive scheduling impacts</li>
                </ul>

                <h5>3. Multithreading Implementation Analysis</h5>
                <ul>
                  <li>Compare threading models and their performance characteristics</li>
                  <li>Analyze synchronization mechanisms and their overhead</li>
                  <li>Evaluate thread pool design and management strategies</li>
                  <li>Assess race conditions and synchronization solutions</li>
                </ul>

                <h5>4. IPC Mechanism Selection</h5>
                <ul>
                  <li>Choose appropriate IPC mechanisms for specific scenarios</li>
                  <li>Analyze performance characteristics of different IPC methods</li>
                  <li>Design synchronization solutions for producer-consumer problems</li>
                  <li>Evaluate distributed system communication requirements</li>
                </ul>
              </div>

              <h4>Assessment Format and Expectations</h4>
              <div className="assessment-format">
                <h5>Question Types</h5>
                <ul>
                  <li><strong>Conceptual Analysis:</strong> 40% - Theoretical understanding and principles</li>
                  <li><strong>Performance Calculations:</strong> 30% - Quantitative analysis and metrics</li>
                  <li><strong>Design Problems:</strong> 20% - System design and optimization</li>
                  <li><strong>Comparative Analysis:</strong> 10% - Algorithm and mechanism comparison</li>
                </ul>

                <h5>Performance Standards</h5>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr><th>Score Range</th><th>Performance Level</th><th>Competency Description</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>90-100%</td><td>Mastery</td><td>Comprehensive understanding with application ability</td></tr>
                      <tr><td>80-89%</td><td>Proficient</td><td>Strong grasp of concepts with minor gaps</td></tr>
                      <tr><td>70-79%</td><td>Developing</td><td>Basic understanding requiring reinforcement</td></tr>
                      <tr><td>60-69%</td><td>Beginning</td><td>Fundamental concepts present but incomplete</td></tr>
                      <tr><td>&lt; 60%</td><td>Needs Support</td><td>Requires additional study and practice</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h4>Study Recommendations</h4>
              <div className="study-recommendations">
                <h5>Pre-Assessment Preparation</h5>
                <ul>
                  <li><strong>Review Key Formulas:</strong> Scheduling metrics, performance calculations</li>
                  <li><strong>Practice Problems:</strong> Work through scheduling algorithm examples</li>
                  <li><strong>Concept Mapping:</strong> Create visual connections between topics</li>
                  <li><strong>Implementation Analysis:</strong> Study real-world OS implementations</li>
                </ul>

                <h5>Post-Assessment Actions</h5>
                <ul>
                  <li><strong>Score Analysis:</strong> Identify knowledge gaps by topic area</li>
                  <li><strong>Targeted Review:</strong> Focus on lowest-scoring concept areas</li>
                  <li><strong>Practical Application:</strong> Implement concepts in programming exercises</li>
                  <li><strong>Peer Discussion:</strong> Engage in collaborative problem-solving</li>
                </ul>
              </div>
            </section>

            <Quiz title="Unit 2 Comprehensive Quiz" questions={unit2Quiz} subject="OS" unitId={2} moduleId={5} />

            <div className="reference-section">
              <h3>Reference Materials</h3>
              <ul>
                <li><a href="https://www.geeksforgeeks.org/introduction-of-process-management/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Process Management</a></li>
                <li><a href="https://www.tutorialspoint.com/operating_system/os_process_scheduling.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint - Process Scheduling</a></li>
                <li><a href="https://nptel.ac.in/courses/106/106/106106144/" target="_blank" rel="noopener noreferrer">NPTEL - Operating Systems</a></li>
                <li><a href="http://peterindia.net/OperatingSystems.html" target="_blank" rel="noopener noreferrer">Peter India - Operating Systems</a></li>
                <li><a href="https://www.javatpoint.com/os-process-schedulers" target="_blank" rel="noopener noreferrer">JavaTpoint - Process Schedulers</a></li>
              </ul>
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Multithreading & IPC</button>
              {onBack && (
                <button onClick={onBack} className="next-module-btn">Back to Course →</button>
              )}
            </div>
          </div>
        );

      default:
        return <div>Module content loading...</div>;
    }
  };

  return <div className="unit-container">{renderModule()}</div>;
};

export default Unit2;

