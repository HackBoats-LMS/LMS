'use client';
import React from 'react';
import Quiz from '../components/Quiz';

interface Unit3Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit3: React.FC<Unit3Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const module1Quiz = [
    {
      question: "What is concurrency in operating systems?",
      options: ["Running one process at a time", "Multiple processes making progress simultaneously", "Sequential execution", "Single-threaded execution"],
      correctAnswer: 1,
      explanation: "Concurrency is when multiple processes make progress by interleaving their execution, giving the illusion of simultaneous execution."
    },
    {
      question: "Which is NOT an advantage of concurrency?",
      options: ["Better resource utilization", "Improved responsiveness", "Simpler program design", "Increased throughput"],
      correctAnswer: 2,
      explanation: "Concurrency actually makes program design more complex due to synchronization and coordination requirements."
    },
    {
      question: "What is a race condition?",
      options: ["Fast execution", "Multiple processes accessing shared data simultaneously", "Process scheduling", "CPU competition"],
      correctAnswer: 1,
      explanation: "A race condition occurs when multiple processes access and manipulate shared data concurrently, and the outcome depends on the order of execution."
    }
  ];

  const module2Quiz = [
    {
      question: "What is the critical section problem?",
      options: ["CPU scheduling issue", "Ensuring mutual exclusion in shared resource access", "Memory allocation", "Deadlock detection"],
      correctAnswer: 1,
      explanation: "The critical section problem is about ensuring that when one process is executing in its critical section, no other process can execute in its critical section."
    },
    {
      question: "What is a semaphore?",
      options: ["A scheduling algorithm", "A synchronization tool", "A memory management technique", "A file system"],
      correctAnswer: 1,
      explanation: "A semaphore is a synchronization tool that uses an integer variable to control access to shared resources."
    },
    {
      question: "What are the two atomic operations on semaphores?",
      options: ["lock and unlock", "wait and signal", "push and pop", "read and write"],
      correctAnswer: 1,
      explanation: "Semaphores support two atomic operations: wait() (also called P or down) and signal() (also called V or up)."
    }
  ];

  const module3Quiz = [
    {
      question: "What are the four necessary conditions for deadlock?",
      options: ["Mutual exclusion, hold and wait, no preemption, circular wait", "Starvation, waiting, blocking, termination", "Priority, scheduling, allocation, deallocation", "Creation, execution, waiting, termination"],
      correctAnswer: 0,
      explanation: "The four Coffman conditions for deadlock are: mutual exclusion, hold and wait, no preemption, and circular wait."
    },
    {
      question: "Which deadlock handling strategy is most commonly used?",
      options: ["Prevention", "Avoidance", "Detection and Recovery", "Ignore the problem"],
      correctAnswer: 3,
      explanation: "Most operating systems, including Windows and Linux, use the ostrich algorithm - ignoring the problem as deadlocks are rare."
    },
    {
      question: "What is the Banker's Algorithm used for?",
      options: ["Deadlock prevention", "Deadlock avoidance", "Deadlock detection", "Deadlock recovery"],
      correctAnswer: 1,
      explanation: "The Banker's Algorithm is a deadlock avoidance algorithm that checks if granting a resource request will leave the system in a safe state."
    }
  ];

  const unit3Quiz = [
    {
      question: "What is the main difference between concurrency and parallelism?",
      options: ["No difference", "Concurrency is about dealing with multiple things, parallelism is doing multiple things", "Parallelism is slower", "Concurrency requires multiple CPUs"],
      correctAnswer: 1,
      explanation: "Concurrency is about dealing with multiple things at once (structure), while parallelism is about doing multiple things at once (execution)."
    },
    {
      question: "What is a monitor in process synchronization?",
      options: ["A hardware device", "A high-level synchronization construct", "A scheduling algorithm", "A memory management tool"],
      correctAnswer: 1,
      explanation: "A monitor is a high-level synchronization construct that provides mutual exclusion and condition variables for process synchronization."
    },
    {
      question: "In the Dining Philosophers problem, what causes deadlock?",
      options: ["Too many philosophers", "Each philosopher holds one chopstick and waits for another", "Insufficient food", "Slow eating"],
      correctAnswer: 1,
      explanation: "Deadlock occurs when each philosopher picks up their left chopstick and waits indefinitely for the right chopstick."
    },
    {
      question: "What is a safe state in deadlock avoidance?",
      options: ["No processes running", "System can allocate resources to each process in some order and avoid deadlock", "All resources are free", "No processes waiting"],
      correctAnswer: 1,
      explanation: "A safe state is one where the system can allocate resources to each process in some order and still avoid deadlock."
    },
    {
      question: "Which is NOT a deadlock recovery method?",
      options: ["Process termination", "Resource preemption", "Deadlock prevention", "Rollback"],
      correctAnswer: 2,
      explanation: "Deadlock prevention is a proactive approach to avoid deadlock, not a recovery method after deadlock has occurred."
    }
  ];

  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">3.1</div>
              <div className="lesson-title-main">
                <h1>Concurrency Principles</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>What is Concurrency?</h3>
              <p>Concurrency is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome. It's a fundamental concept in modern operating systems that allows multiple processes to make progress.</p>

              <h4>Concurrency vs Parallelism:</h4>
              <ul>
                <li><strong>Concurrency:</strong> Multiple tasks making progress (dealing with multiple things at once) - can occur on single CPU through time-slicing</li>
                <li><strong>Parallelism:</strong> Multiple tasks executing simultaneously (doing multiple things at once) - requires multiple CPUs/cores</li>
              </ul>

              <div className="image-container">
                <img src="https://media.brightdata.com/2025/04/Concurrency-vs-Parallelism-og.png" alt="Concurrency vs Parallelism" />
                <p className="image-caption">Figure 3.1: Concurrency vs Parallelism</p>
              </div>

              <h3>Principles of Concurrency</h3>

              <h4>Core Principles:</h4>
              <ul>
                <li><strong>Atomicity:</strong> Operations execute as indivisible units - either completely or not at all</li>
                <li><strong>Consistency:</strong> System maintains valid state transitions even with concurrent operations</li>
                <li><strong>Isolation:</strong> Concurrent operations don't interfere with each other</li>
                <li><strong>Durability:</strong> Completed operations persist despite failures</li>
              </ul>

              <h4>Design Principles:</h4>
              <ul>
                <li><strong>Lock Freedom:</strong> System makes progress despite individual thread failures</li>
                <li><strong>Wait Freedom:</strong> Every thread completes within bounded steps</li>
                <li><strong>Obstruction Freedom:</strong> Thread completes if it runs alone</li>
                <li><strong>Progress Guarantees:</strong> Ensure forward movement of execution</li>
              </ul>

              <h3>Advantages of Concurrency</h3>

              <h4>Performance Benefits:</h4>
              <ul>
                <li><strong>Better Resource Utilization:</strong> CPU can work on other tasks while waiting for I/O operations</li>
                <li><strong>Improved Responsiveness:</strong> System remains responsive even during long operations</li>
                <li><strong>Increased Throughput:</strong> More tasks completed in given time period</li>
                <li><strong>Scalability:</strong> Can handle increased workload efficiently by utilizing multiple processors</li>
              </ul>

              <h4>Architectural Benefits:</h4>
              <ul>
                <li><strong>Modularity:</strong> Natural decomposition of complex problems into concurrent components</li>
                <li><strong>Expressiveness:</strong> Natural modeling of real-world concurrent scenarios</li>
                <li><strong>Shared Resources:</strong> Efficient sharing of system resources among processes</li>
                <li><strong>Parallel Processing:</strong> Ability to utilize multiprocessor architectures effectively</li>
              </ul>

              <h3>Problems in Concurrency</h3>

              <h4>1. Race Condition</h4>
              <p>A race condition occurs when multiple processes access and manipulate shared data concurrently, and the outcome depends on the particular order of execution. This is one of the most critical issues in concurrent systems.</p>

              <div className="example-box">
                <h5>Race Condition Example</h5>
                <p>Assume shared variable 'counter' = 5</p>
                <ul>
                  <li>Process P1 executes: counter = counter + 1</li>
                  <li>Process P2 executes: counter = counter - 1</li>
                </ul>
                <p><strong>Without Synchronization:</strong></p>
                <ol>
                  <li>P1 reads counter (value: 5)</li>
                  <li>P2 reads counter (value: 5)</li>
                  <li>P1 increments: 5 + 1 = 6</li>
                  <li>P2 decrements: 5 - 1 = 4</li>
                  <li>P1 writes: counter = 6</li>
                  <li>P2 writes: counter = 4 (incorrect!)</li>
                </ol>
                <p><strong>Expected:</strong> counter = 5 (5 + 1 - 1)</p>
                <p><strong>Actual:</strong> counter = 4 (race condition occurred)</p>
              </div>

              <h5>Conditions for Race Conditions:</h5>
              <ul>
                <li><strong>Shared Data:</strong> Multiple processes access same data</li>
                <li><strong>Concurrent Execution:</strong> Processes run simultaneously</li>
                <li><strong>At Least One Writer:</strong> At least one process modifies data</li>
                <li><strong>Unsynchronized Access:</strong> No coordination mechanism in place</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250828145546671401/frame_3088.webp" alt="Race Condition" />
                <p className="image-caption">Figure 3.2: Race Condition Example</p>
              </div>

              <h4>2. Deadlock</h4>
              <p>A situation where two or more processes are waiting for each other to release resources, creating a circular wait that prevents any of them from proceeding.</p>

              <h4>3. Starvation</h4>
              <p>A process waits indefinitely because other processes are continuously given preference, preventing it from accessing required resources.</p>

              <h4>4. Priority Inversion</h4>
              <p>A high-priority process is indirectly preempted by a lower-priority process that holds a resource the high-priority process needs.</p>

              <h3>Issues of Concurrency</h3>

              <h4>Technical Issues:</h4>
              <ul>
                <li><strong>Complexity:</strong> Increased difficulty in design, implementation, and debugging</li>
                <li><strong>Overhead:</strong> Synchronization and context switching costs</li>
                <li><strong>Testing Difficulty:</strong> Non-deterministic behavior makes testing challenging</li>
                <li><strong>Debugging Challenges:</strong> Hard-to-reproduce issues due to timing dependencies</li>
              </ul>

              <h4>System Issues:</h4>
              <ul>
                <li><strong>Deadlock Risk:</strong> Potential for complete system halt</li>
                <li><strong>Starvation Risk:</strong> Fairness issues in resource allocation</li>
                <li><strong>Priority Inversion:</strong> High-priority tasks delayed by low-priority tasks</li>
                <li><strong>Resource Contention:</strong> Competition for limited resources</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Introduction to Concurrency</h4>
              <p>Comprehensive introduction to concurrency, its principles, advantages, and challenges in operating systems.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/olYdb0DdGtM"
                title="Introduction to Concurrency"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Concurrency Problems</h4>
              <p>Understanding race conditions, deadlocks, and other concurrency issues with examples.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iKtvNJQoCNw"
                title="Concurrency Problems"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 1 Quiz" questions={module1Quiz} subject="OS" unitId={3} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">Process Synchronization →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">3.2</div>
              <div className="lesson-title-main">
                <h1>Process Synchronization</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Critical Section Problem</h3>
              <p>The critical section is a segment of code where shared resources are accessed. The critical section problem is to design a protocol that processes can use to cooperate and ensure that when one process is executing in its critical section, no other process can execute in its critical section.</p>

              <h4>Requirements for Solution:</h4>
              <ul>
                <li><strong>Mutual Exclusion:</strong> Only one process can execute in critical section at a time</li>
                <li><strong>Progress:</strong> If no process is in critical section, selection of next process cannot be postponed indefinitely</li>
                <li><strong>Bounded Waiting:</strong> There exists a bound on number of times other processes can enter critical section after a process has made request</li>
              </ul>

              <h3>Synchronization Hardware</h3>
              <p>Modern processors provide special hardware instructions to support synchronization primitives, making them more efficient and reliable than software-only solutions.</p>

              <h4>Atomic Hardware Instructions:</h4>
              <ul>
                <li><strong>Test-and-Set:</strong> Atomically test and modify memory location</li>
                <li><strong>Compare-and-Swap (CAS):</strong> Conditional atomic update operation</li>
                <li><strong>Swap:</strong> Atomic exchange of values between memory and register</li>
                <li><strong>Fetch-and-Add:</strong> Atomic increment operation</li>
              </ul>

              <div className="example-box">
                <h5>Test-and-Set Instruction</h5>
                <p>Atomically sets a boolean variable to true and returns its old value:</p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`boolean test_and_set(boolean *target) {
    boolean rv = *target;
    *target = true;
    return rv;
}`}
                </pre>
                <p>This operation is atomic - cannot be interrupted</p>
              </div>

              <h3>Peterson's Solution</h3>
              <p>Peterson's algorithm is a classic software-based synchronization solution for mutual exclusion between two processes using only shared memory for communication. It's a provably correct solution that doesn't require special hardware support.</p>

              <div className="example-box">
                <h5>Peterson's Algorithm (Two Processes)</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`// Shared variables
