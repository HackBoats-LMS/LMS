'use client';
import React from 'react';
import Quiz from '../components/Quiz';

interface Unit1Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit1: React.FC<Unit1Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const module1Quiz = [
    {
      question: "What is an Operating System?",
      options: ["A hardware component", "System software that manages hardware and software resources", "An application software", "A programming language"],
      correctAnswer: 1,
      explanation: "An Operating System is system software that acts as an intermediary between users and computer hardware, managing all hardware and software resources."
    },
    {
      question: "Which of the following is NOT a function of an Operating System?",
      options: ["Process Management", "Memory Management", "Compiling Programs", "File Management"],
      correctAnswer: 2,
      explanation: "Compiling programs is the job of a compiler, not the operating system. OS manages processes, memory, and files."
    },
    {
      question: "What does multiprogramming mean?",
      options: ["Running multiple programs simultaneously", "Writing multiple programs", "Multiple users using one program", "Multiple processors in a system"],
      correctAnswer: 0,
      explanation: "Multiprogramming allows multiple programs to reside in memory simultaneously, with the CPU switching between them to maximize utilization."
    }
  ];

  const module2Quiz = [
    {
      question: "Which OS type allows multiple users to use the system simultaneously?",
      options: ["Batch OS", "Time-sharing OS", "Real-time OS", "Distributed OS"],
      correctAnswer: 1,
      explanation: "Time-sharing OS allows multiple users to use the computer system simultaneously by rapidly switching between users."
    },
    {
      question: "What is a Real-Time Operating System (RTOS)?",
      options: ["OS that processes data in real-time with strict time constraints", "OS that runs in real mode", "OS without virtual memory", "OS for gaming"],
      correctAnswer: 0,
      explanation: "RTOS is designed to process data as it comes in, typically without buffer delays, with strict timing constraints."
    },
    {
      question: "Which generation of OS introduced time-sharing?",
      options: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation"],
      correctAnswer: 2,
      explanation: "Third generation (1965-1980) introduced time-sharing systems, multiprogramming, and interactive computing."
    }
  ];

  const module3Quiz = [
    {
      question: "What is a system call?",
      options: ["A call to system administrator", "Programming interface to OS services", "Hardware interrupt", "Network call"],
      correctAnswer: 1,
      explanation: "System calls provide a programming interface to the services provided by the operating system."
    },
    {
      question: "Which mode has unrestricted access to hardware?",
      options: ["User mode", "Kernel mode", "Protected mode", "Safe mode"],
      correctAnswer: 1,
      explanation: "Kernel mode (also called supervisor mode) has unrestricted access to all hardware and can execute any CPU instruction."
    },
    {
      question: "What is the purpose of dual-mode operation?",
      options: ["Run two OS simultaneously", "Protect OS from user programs", "Increase speed", "Save power"],
      correctAnswer: 1,
      explanation: "Dual-mode operation (user mode and kernel mode) protects the operating system and critical system resources from errant user programs."
    }
  ];

  const module4Quiz = [
    {
      question: "Which system call is used to create a new process?",
      options: ["create()", "fork()", "exec()", "spawn()"],
      correctAnswer: 1,
      explanation: "fork() system call is used in Unix/Linux to create a new process by duplicating the calling process."
    },
    {
      question: "What is a monolithic kernel?",
      options: ["Small kernel with minimal services", "Entire OS runs in kernel space", "Kernel with modules", "Distributed kernel"],
      correctAnswer: 1,
      explanation: "In a monolithic kernel, the entire operating system runs in kernel space with all services in a single address space."
    },
    {
      question: "Which OS structure provides better security?",
      options: ["Monolithic", "Microkernel", "Layered", "All are equal"],
      correctAnswer: 1,
      explanation: "Microkernel provides better security as most services run in user space, reducing the attack surface of the kernel."
    }
  ];

  const unit1Quiz = [
    {
      question: "What are the main goals of an Operating System?",
      options: ["Convenience only", "Efficiency only", "Both convenience and efficiency", "Neither convenience nor efficiency"],
      correctAnswer: 2,
      explanation: "The main goals of an OS are to provide convenience to users and ensure efficient utilization of computer resources."
    },
    {
      question: "Which component is responsible for selecting which process runs next?",
      options: ["Dispatcher", "Scheduler", "Loader", "Linker"],
      correctAnswer: 1,
      explanation: "The scheduler is responsible for selecting which process should run next based on scheduling algorithms."
    },
    {
      question: "What is bootstrapping?",
      options: ["Starting a computer", "Loading OS into memory during startup", "Shutting down computer", "Installing OS"],
      correctAnswer: 1,
      explanation: "Bootstrapping is the process of loading the operating system into main memory when the computer is started."
    },
    {
      question: "Which of the following is an example of a batch operating system?",
      options: ["Windows 10", "Unix", "IBM's OS/360", "Android"],
      correctAnswer: 2,
      explanation: "IBM's OS/360 was a classic example of a batch operating system where jobs were collected and processed in batches."
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Automated Programming Interface"],
      correctAnswer: 0,
      explanation: "API stands for Application Programming Interface, which specifies how software components should interact."
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
                <h1>Overview of Operating Systems</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Understanding Operating Systems: The System Software Foundation</h3>
              <p>An Operating System (OS) serves as the fundamental layer of system software that manages computer hardware resources and provides essential services for application programs. It acts as an intermediary between users and the computer hardware, abstracting complex hardware details while ensuring efficient resource utilization.</p>
              
              <p>Modern computing systems rely heavily on sophisticated operating systems to coordinate multiple processes, manage memory hierarchies, handle I/O operations, and maintain system security. From smartphones to supercomputers, operating systems form the backbone of digital infrastructure.</p>
              
              <h4>Core Operating System Architecture</h4>
              <p>The OS operates as a resource manager and control program, providing two primary functions:</p>
              <ul>
                <li><strong>Resource Management:</strong> Efficient allocation and coordination of CPU time, memory space, storage devices, and I/O peripherals</li>
                <li><strong>Control Program:</strong> Supervision of program execution to prevent errors and improper use of computer resources</li>
              </ul>
              
              <div className="image-container">
                <img src="https://quizmanthon.com/images/examples-of-os.JPG" alt="Operating System Structure" />
                <p className="image-caption">Figure 1.1: Operating System as an intermediary between users and hardware</p>
              </div>

              <h4>Essential Operating System Functions</h4>
              <ul>
                <li><strong>Process Management:</strong> Creating, scheduling, synchronizing, and terminating processes and threads</li>
                <li><strong>Memory Management:</strong> Allocating and deallocating memory space, implementing virtual memory systems</li>
                <li><strong>File System Management:</strong> Organizing, storing, retrieving, and protecting files and directories</li>
                <li><strong>I/O System Management:</strong> Coordinating input/output operations and device driver interactions</li>
                <li><strong>Secondary Storage Management:</strong> Managing disk space allocation, disk scheduling, and storage optimization</li>
                <li><strong>Network Management:</strong> Handling network protocols, connections, and distributed system coordination</li>
                <li><strong>Protection and Security:</strong> Implementing access control, authentication, and system integrity mechanisms</li>
                <li><strong>User Interface Management:</strong> Providing command-line and graphical interfaces for user interaction</li>
              </ul>

              <h4>Operating System Design Objectives</h4>
              <ol>
                <li><strong>Convenience:</strong> Simplify computer system usage through abstraction and user-friendly interfaces</li>
                <li><strong>Efficiency:</strong> Optimize hardware resource utilization and system performance</li>
                <li><strong>Reliability:</strong> Ensure system stability, fault tolerance, and error recovery</li>
                <li><strong>Scalability:</strong> Support varying workloads and system configurations</li>
                <li><strong>Security:</strong> Protect system resources and user data from unauthorized access</li>
                <li><strong>Portability:</strong> Enable system adaptation across different hardware platforms</li>
              </ol>

              <div className="image-container">
                <img src="https://www.tutorialspoint.com/operating_system/images/conceptual_view.jpg" alt="OS Functions" />
                <p className="image-caption">Figure 1.2: Major functions of an Operating System</p>
              </div>

              <h4>Computer System Architecture and Components</h4>
              <p>A modern computer system exhibits a layered architecture with distinct components:</p>
              <ul>
                <li><strong>Hardware Layer:</strong> CPU, memory hierarchy (cache, RAM, storage), I/O devices, and system buses</li>
                <li><strong>Operating System Layer:</strong> Kernel, device drivers, system services, and resource managers</li>
                <li><strong>Application Software Layer:</strong> Compilers, databases, games, business applications</li>
                <li><strong>User Interface Layer:</strong> Command interpreters, graphical interfaces, and user applications</li>
              </ul>

              <h4>Operating System Interface Mechanisms</h4>
              <ul>
                <li><strong>Command-Line Interface (CLI):</strong> Text-based interaction using shell commands (Bash, PowerShell, Command Prompt)</li>
                <li><strong>Graphical User Interface (GUI):</strong> Visual interface with windows, icons, menus, and pointers (Windows Explorer, macOS Finder)</li>
                <li><strong>System Call Interface:</strong> Programmatic interface enabling applications to request OS services</li>
                <li><strong>Application Programming Interface (API):</strong> Standardized function libraries for software development (Win32, POSIX, Java API)</li>
                <li><strong>Web-based Interface:</strong> Browser-based system administration and cloud service management</li>
              </ul>
              
              <h4>Operating System Performance Metrics</h4>
              <p>Key performance indicators for evaluating OS effectiveness:</p>
              <ul>
                <li><strong>Throughput:</strong> Number of processes completed per unit time</li>
                <li><strong>Response Time:</strong> Time from request submission to first response</li>
                <li><strong>Turnaround Time:</strong> Total time from process submission to completion</li>
                <li><strong>Resource Utilization:</strong> Percentage of time resources are actively used</li>
                <li><strong>Fairness:</strong> Equitable resource allocation among competing processes</li>
                <li><strong>Scalability:</strong> Performance maintenance under increasing system load</li>
              </ul>
            </section>

            <div style={{margin: '24px 0'}}>
              <iframe
                src="https://www.youtube.com/embed/vBURTt97EkA"
                title="Introduction to Operating Systems"
                frameBorder="0"
                allowFullScreen
                style={{width: '50%', height: '300px'}}>
              </iframe>
              <p style={{marginTop: '12px', fontSize: '14px', color: '#666'}}>Comprehensive introduction to operating systems fundamentals</p>
            </div>

            <div style={{margin: '24px 0'}}>
              <iframe
                src="https://www.youtube.com/embed/26QPDBe-NB8"
                title="Operating System Basics"
                frameBorder="0"
                allowFullScreen
                style={{width: '50%', height: '300px'}}>
              </iframe>
              <p style={{marginTop: '12px', fontSize: '14px', color: '#666'}}>Operating system concepts including process and memory management</p>
            </div>

            <Quiz title="Module 1 Quiz" questions={module1Quiz} subject="OS" unitId={1} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">OS Types and Generation →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.2</div>
              <div className="lesson-title-main">
                <h1>OS Types and Generation</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Types of Operating Systems</h3>
              
              <h4>1. Batch Operating System</h4>
              <p>In batch operating systems, similar jobs are batched together and executed as a group. Users do not interact directly with the computer.</p>
              <ul>
                <li>Jobs are collected and processed in batches</li>
                <li>No direct interaction between user and computer</li>
                <li>Examples: IBM's OS/360, Payroll systems</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/BatchOS.jpeg" alt="Batch OS" />
                <p className="image-caption">Figure 1.3: Batch Operating System workflow</p>
              </div>

              <h4>2. Time-Sharing Operating System</h4>
              <p>Time-sharing OS allows multiple users to use the computer simultaneously by rapidly switching between them.</p>
              <ul>
                <li>Multiple users can access system simultaneously</li>
                <li>CPU time is divided among users</li>
                <li>Response time is minimized</li>
                <li>Examples: Multics, Unix, Linux</li>
              </ul>

              <h4>3. Distributed Operating System</h4>
              <p>Uses multiple central processors to serve multiple real-time applications and users.</p>
              <ul>
                <li>Multiple autonomous computers connected via network</li>
                <li>Resources are shared across the network</li>
                <li>Examples: LOCUS, MICROS</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240429162227/Distributed-Operating-System_1.webp" alt="Distributed OS" />
                <p className="image-caption">Figure 1.4: Distributed Operating System architecture</p>
              </div>

              <h4>4. Real-Time Operating System (RTOS)</h4>
              <p>RTOS processes data as it comes in, typically without buffer delays.</p>
              <ul>
                <li><strong>Hard Real-Time:</strong> Strict time constraints (e.g., airbag systems)</li>
                <li><strong>Soft Real-Time:</strong> Less strict timing (e.g., multimedia systems)</li>
                <li>Examples: VxWorks, RTLinux, QNX</li>
              </ul>

              <h4>5. Network Operating System</h4>
              <p>Runs on a server and provides capability to manage data, users, groups, security, applications.</p>
              <ul>
                <li>Provides networking capabilities</li>
                <li>Examples: Windows Server, Linux Server</li>
              </ul>

              <h4>6. Mobile Operating System</h4>
              <p>Designed for mobile devices like smartphones and tablets.</p>
              <ul>
                <li>Optimized for touch interfaces</li>
                <li>Power management is crucial</li>
                <li>Examples: Android, iOS, Windows Mobile</li>
              </ul>

              <h4>7. Embedded Operating System</h4>
              <p>Designed for embedded systems with dedicated functionality.</p>
              <ul>
                <li>Runs on devices with limited resources</li>
                <li>Examples: Automotive systems, IoT devices, smart appliances</li>
                <li>Common OS: Embedded Linux, FreeRTOS, ThreadX</li>
              </ul>

              <h4>Comparison of OS Types:</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>OS Type</th>
                      <th>Users</th>
                      <th>Response Time</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Batch</td>
                      <td>Multiple</td>
                      <td>Hours/Days</td>
                      <td>Payroll systems</td>
                    </tr>
                    <tr>
                      <td>Time-Sharing</td>
                      <td>Multiple</td>
                      <td>Seconds</td>
                      <td>Unix, Linux</td>
                    </tr>
                    <tr>
                      <td>Real-Time</td>
                      <td>Single/Multiple</td>
                      <td>Milliseconds</td>
                      <td>Airbag systems</td>
                    </tr>
                    <tr>
                      <td>Distributed</td>
                      <td>Multiple</td>
                      <td>Varies</td>
                      <td>Cloud systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Evolution of Operating Systems (Generations)</h3>

              <h4>First Generation (1945-1955): Vacuum Tubes</h4>
              <ul>
                <li>No operating system</li>
                <li>Programming in machine language</li>
                <li>Direct interaction with hardware</li>
              </ul>

              <h4>Second Generation (1955-1965): Transistors and Batch Systems</h4>
              <ul>
                <li>Introduction of batch processing</li>
                <li>Jobs submitted on punch cards</li>
                <li>Examples: FMS, IBSYS</li>
              </ul>

              <h4>Third Generation (1965-1980): ICs and Multiprogramming</h4>
              <ul>
                <li>Multiprogramming introduced</li>
                <li>Time-sharing systems developed</li>
                <li>Examples: OS/360, Multics, Unix</li>
              </ul>

              <div className="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*PO6hQT4gRDWH221leDkd9g.png" alt="OS Generations" />
                <p className="image-caption">Figure 1.5: Evolution of Operating Systems through generations</p>
              </div>

              <h4>Fourth Generation (1980-Present): Personal Computers</h4>
              <ul>
                <li>GUI-based operating systems</li>
                <li>Network and distributed systems</li>
                <li>Examples: Windows, macOS, Linux, Android</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Types of Operating Systems</h4>
              <p>Detailed explanation of different types of operating systems including batch, time-sharing, distributed, and real-time systems.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/RozoeWzT7IM"
                title="Types of Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Evolution of Operating Systems</h4>
              <p>Learn about the historical development of operating systems from first generation to modern systems.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1lG7lFLXBIs"
                title="Evolution of Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 2 Quiz" questions={module2Quiz} subject="OS" unitId={1} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← Overview of Operating Systems</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">OS Operations & Security →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.3</div>
              <div className="lesson-title-main">
                <h1>OS Operations & Security</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Operating System Operations</h3>
              
              <h4>Dual-Mode Operation</h4>
              <p>Modern operating systems operate in two modes to protect the system from errant programs:</p>
              
              <ul>
                <li><strong>User Mode:</strong> Execution mode for user applications with restricted access</li>
                <li><strong>Kernel Mode (Supervisor Mode):</strong> Execution mode for OS with unrestricted access to hardware</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/dual_mode.jpeg" alt="Dual Mode" />
                <p className="image-caption">Figure 1.6: Dual-mode operation in Operating Systems</p>
              </div>

              <p>A mode bit is added to hardware to indicate current mode:</p>
              <ul>
                <li>Mode bit = 0: Kernel mode</li>
                <li>Mode bit = 1: User mode</li>
              </ul>

              <h4>System Boot Process</h4>
              <p>The process of starting a computer and loading the operating system:</p>
              <ol>
                <li><strong>Power On:</strong> Computer is powered on</li>
                <li><strong>BIOS/UEFI:</strong> Basic Input/Output System initializes hardware</li>
                <li><strong>Bootstrap Loader:</strong> Small program in ROM loads OS</li>
                <li><strong>OS Kernel:</strong> Kernel is loaded into memory</li>
                <li><strong>System Initialization:</strong> System services and drivers are started</li>
                <li><strong>User Login:</strong> System ready for user interaction</li>
              </ol>

              <h4>Interrupts</h4>
              <p>Interrupts are signals that cause the CPU to stop current execution and handle the interrupt:</p>
              <ul>
                <li><strong>Hardware Interrupts:</strong> Generated by hardware devices (I/O completion)</li>
                <li><strong>Software Interrupts (Traps):</strong> Generated by software (system calls, errors)</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240801184747/Flowchart.png" alt="Interrupts" />
                <p className="image-caption">Figure 1.7: Interrupt handling mechanism</p>
              </div>

              <h4>Timer</h4>
              <p>A timer prevents infinite loops and ensures CPU time sharing:</p>
              <ul>
                <li>Set to interrupt computer after specific period</li>
                <li>Prevents user programs from monopolizing CPU</li>
                <li>Used in time-sharing systems</li>
              </ul>

              <h3>Protection and Security</h3>

              <h4>Protection</h4>
              <p>Protection is a mechanism for controlling access of processes or users to resources:</p>
              <ul>
                <li><strong>Memory Protection:</strong> Prevents processes from accessing unauthorized memory</li>
                <li><strong>CPU Protection:</strong> Timer prevents infinite loops</li>
                <li><strong>I/O Protection:</strong> All I/O instructions are privileged</li>
              </ul>

              <h4>Protection Concepts:</h4>
              <ul>
                <li><strong>Domain of Protection:</strong> Set of access rights (read, write, execute) for each process</li>
                <li><strong>Access Matrix:</strong> Defines which subjects can access which objects and how</li>
                <li><strong>Access Control:</strong> Mechanisms to enforce protection policies (ACLs, capabilities)</li>
                <li><strong>Revocation:</strong> Ability to remove access rights when no longer needed</li>
              </ul>

              <div className="example-box">
                <h5>Example: Memory Protection</h5>
                <p>When Process A tries to access memory belonging to Process B, the OS uses base and limit registers to detect the violation and terminates Process A with a segmentation fault error.</p>
              </div>

              <h4>Security</h4>
              <p>Security defends the system against internal and external attacks:</p>
              <ul>
                <li><strong>Authentication:</strong> User identity verification (passwords, biometrics)</li>
                <li><strong>Authorization:</strong> Determining access rights</li>
                <li><strong>Encryption:</strong> Protecting data confidentiality</li>
                <li><strong>Firewall:</strong> Network security</li>
              </ul>

              <div className="image-container">
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0Wyd37CcRIetfGsUoe_UsbmpOlhj7aDGqdBghxo3QAZACmpMO" alt="OS Security" />
                <p className="image-caption">Figure 1.8: Security layers in Operating Systems</p>
              </div>

              <h4>Security Threats</h4>
              <ul>
                <li><strong>Malware:</strong> Viruses, worms, trojans, ransomware</li>
                <li><strong>Denial of Service (DoS):</strong> Overwhelming system resources</li>
                <li><strong>Unauthorized Access:</strong> Breaking into systems</li>
                <li><strong>Data Breach:</strong> Stealing sensitive information</li>
              </ul>

              <h4>Security Measures</h4>
              <ul>
                <li>Strong authentication mechanisms</li>
                <li>Access control lists (ACLs)</li>
                <li>Encryption of sensitive data</li>
                <li>Regular security updates and patches</li>
                <li>Intrusion detection systems</li>
                <li>Audit logs and monitoring</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Operating System Operations and Dual Mode</h4>
              <p>Understanding how operating systems operate in dual mode and handle interrupts for system protection.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/bS3QuOQgUu8"
                title="Operating System Operations and Dual Mode"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>OS Security and Protection</h4>
              <p>Learn about security mechanisms in operating systems including authentication, authorization, and protection techniques.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DKb7KhfoZmU"
                title="OS Security and Protection"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 3 Quiz" questions={module3Quiz} subject="OS" unitId={1} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← OS Types and Generation</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">System Calls & Structures →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">1.4</div>
              <div className="lesson-title-main">
                <h1>System Calls & Structures</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Operating System Services</h3>
              <p>Operating systems provide various services to users and programs:</p>

              <h4>Services for User Convenience:</h4>
              <ul>
                <li><strong>User Interface:</strong> CLI, GUI, Batch interface</li>
                <li><strong>Program Execution:</strong> Load, run, and terminate programs</li>
                <li><strong>I/O Operations:</strong> Handle input/output operations</li>
                <li><strong>File System Manipulation:</strong> Create, delete, read, write files</li>
                <li><strong>Communications:</strong> Inter-process communication</li>
                <li><strong>Error Detection:</strong> Detect and handle errors</li>
              </ul>

              <h4>Services for System Efficiency:</h4>
              <ul>
                <li><strong>Resource Allocation:</strong> Allocate resources to multiple users/processes</li>
                <li><strong>Accounting:</strong> Track resource usage</li>
                <li><strong>Protection and Security:</strong> Control access to resources</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724173344103611/OPERATING-SYSTEM-SERVICES.webp" alt="OS Services" />
                <p className="image-caption">Figure 1.9: Operating System Services</p>
              </div>

              <h3>System Calls</h3>
              <p>System calls provide an interface between a process and the operating system. They are the only way for user programs to interact with the kernel.</p>

              <h4>Types of System Calls:</h4>

              <h5>1. Process Control</h5>
              <ul>
                <li>create process (fork())</li>
                <li>terminate process (exit())</li>
                <li>load, execute</li>
                <li>get/set process attributes</li>
                <li>wait for time, wait event, signal event</li>
                <li>allocate and free memory</li>
              </ul>

              <h5>2. File Management</h5>
              <ul>
                <li>create file, delete file</li>
                <li>open, close</li>
                <li>read, write, reposition</li>
                <li>get/set file attributes</li>
              </ul>

              <h5>3. Device Management</h5>
              <ul>
                <li>request device, release device</li>
                <li>read, write, reposition</li>
                <li>get/set device attributes</li>
                <li>logically attach or detach devices</li>
              </ul>

              <h5>4. Information Maintenance</h5>
              <ul>
                <li>get/set time or date</li>
                <li>get/set system data</li>
                <li>get/set process, file, or device attributes</li>
              </ul>

              <h5>5. Communications</h5>
              <ul>
                <li>create, delete communication connection</li>
                <li>send, receive messages</li>
                <li>transfer status information</li>
                <li>attach or detach remote devices</li>
              </ul>

              <div className="image-container">
                <img src="https://i.sstatic.net/tLg6b.png" alt="System Calls" />
                <p className="image-caption">Figure 1.10: System call interface</p>
              </div>

              <h4>System Call Implementation</h4>
              <p>System calls are typically accessed through an Application Programming Interface (API):</p>
              <ul>
                <li><strong>Win32 API:</strong> For Windows systems</li>
                <li><strong>POSIX API:</strong> For UNIX, Linux, Mac OS X</li>
                <li><strong>Java API:</strong> For Java Virtual Machine</li>
              </ul>

              <div className="example-box">
                <h5>Example: System Call Execution</h5>
                <p>When a program calls printf("Hello"), it:</p>
                <ol>
                  <li>Invokes the write() system call through C library</li>
                  <li>Switches from user mode to kernel mode</li>
                  <li>OS kernel handles the I/O operation</li>
                  <li>Returns control to user mode</li>
                </ol>
              </div>

              <h4>Parameter Passing in System Calls:</h4>
              <ul>
                <li><strong>Registers:</strong> Parameters passed in CPU registers (fastest, limited number)</li>
                <li><strong>Block/Table:</strong> Parameters stored in memory block, address passed in register</li>
                <li><strong>Stack:</strong> Parameters pushed onto stack by program, popped by OS</li>
              </ul>

              <h3>Operating System Structures</h3>

              <h4>1. Simple Structure (MS-DOS)</h4>
              <p>No well-defined structure, written to provide maximum functionality in minimal space.</p>
              <ul>
                <li>Not divided into modules</li>
                <li>Interfaces and levels of functionality not well separated</li>
                <li>Application programs can access hardware directly</li>
              </ul>

              <h4>2. Layered Approach</h4>
              <p>OS is divided into layers, each built on top of lower layers.</p>
              <ul>
                <li>Layer 0: Hardware</li>
                <li>Layer N: User interface</li>
                <li>Each layer uses functions of lower layers only</li>
                <li>Easier to debug and verify</li>
              </ul>

              <div className="image-container">
                <img src="https://scaler.com/topics/images/layered-structure-of-operating-systems.webp" alt="Layered Structure" />
                <p className="image-caption">Figure 1.11: Layered Operating System structure</p>
              </div>

              <h4>3. Monolithic Structure</h4>
              <p>Entire OS runs in kernel space as a single program.</p>
              <ul>
                <li>All services in kernel space</li>
                <li>Fast performance (no message passing overhead)</li>
                <li>Difficult to maintain and extend</li>
                <li>Examples: Traditional Unix, Linux</li>
              </ul>

              <h4>4. Microkernel Structure</h4>
              <p>Minimal kernel with most services in user space.</p>
              <ul>
                <li>Only essential services in kernel (IPC, memory management, CPU scheduling)</li>
                <li>Other services in user space</li>
                <li>More reliable and secure</li>
                <li>Easier to extend and maintain</li>
                <li>Examples: Mach, QNX, Minix</li>
              </ul>

              <div className="image-container">
                <img src="https://miro.medium.com/1*BVEda1HSw30KiIT7TxnT8A.png" alt="Microkernel" />
                <p className="image-caption">Figure 1.12: Microkernel architecture</p>
              </div>

              <h4>5. Modular Structure</h4>
              <p>Uses loadable kernel modules (LKMs).</p>
              <ul>
                <li>Core kernel with dynamically loadable modules</li>
                <li>Modules can be loaded/unloaded at runtime</li>
                <li>Combines benefits of layered and microkernel</li>
                <li>Examples: Modern Linux, Solaris</li>
              </ul>

              <h4>6. Hybrid Structure</h4>
              <p>Combines multiple approaches.</p>
              <ul>
                <li>Microkernel + monolithic features</li>
                <li>Examples: Windows NT, macOS</li>
              </ul>

              <h4>7. Exokernel Structure</h4>
              <p>Provides minimal abstraction, allowing applications direct hardware access.</p>
              <ul>
                <li>Extremely minimal kernel</li>
                <li>Applications manage resources directly</li>
                <li>Maximum flexibility and performance</li>
                <li>Increased application complexity</li>
              </ul>

              <h4>Comparison of OS Structures:</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Structure</th>
                      <th>Advantages</th>
                      <th>Disadvantages</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monolithic</td>
                      <td>Fast, efficient</td>
                      <td>Hard to maintain</td>
                      <td>Traditional Unix</td>
                    </tr>
                    <tr>
                      <td>Layered</td>
                      <td>Easy to debug</td>
                      <td>Performance overhead</td>
                      <td>THE OS</td>
                    </tr>
                    <tr>
                      <td>Microkernel</td>
                      <td>Reliable, secure</td>
                      <td>Message passing overhead</td>
                      <td>Minix, QNX</td>
                    </tr>
                    <tr>
                      <td>Modular</td>
                      <td>Flexible, maintainable</td>
                      <td>Module coordination</td>
                      <td>Modern Linux</td>
                    </tr>
                    <tr>
                      <td>Hybrid</td>
                      <td>Balanced approach</td>
                      <td>Complex design</td>
                      <td>Windows, macOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="example-box">
                <h5>Example: Linux Modular Structure</h5>
                <p>Linux uses a modular approach where device drivers can be loaded dynamically:</p>
                <ul>
                  <li>Load USB driver: <code>modprobe usb_storage</code></li>
                  <li>List loaded modules: <code>lsmod</code></li>
                  <li>Remove module: <code>rmmod usb_storage</code></li>
                </ul>
                <p>This allows adding hardware support without rebooting the system.</p>
              </div>
            </section>

            <div className="video-embed">
              <h4>System Calls in Operating Systems</h4>
              <p>Comprehensive explanation of system calls, their types, and how they provide interface between user programs and OS kernel.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lhToWeuWWfw"
                title="System Calls in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Operating System Structures</h4>
              <p>Learn about different OS structures including monolithic, layered, microkernel, and modular approaches.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/XXPBl20J22w"
                title="Operating System Structures"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 4 Quiz" questions={module4Quiz} subject="OS" unitId={1} moduleId={4} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← OS Operations & Security</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Unit 1 Comprehensive Quiz →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <h2>Unit 1 Comprehensive Quiz</h2>
            
            <section className="content-section">
              <p>Test your understanding of all concepts covered in Unit 1: Computer System and Operating System Overview.</p>
              <p>This quiz covers:</p>
              <ul>
                <li>Overview of Operating Systems</li>
                <li>OS Types and Generation</li>
                <li>OS Operations & Security</li>
                <li>System Calls & Structures</li>
              </ul>
            </section>

            <Quiz title="Unit 1 Comprehensive Quiz" questions={unit1Quiz} subject="OS" unitId={1} moduleId={5} />

            <div className="reference-section">
              <h3>Reference Materials</h3>
              <ul>
                <li><a href="https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Introduction to Operating Systems</a></li>
                <li><a href="https://www.tutorialspoint.com/operating_system/index.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint - Operating System Tutorial</a></li>
                <li><a href="https://nptel.ac.in/courses/106/106/106106144/" target="_blank" rel="noopener noreferrer">NPTEL - Operating Systems</a></li>
                <li><a href="http://peterindia.net/OperatingSystems.html" target="_blank" rel="noopener noreferrer">Peter India - Operating Systems</a></li>
                <li><a href="https://www.javatpoint.com/os-tutorial" target="_blank" rel="noopener noreferrer">JavaTpoint - OS Tutorial</a></li>
              </ul>
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← System Calls & Structures</button>
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