boolean flag[2] = {false, false}; // Interest flags
int turn;                          // Whose turn

// Process P0:
flag[0] = true;        // I want to enter
turn = 1;              // Give turn to P1
while (flag[1] && turn == 1) {
    // Busy wait
}
// Critical Section
flag[0] = false;       // Exit

// Process P1:
flag[1] = true;        // I want to enter
turn = 0;              // Give turn to P0
while (flag[0] && turn == 0) {
    // Busy wait
}
// Critical Section
flag[1] = false;       // Exit`}
                </pre>
              </div>

              <h4>Properties of Peterson's Solution:</h4>
              <ul>
                <li><strong>Mutual Exclusion:</strong> Only one process in critical section at a time</li>
                <li><strong>Progress:</strong> No process waits indefinitely outside critical section</li>
                <li><strong>Bounded Waiting:</strong> Limited waiting time guaranteed</li>
                <li><strong>Software Only:</strong> No special hardware required</li>
              </ul>

              <h4>Limitations:</h4>
              <ul>
                <li>Only works for two processes</li>
                <li>Busy waiting wastes CPU cycles</li>
                <li>Assumes specific memory ordering model</li>
                <li>Poor performance under high contention</li>
              </ul>

              <h3>Mutex Locks</h3>
              <p>Mutex (Mutual Exclusion) locks are the simplest synchronization tool. A process must acquire the lock before entering a critical section and release it when exiting.</p>

              <div className="example-box">
                <h5>Mutex Lock Operations</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`// Acquire lock
acquire() {
    while (!available)
        ; // busy wait
    available = false;
}

// Release lock
release() {
    available = true;
}

// Usage:
acquire(&mutex);
// Critical Section
release(&mutex);`}
                </pre>
              </div>

              <h4>Mutex Characteristics:</h4>
              <ul>
                <li><strong>Binary State:</strong> Either locked or unlocked</li>
                <li><strong>Ownership:</strong> Locked by specific thread, must be unlocked by same thread</li>
                <li><strong>Blocking:</strong> Thread waits if mutex is already locked</li>
                <li><strong>Recursive:</strong> Optionally allow same thread to lock multiple times</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20241015130619461685/Mutex.png" alt="Mutex Lock" />
                <p className="image-caption">Figure 3.3: Mutex Lock Mechanism</p>
              </div>
            </section>

            <div className="video-embed">
              <h4>Critical Section Problem</h4>
              <p>Understanding the critical section problem and requirements for its solution.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/qMQsd7Iy5jo"
                title="Critical Section Problem"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Peterson's Solution</h4>
              <p>Detailed explanation of Peterson's algorithm for mutual exclusion.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/gYCiTtgGR5Q"
                title="Peterson's Solution"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 2 Quiz" questions={module2Quiz} subject="OS" unitId={3} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← Concurrency Principles</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">Semaphores & Monitors →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">3.3</div>
              <div className="lesson-title-main">
                <h1>Semaphores & Monitors</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Semaphores</h3>
              <p>A semaphore is a synchronization tool that provides a more sophisticated way to synchronize processes than mutex locks. It's an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait() and signal().</p>

              <h4>Semaphore Operations:</h4>
              <div className="example-box">
                <h5>Wait and Signal Operations</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`wait(S) {  // Also called P() or down()
    while (S <= 0)
        ; // busy wait
    S--;
}

signal(S) {  // Also called V() or up()
    S++;
}`}
                </pre>
              </div>

              <h4>Types of Semaphores:</h4>
              <ul>
                <li><strong>Binary Semaphore:</strong> Value can be 0 or 1 (similar to mutex lock)</li>
                <li><strong>Counting Semaphore:</strong> Value can range over unrestricted domain (used for resource counting)</li>
              </ul>

              <div className="image-container">
                <img src="https://diversant.sk/CMSIS/Documentation/RTOS/html/Semaphore.png" alt="Semaphore" />
                <p className="image-caption">Figure 3.4: Semaphore Operations</p>
              </div>

              <h4>Semaphore Implementation (Without Busy Waiting):</h4>
              <div className="example-box">
                <h5>Blocking Semaphore</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`typedef struct {
    int value;
    struct process *list; // waiting queue
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;
        block();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove a process P from S->list;
        wakeup(P);
    }
}`}
                </pre>
              </div>

              <h4>Semaphore Applications:</h4>
              <ul>
                <li><strong>Mutual Exclusion:</strong> Binary semaphore initialized to 1</li>
                <li><strong>Resource Counting:</strong> Track available instances of a resource</li>
                <li><strong>Process Synchronization:</strong> Coordinate execution order</li>
                <li><strong>Buffer Management:</strong> Producer-consumer coordination</li>
              </ul>

              <h3>Classic Synchronization Problems</h3>

              <h4>1. Producer-Consumer Problem (Bounded Buffer)</h4>
              <p>Producers create items and place them in a buffer, while consumers remove items from the buffer. The challenge is to ensure buffer doesn't overflow or underflow.</p>

              <div className="example-box">
                <h5>Producer-Consumer Solution</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`semaphore mutex = 1;      // Mutual exclusion
semaphore empty = n;      // Empty slots
semaphore full = 0;       // Full slots

// Producer
do {
    // Produce item
    wait(empty);
    wait(mutex);
    // Add item to buffer
    signal(mutex);
    signal(full);
} while (true);

// Consumer
do {
    wait(full);
    wait(mutex);
    // Remove item from buffer
    signal(mutex);
    signal(empty);
    // Consume item
} while (true);`}
                </pre>
              </div>

              <h4>2. Readers-Writers Problem</h4>
              <p>Multiple readers can read simultaneously, but writers need exclusive access. Challenge is to prevent reader starvation or writer starvation.</p>

              <div className="example-box">
                <h5>Readers-Writers Solution (Reader Priority)</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`semaphore mutex = 1;      // Protect read_count
semaphore wrt = 1;        // Writer access
int read_count = 0;       // Number of readers

// Writer
wait(wrt);
// Writing is performed
signal(wrt);

// Reader
wait(mutex);
read_count++;
if (read_count == 1)
    wait(wrt);  // First reader locks
signal(mutex);
// Reading is performed
wait(mutex);
read_count--;
if (read_count == 0)
    signal(wrt);  // Last reader unlocks
signal(mutex);`}
                </pre>
              </div>

              <h4>3. Dining Philosophers Problem</h4>
              <p>Five philosophers sit at a round table with five chopsticks. Each philosopher needs two chopsticks to eat. Challenge is to avoid deadlock and starvation.</p>

              <div className="example-box">
                <h5>Dining Philosophers Scenario</h5>
                <ul>
                  <li>5 philosophers, 5 chopsticks (one between each pair)</li>
                  <li>Philosopher alternates between thinking and eating</li>
                  <li>Needs both left and right chopsticks to eat</li>
                  <li><strong>Deadlock:</strong> All pick up left chopstick simultaneously</li>
                  <li><strong>Solution:</strong> Allow only 4 philosophers at table, or asymmetric solution</li>
                </ul>
              </div>

              <h3>Monitors</h3>
              <p>A monitor is a high-level synchronization construct that provides a convenient and effective mechanism for process synchronization. It's a software module that encapsulates shared data structures, procedures that operate on the data, and synchronization between concurrent procedure invocations.</p>

              <h4>Monitor Structure:</h4>
              <div className="example-box">
                <h5>Monitor Definition</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`monitor MonitorName {
    // Shared variable declarations
    shared_variable declarations;
    
    // Procedures
    procedure P1(...) {
        // Body of P1
    }
    
    procedure P2(...) {
        // Body of P2
    }
    
    // Initialization code
    initialization_code;
}`}
                </pre>
              </div>

              <h4>Condition Variables:</h4>
              <p>Monitors use condition variables for process synchronization within the monitor:</p>
              <ul>
                <li><strong>x.wait():</strong> Process invoking this operation is suspended until another process invokes x.signal()</li>
                <li><strong>x.signal():</strong> Resumes exactly one suspended process. If no process is suspended, signal has no effect</li>
                <li><strong>x.broadcast():</strong> Resumes all suspended processes</li>
              </ul>

              <h4>Monitor Properties:</h4>
              <ul>
                <li><strong>Mutual Exclusion:</strong> Only one process can be active inside monitor at a time</li>
                <li><strong>Automatic Locking:</strong> Entry and exit handled automatically by compiler</li>
                <li><strong>Condition Variables:</strong> For process coordination and waiting</li>
                <li><strong>Encapsulation:</strong> Hide internal data and operations</li>
              </ul>

              <h4>Monitor Advantages:</h4>
              <ul>
                <li><strong>Safety:</strong> Automatic mutual exclusion</li>
                <li><strong>Abstraction:</strong> High-level programming construct</li>
                <li><strong>Modularity:</strong> Encapsulated synchronization logic</li>
                <li><strong>Readability:</strong> Clear structure and semantics</li>
                <li><strong>Less Error-Prone:</strong> Compiler handles synchronization</li>
              </ul>

              <div className="image-container">
                <img src="https://www.scaler.com/topics/images/monitor-in-os-thumbnail.webp" alt="Monitor" />
                <p className="image-caption">Figure 3.5: Monitor Structure</p>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Semaphore</th>
                      <th>Monitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Level</td>
                      <td>Low-level</td>
                      <td>High-level</td>
                    </tr>
                    <tr>
                      <td>Ease of Use</td>
                      <td>Error-prone</td>
                      <td>Easier, safer</td>
                    </tr>
                    <tr>
                      <td>Mutual Exclusion</td>
                      <td>Manual</td>
                      <td>Automatic</td>
                    </tr>
                    <tr>
                      <td>Flexibility</td>
                      <td>More flexible</td>
                      <td>Less flexible</td>
                    </tr>
                    <tr>
                      <td>Language Support</td>
                      <td>Library functions</td>
                      <td>Language construct</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="video-embed">
              <h4>Semaphores in Operating Systems</h4>
              <p>Comprehensive explanation of semaphores, their types, and implementation.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/XDIOC2EY5JE"
                title="Semaphores in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Classic Synchronization Problems</h4>
              <p>Producer-Consumer, Readers-Writers, and Dining Philosophers problems with solutions.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Z68js3PxzW0"
                title="Classic Synchronization Problems"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 3 Quiz" questions={module2Quiz} subject="OS" unitId={3} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← Process Synchronization</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">Deadlock →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">3.4</div>
              <div className="lesson-title-main">
                <h1>Deadlock</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>What is Deadlock?</h3>
              <p>Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process. In this situation, none of the processes can proceed, resulting in a system halt.</p>

              <div className="example-box">
                <h5>Deadlock Example</h5>
                <p>Consider two processes P1 and P2, and two resources R1 and R2:</p>
                <ul>
                  <li>P1 holds R1 and waits for R2</li>
                  <li>P2 holds R2 and waits for R1</li>
                  <li>Result: Both processes wait indefinitely (Deadlock!)</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250116142222043136/d.webp" alt="Deadlock" />
                <p className="image-caption">Figure 3.6: Deadlock Scenario</p>
              </div>

              <h3>System Model</h3>
              <p>A system consists of a finite number of resources to be distributed among competing processes.</p>

              <h4>Resource Types:</h4>
              <ul>
                <li><strong>Reusable Resources:</strong> Can be used by one process at a time and not depleted (CPU, memory, files, I/O devices)</li>
                <li><strong>Consumable Resources:</strong> Created and destroyed (signals, messages, interrupts)</li>
                <li><strong>Single Instance:</strong> Only one copy of resource type</li>
                <li><strong>Multiple Instance:</strong> Several identical copies of resource type</li>
              </ul>

              <h4>Resource Allocation Graph:</h4>
              <ul>
                <li><strong>Nodes:</strong> Processes (circles) and Resources (rectangles)</li>
                <li><strong>Request Edge:</strong> Process → Resource (process requests resource)</li>
                <li><strong>Assignment Edge:</strong> Resource → Process (resource allocated to process)</li>
                <li><strong>Cycle Detection:</strong> Cycle in graph indicates potential deadlock</li>
              </ul>

              <h3>Deadlock Characterization</h3>
              <p>Deadlock can occur if and only if all four of the following conditions hold simultaneously (Coffman Conditions):</p>

              <h4>Necessary Conditions for Deadlock:</h4>
              <ul>
                <li><strong>1. Mutual Exclusion:</strong> At least one resource must be held in a non-sharable mode (only one process can use the resource at a time)</li>
                <li><strong>2. Hold and Wait:</strong> A process must be holding at least one resource and waiting to acquire additional resources held by other processes</li>
                <li><strong>3. No Preemption:</strong> Resources cannot be forcibly removed from processes; they must be released voluntarily</li>
                <li><strong>4. Circular Wait:</strong> A circular chain of processes exists, where each process holds a resource needed by the next process in the chain</li>
              </ul>

              <div className="example-box">
                <h5>Deadlock Cycle Example</h5>
                <p>Resource Allocation Graph showing circular wait:</p>
                <ul>
                  <li>Process P1 holds Resource R1 and waits for Resource R2</li>
                  <li>Process P2 holds Resource R2 and waits for Resource R3</li>
                  <li>Process P3 holds Resource R3 and waits for Resource R1</li>
                  <li><strong>Result:</strong> Circular wait → Deadlock!</li>
                </ul>
              </div>

              <h3>Deadlock Handling Strategies</h3>

              <h4>1. Deadlock Prevention</h4>
              <p>Ensure that at least one of the four necessary conditions cannot hold, thereby preventing deadlock from occurring.</p>

              <h5>Prevention Methods:</h5>
              <ul>
                <li><strong>Eliminate Mutual Exclusion:</strong> Make resources sharable (not always possible)</li>
                <li><strong>Eliminate Hold and Wait:</strong> Require processes to request all resources at once before execution</li>
                <li><strong>Allow Preemption:</strong> If a process requests a resource that cannot be immediately allocated, preempt resources from waiting processes</li>
                <li><strong>Break Circular Wait:</strong> Impose total ordering on resource types; processes must request resources in increasing order</li>
              </ul>

              <div className="example-box">
                <h5>Resource Ordering Example</h5>
                <p>Assign numbers to resources: R1=1, R2=2, R3=3</p>
                <p>Rule: Process must request resources in increasing order</p>
                <ul>
                  <li>Valid: Request R1, then R2, then R3</li>
                  <li>Invalid: Request R2, then R1 (violates ordering)</li>
                  <li>This prevents circular wait condition</li>
                </ul>
              </div>

              <h4>2. Deadlock Avoidance</h4>
              <p>Dynamically examine the resource-allocation state to ensure that a circular-wait condition can never exist. The system decides whether granting a request will leave it in a safe state.</p>

              <h5>Safe State:</h5>
              <p>A state is safe if the system can allocate resources to each process in some order and still avoid deadlock. A safe sequence exists where each process can complete.</p>

              <div className="example-box">
                <h5>Safe State Example</h5>
                <p>System has 12 tape drives:</p>
                <ul>
                  <li>Current allocation: P0=5, P1=2, P2=2 (9 allocated, 3 available)</li>
                  <li>Maximum needs: P0=10, P1=4, P2=9</li>
                  <li>Still needed: P0=5, P1=2, P2=7</li>
                  <li><strong>Safe sequence:</strong> P1 (needs 2, available 3) → P0 (needs 5, available 5) → P2 (needs 7, available 10)</li>
                  <li>System is in safe state!</li>
                </ul>
              </div>

              <h5>Banker's Algorithm:</h5>
              <p>A deadlock avoidance algorithm for multiple instances of resources. Named after banking system where bank never allocates cash in a way that it cannot satisfy all customers.</p>

              <div className="example-box">
                <h5>Banker's Algorithm Steps</h5>
                <ol>
                  <li><strong>Request Validation:</strong> Check if request ≤ available resources</li>
                  <li><strong>State Simulation:</strong> Pretend to allocate resources</li>
                  <li><strong>Safety Check:</strong> Run safety algorithm to check if resulting state is safe</li>
                  <li><strong>Decision:</strong> If safe, grant request; otherwise, make process wait</li>
                </ol>
              </div>

              <h4>3. Deadlock Detection</h4>
              <p>Allow the system to enter a deadlock state, detect it, and then recover from it.</p>

              <h5>Detection Algorithms:</h5>
              <ul>
                <li><strong>Single Resource:</strong> Cycle detection in resource allocation graph</li>
                <li><strong>Multiple Resources:</strong> Reduction algorithm similar to Banker's algorithm</li>
                <li><strong>Wait-for Graph:</strong> Simplified resource graph showing only process dependencies</li>
                <li><strong>Periodic Checking:</strong> Run detection algorithm at regular intervals</li>
              </ul>

              <h4>4. Deadlock Recovery</h4>
              <p>Once deadlock is detected, the system must recover by breaking the deadlock.</p>

              <h5>Recovery Methods:</h5>

              <h6>Process Termination:</h6>
              <ul>
                <li><strong>Abort All:</strong> Terminate all deadlocked processes (expensive)</li>
                <li><strong>Abort One-by-One:</strong> Terminate processes one at a time until deadlock cycle is eliminated</li>
                <li><strong>Selection Criteria:</strong> Priority, computation time, resources held, resources needed</li>
              </ul>

              <h6>Resource Preemption:</h6>
              <ul>
                <li><strong>Victim Selection:</strong> Choose process to preempt resources from</li>
                <li><strong>Rollback:</strong> Return victim process to safe state and restart</li>
                <li><strong>Starvation Prevention:</strong> Ensure same process isn't always chosen as victim</li>
              </ul>

              <h3>Comparison of Deadlock Handling Strategies</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Strategy</th>
                      <th>Approach</th>
                      <th>Advantages</th>
                      <th>Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Prevention</td>
                      <td>Ensure one condition never holds</td>
                      <td>Simple, no runtime overhead</td>
                      <td>Conservative, low resource utilization</td>
                    </tr>
                    <tr>
                      <td>Avoidance</td>
                      <td>Dynamically avoid unsafe states</td>
                      <td>More flexible than prevention</td>
                      <td>Requires advance knowledge, overhead</td>
                    </tr>
                    <tr>
                      <td>Detection</td>
                      <td>Allow deadlock, then detect</td>
                      <td>Higher resource utilization</td>
                      <td>Periodic overhead, loss of work</td>
                    </tr>
                    <tr>
                      <td>Ignore</td>
                      <td>Assume deadlock never occurs</td>
                      <td>No prevention overhead</td>
                      <td>System may freeze permanently</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="example-box">
                <h5>Real-World Approach</h5>
                <p>Most operating systems (Windows, Linux, Unix) use the <strong>Ostrich Algorithm</strong> - they ignore the deadlock problem!</p>
                <p><strong>Reasoning:</strong></p>
                <ul>
                  <li>Deadlocks are rare in practice</li>
                  <li>Prevention/avoidance overhead is high</li>
                  <li>Cost of occasional deadlock &lt; cost of prevention</li>
                  <li>Users can manually restart system if needed</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Deadlock in Operating Systems</h4>
              <p>Comprehensive explanation of deadlock, its conditions, and handling strategies.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/UVo9mGARkhQ"
                title="Deadlock in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Banker's Algorithm</h4>
              <p>Detailed explanation of Banker's algorithm for deadlock avoidance with examples.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/7gMLNiEz3nw"
                title="Banker's Algorithm"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 4 Quiz" questions={module3Quiz} subject="OS" unitId={3} moduleId={4} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← Semaphores & Monitors</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Unit 3 Comprehensive Quiz →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <h2>Unit 3 Comprehensive Quiz</h2>
            
            <section className="content-section">
              <p>Test your understanding of all concepts covered in Unit 3: Concurrency and Deadlock.</p>
              <p>This quiz covers:</p>
              <ul>
                <li>Concurrency Principles and Problems</li>
                <li>Process Synchronization (Hardware, Peterson's Solution, Mutex)</li>
                <li>Semaphores, Monitors, and Classic Synchronization Problems</li>
                <li>Deadlock (Characterization, Prevention, Avoidance, Detection, Recovery)</li>
              </ul>
            </section>

            <Quiz title="Unit 3 Comprehensive Quiz" questions={unit3Quiz} subject="OS" unitId={3} moduleId={5} />

            <div className="reference-section">
              <h3>Reference Materials</h3>
              <ul>
                <li><a href="https://www.geeksforgeeks.org/introduction-of-process-synchronization/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Process Synchronization</a></li>
                <li><a href="https://www.tutorialspoint.com/operating_system/os_process_synchronization.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint - Process Synchronization</a></li>
                <li><a href="https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Deadlock</a></li>
                <li><a href="https://www.javatpoint.com/os-deadlock-introduction" target="_blank" rel="noopener noreferrer">JavaTpoint - Deadlock</a></li>
                <li><a href="https://nptel.ac.in/courses/106/106/106106144/" target="_blank" rel="noopener noreferrer">NPTEL - Operating Systems</a></li>
              </ul>
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Deadlock</button>
            </div>
          </div>
        );

      default:
        return <div>Module content loading...</div>;
    }
  };

  return <div className="unit-container">{renderModule()}</div>;
};

export default Unit3;

