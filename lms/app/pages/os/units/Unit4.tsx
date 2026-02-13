'use client';
import React from 'react';
import Quiz from '../components/Quiz';

interface Unit4Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit4: React.FC<Unit4Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const module1Quiz = [
    {
      question: "What is swapping in memory management?",
      options: ["Moving processes between CPU and memory", "Moving processes between main memory and secondary storage", "Exchanging data between processes", "Swapping data between cache and memory"],
      correctAnswer: 1,
      explanation: "Swapping is the process of moving entire processes between main memory (RAM) and secondary storage (disk) to optimize memory utilization."
    },
    {
      question: "What is internal fragmentation?",
      options: ["Memory wasted inside allocated partitions", "Memory wasted between allocated partitions", "Memory lost due to hardware failure", "Memory used by the operating system"],
      correctAnswer: 0,
      explanation: "Internal fragmentation occurs when allocated memory blocks are larger than the requested memory, leaving unused space within the partition."
    },
    {
      question: "What is the difference between MFT and MVT?",
      options: ["MFT uses fixed-size partitions, MVT uses variable-size partitions", "There is no difference", "MFT is faster", "MVT uses more memory"],
      correctAnswer: 0,
      explanation: "MFT (Multiple Fixed Tasks) uses fixed-size partitions determined at system startup, while MVT (Multiple Variable Tasks) uses variable-size partitions allocated dynamically."
    }
  ];

  const module2Quiz = [
    {
      question: "What is the main advantage of paging?",
      options: ["It eliminates external fragmentation", "It is faster than segmentation", "It provides better protection", "It reduces memory usage"],
      correctAnswer: 0,
      explanation: "Paging eliminates external fragmentation by dividing memory into fixed-size pages and frames, allowing non-contiguous allocation."
    },
    {
      question: "What is segmentation in memory management?",
      options: ["Dividing memory into fixed-size blocks", "Dividing memory into variable-sized chunks that correspond to logical units", "A type of file system", "A scheduling algorithm"],
      correctAnswer: 1,
      explanation: "Segmentation divides memory into variable-sized segments that correspond to logical units like code, data, and stack."
    },
    {
      question: "What is external fragmentation?",
      options: ["Memory wasted inside allocated partitions", "Memory wasted between allocated partitions that prevents allocation of larger blocks", "Memory used by external devices", "Memory allocated to external processes"],
      correctAnswer: 1,
      explanation: "External fragmentation occurs when free memory is broken into small blocks scattered throughout memory, preventing allocation of larger contiguous blocks."
    }
  ];

  const module3Quiz = [
    {
      question: "What is virtual memory?",
      options: ["Memory that doesn't physically exist", "A technique that allows execution of processes not entirely in memory", "A type of cache memory", "Memory used for virtual machines"],
      correctAnswer: 1,
      explanation: "Virtual memory is a memory management technique that allows execution of processes that may not be completely in physical memory."
    },
    {
      question: "What is demand paging?",
      options: ["Pages are loaded on demand rather than pre-loading", "Pages are always kept in memory", "A type of scheduling algorithm", "Pages are compressed before loading"],
      correctAnswer: 0,
      explanation: "Demand paging loads pages into memory only when they are needed (demanded), rather than loading the entire process at startup."
    },
    {
      question: "What is a page fault?",
      options: ["A hardware failure in memory", "An access to a page not in memory", "A corrupted page in memory", "A page that is locked"],
      correctAnswer: 1,
      explanation: "A page fault occurs when a program tries to access a page that is not currently in physical memory."
    }
  ];

  const module4Quiz = [
    {
      question: "What is the optimal page replacement algorithm?",
      options: ["Replace the most recently used page", "Replace the page that will not be used for the longest period", "Replace a random page", "Replace the least recently used page"],
      correctAnswer: 1,
      explanation: "The optimal algorithm replaces the page that will not be used for the longest period in the future, providing the best possible performance."
    },
    {
      question: "What is the LRU page replacement algorithm?",
      options: ["Replace the page that was accessed earliest", "Replace the page that has not been used for the longest time", "Replace a random page", "Replace the page that will be used last"],
      correctAnswer: 1,
      explanation: "LRU (Least Recently Used) replaces the page that has not been used for the longest period of time."
    },
    {
      question: "What is thrashing?",
      options: ["When processes run too slowly", "When a process spends more time paging than executing", "When memory is full", "When the CPU overheats"],
      correctAnswer: 1,
      explanation: "Thrashing occurs when the system spends more time swapping pages in and out of memory than executing actual processes."
    }
  ];

  const unit4Quiz = [
    {
      question: "What is the main purpose of memory management?",
      options: ["To store permanent data", "To manage allocation and deallocation of memory to processes", "To encrypt process data", "To compress files on disk"],
      correctAnswer: 1,
      explanation: "Memory management is responsible for allocating and deallocating memory to processes efficiently and safely."
    },
    {
      question: "What causes Belady's Anomaly?",
      options: ["LRU algorithm", "FIFO algorithm", "Optimal algorithm", "Random algorithm"],
      correctAnswer: 1,
      explanation: "Belady's Anomaly occurs with FIFO page replacement where increasing the number of frames can sometimes increase page faults."
    },
    {
      question: "What is the working set model?",
      options: ["A model of CPU scheduling", "A model that keeps track of pages a process needs to avoid thrashing", "A file system model", "A process synchronization model"],
      correctAnswer: 1,
      explanation: "The working set model keeps track of the set of pages that a process is actively using to prevent thrashing."
    },
    {
      question: "Which has better memory utilization?",
      options: ["Fixed partitioning", "Variable partitioning", "Both are equal", "Neither"],
      correctAnswer: 1,
      explanation: "Variable partitioning has better memory utilization as it allocates exactly the required amount, though it suffers from external fragmentation."
    },
    {
      question: "What is the main advantage of demand paging?",
      options: ["Faster process execution", "Reduces I/O and allows more processes in memory", "Provides better security", "Eliminates the need for virtual memory"],
      correctAnswer: 1,
      explanation: "Demand paging reduces I/O by loading only needed pages and allows more processes to be in memory simultaneously."
    }
  ];

  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">4.1</div>
              <div className="lesson-title-main">
                <h1>Swapping & Contiguous Allocation</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Swapping</h3>
              <p>Swapping is a memory management technique that allows the operating system to temporarily move processes from main memory to secondary storage (disk) and vice versa. This enables the system to run more processes than can fit in physical memory simultaneously.</p>

              <h4>Swapping Fundamentals:</h4>
              <p>Swapping involves moving entire processes between main memory (RAM) and a backing store (swap space on disk):</p>
              <ul>
                <li><strong>Swap Out:</strong> Move process from RAM to disk to free memory</li>
                <li><strong>Swap In:</strong> Move process from disk back to RAM for execution</li>
                <li><strong>Backing Store:</strong> Fast disk area with sufficient capacity for all process images</li>
                <li><strong>Swap Space:</strong> Dedicated disk area for swapped processes</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200406111356/Untitled-Diagram66-3.jpg" alt="Swapping" />
                <p className="image-caption">Figure 4.1: Swapping Process</p>
              </div>

              <div className="example-box">
                <h5>Swapping Operation Sequence</h5>
                <ol>
                  <li><strong>Process Selection:</strong> Evaluate priority, memory usage, I/O activity</li>
                  <li><strong>Prepare for Swap-Out:</strong> Save process state (registers, PC), update PCB</li>
                  <li><strong>Write to Backing Store:</strong> Copy entire process image to swap space</li>
                  <li><strong>Free Memory:</strong> Release main memory for other processes</li>
                  <li><strong>Swap-In When Needed:</strong> Locate on disk, allocate memory, copy back</li>
                  <li><strong>Resume Execution:</strong> Update PCB and scheduling queues</li>
                </ol>
              </div>

              <h4>Swapping Triggers:</h4>
              <ul>
                <li><strong>Memory Pressure:</strong> Insufficient free memory for new processes</li>
                <li><strong>Process Priority:</strong> Lower priority processes swapped to favor higher priority</li>
                <li><strong>System Load:</strong> Balance between memory availability and CPU usage</li>
                <li><strong>Process Behavior:</strong> I/O-bound processes may be swapped during I/O operations</li>
              </ul>

              <h4>Advantages & Disadvantages:</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Advantages</th>
                      <th>Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Allows more processes than physical memory</td>
                      <td>Disk I/O is very slow compared to RAM</td>
                    </tr>
                    <tr>
                      <td>Suspended processes don't consume memory</td>
                      <td>Risk of thrashing with excessive swapping</td>
                    </tr>
                    <tr>
                      <td>Dynamic memory management</td>
                      <td>Memory fragmentation issues</td>
                    </tr>
                    <tr>
                      <td>Prevents memory exhaustion</td>
                      <td>Increased context switching overhead</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Contiguous Memory Allocation</h3>
              <p>Contiguous memory allocation schemes divide memory into partitions where each process occupies a single contiguous block of memory. Two main approaches exist: Fixed Partitioning (MFT) and Variable Partitioning (MVT).</p>

              <h4>MFT (Multiple Fixed Tasks) - Fixed Partitioning</h4>
              <p>Memory is divided into fixed-size partitions at system startup. Each partition can hold exactly one process.</p>

              <ul>
                <li><strong>Partition Size:</strong> Fixed at system initialization</li>
                <li><strong>Allocation:</strong> Fit process into appropriately sized partition</li>
                <li><strong>Internal Fragmentation:</strong> Unused space within partition (major issue)</li>
                <li><strong>External Fragmentation:</strong> Not applicable</li>
                <li><strong>Implementation:</strong> Simple and fast</li>
              </ul>

              <div className="example-box">
                <h5>MFT Example</h5>
                <p>Memory: 100KB total divided into partitions:</p>
                <ul>
                  <li>4 partitions of 10KB each</li>
                  <li>3 partitions of 20KB each</li>
                  <li>1 partition of 40KB</li>
                </ul>
                <p><strong>Process Allocation:</strong></p>
                <ul>
                  <li>Process A (15KB) → 20KB partition (5KB internal fragmentation)</li>
                  <li>Process B (8KB) → 10KB partition (2KB internal fragmentation)</li>
                  <li>Process C (35KB) → 40KB partition (5KB internal fragmentation)</li>
                </ul>
                <p><strong>Total Internal Fragmentation:</strong> 12KB wasted</p>
              </div>

              <h4>MVT (Multiple Variable Tasks) - Variable Partitioning</h4>
              <p>Memory is dynamically divided into partitions of variable sizes based on process requirements.</p>

              <ul>
                <li><strong>Partition Size:</strong> Dynamically allocated based on process size</li>
                <li><strong>Allocation:</strong> Allocate exactly required space</li>
                <li><strong>Internal Fragmentation:</strong> None (perfect fit)</li>
                <li><strong>External Fragmentation:</strong> Accumulates over time (major issue)</li>
                <li><strong>Compaction:</strong> Required periodically to consolidate free space</li>
              </ul>

              <div className="example-box">
                <h5>MVT Example</h5>
                <p><strong>Initial State:</strong> [Unused 100KB]</p>
                <p><strong>Step 1:</strong> Process A (20KB) allocated → [A:20KB][Unused:80KB]</p>
                <p><strong>Step 2:</strong> Process B (30KB) allocated → [A:20KB][B:30KB][Unused:50KB]</p>
                <p><strong>Step 3:</strong> Process C (25KB) allocated → [A:20KB][B:30KB][C:25KB][Unused:25KB]</p>
                <p><strong>Step 4:</strong> Process A terminates → [Unused:20KB][B:30KB][C:25KB][Unused:25KB]</p>
                <p><strong>External Fragmentation:</strong> 45KB free but in 2 separate blocks!</p>
                <p>Cannot allocate a 40KB process even though total free space is 45KB</p>
              </div>

              <h4>Allocation Strategies for MVT:</h4>
              <ul>
                <li><strong>First Fit:</strong> Allocate first hole large enough (fast)</li>
                <li><strong>Best Fit:</strong> Allocate smallest hole large enough (minimizes waste)</li>
                <li><strong>Worst Fit:</strong> Allocate largest hole (leaves larger remaining holes)</li>
              </ul>

              <h4>Comparison: MFT vs MVT</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Aspect</th>
                      <th>MFT (Fixed)</th>
                      <th>MVT (Variable)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Partition Size</td>
                      <td>Fixed at startup</td>
                      <td>Dynamic based on process</td>
                    </tr>
                    <tr>
                      <td>Fragmentation</td>
                      <td>Internal fragmentation</td>
                      <td>External fragmentation</td>
                    </tr>
                    <tr>
                      <td>Memory Utilization</td>
                      <td>Lower</td>
                      <td>Higher</td>
                    </tr>
                    <tr>
                      <td>Allocation Speed</td>
                      <td>Faster</td>
                      <td>Slower (search required)</td>
                    </tr>
                    <tr>
                      <td>Compaction</td>
                      <td>Not needed</td>
                      <td>Required periodically</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="video-embed">
              <h4>Swapping in Operating Systems</h4>
              <p>Understanding swapping mechanism and its role in memory management.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Zw0EBivUBgM"
                title="Swapping in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Contiguous Memory Allocation</h4>
              <p>Learn about fixed and variable partitioning schemes in memory management.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DLb9MszatlQ"
                title="Contiguous Memory Allocation"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 1 Quiz" questions={module1Quiz} subject="OS" unitId={4} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">Paging & Segmentation →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">4.2</div>
              <div className="lesson-title-main">
                <h1>Paging & Segmentation</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Non-Contiguous Memory Allocation</h3>
              <p>Non-contiguous memory allocation allows processes to be stored in non-adjacent memory locations, solving the fragmentation problems inherent in contiguous allocation schemes. The two main techniques are Paging and Segmentation.</p>

              <h3>Paging</h3>
              <p>Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. It divides both logical memory (process address space) and physical memory into fixed-size blocks.</p>

              <h4>Paging Concepts:</h4>
              <ul>
                <li><strong>Page:</strong> Fixed-size block of logical memory (typically 4KB)</li>
                <li><strong>Frame:</strong> Fixed-size block of physical memory (same size as page)</li>
                <li><strong>Page Table:</strong> Maps logical page numbers to physical frame numbers</li>
                <li><strong>Page Number (p):</strong> Index into page table</li>
                <li><strong>Page Offset (d):</strong> Offset within the page/frame</li>
              </ul>

              <div className="image-container">
                <img src="https://cdn1.byjus.com/wp-content/uploads/2022/08/paging-in-operating-system-1.png" alt="Paging" />
                <p className="image-caption">Figure 4.2: Paging Mechanism</p>
              </div>

              <h4>Address Translation in Paging:</h4>
              <p>Logical address is divided into two parts:</p>
              <ul>
                <li><strong>Page Number (p):</strong> Used as index into page table</li>
                <li><strong>Page Offset (d):</strong> Combined with base address from page table</li>
              </ul>

              <div className="example-box">
                <h5>Paging Example</h5>
                <p><strong>System Configuration:</strong></p>
                <ul>
                  <li>Page size = 4KB (4096 bytes)</li>
                  <li>Logical address space = 16KB (pages 0-3)</li>
                  <li>Physical memory = 32KB (frames 0-7)</li>
                </ul>
                <p><strong>Page Table:</strong></p>
                <ul>
                  <li>Page 0 → Frame 3</li>
                  <li>Page 1 → Frame 1</li>
                  <li>Page 2 → Frame 6</li>
                  <li>Page 3 → Frame 0</li>
                </ul>
                <p><strong>Address Translation:</strong></p>
                <p>Logical address 0x2000 (8192 decimal):</p>
                <ul>
                  <li>Page number = 8192 / 4096 = 2</li>
                  <li>Offset = 8192 % 4096 = 0</li>
                  <li>Frame number = Page Table[2] = 6</li>
                  <li>Physical address = (6 × 4096) + 0 = 24576 (0x6000)</li>
                </ul>
              </div>

              <h4>Paging Advantages:</h4>
              <ul>
                <li><strong>Eliminates External Fragmentation:</strong> Pages can be placed in any available frame</li>
                <li><strong>Simple Allocation:</strong> Any free frame can be allocated to any page</li>
                <li><strong>Sharing:</strong> Multiple processes can share same physical pages (code sharing)</li>
                <li><strong>Protection:</strong> Per-page access control (read, write, execute bits)</li>
                <li><strong>Virtual Memory Support:</strong> Foundation for demand paging</li>
              </ul>

              <h4>Paging Disadvantages:</h4>
              <ul>
                <li><strong>Internal Fragmentation:</strong> Last page may be partially filled (average 0.5 page per process)</li>
                <li><strong>Page Table Overhead:</strong> Storage space for page tables</li>
                <li><strong>Translation Overhead:</strong> Time to translate addresses</li>
                <li><strong>No Logical Division:</strong> Doesn't reflect program structure</li>
                <li><strong>TLB Required:</strong> Need Translation Lookaside Buffer for performance</li>
              </ul>

              <h4>Page Table Structure:</h4>
              <p>Each page table entry typically contains:</p>
              <ul>
                <li><strong>Frame Number:</strong> Physical frame location</li>
                <li><strong>Valid/Invalid Bit:</strong> Indicates if page is in memory</li>
                <li><strong>Protection Bits:</strong> Read, write, execute permissions</li>
                <li><strong>Reference Bit:</strong> Set when page is accessed</li>
                <li><strong>Modified (Dirty) Bit:</strong> Set when page is written to</li>
              </ul>

              <h3>Segmentation</h3>
              <p>Segmentation is a memory management scheme that supports the user's view of memory. A program is a collection of segments such as main program, procedures, functions, methods, objects, local variables, global variables, common block, stack, symbol table, and arrays.</p>

              <h4>Segmentation Concepts:</h4>
              <ul>
                <li><strong>Segment:</strong> Variable-sized logical unit (code, data, stack)</li>
                <li><strong>Segment Table:</strong> Maps segment numbers to base addresses and limits</li>
                <li><strong>Segment Number (s):</strong> Index into segment table</li>
                <li><strong>Segment Offset (d):</strong> Offset within the segment</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250909145919990999/Segmentation.jpg" alt="Segmentation" />
                <p className="image-caption">Figure 4.3: Segmentation Mechanism</p>
              </div>

              <h4>Segment Table Entry:</h4>
              <ul>
                <li><strong>Base:</strong> Starting physical address of segment</li>
                <li><strong>Limit:</strong> Length of segment (for bounds checking)</li>
                <li><strong>Protection Bits:</strong> Access rights for segment</li>
              </ul>

              <div className="example-box">
                <h5>Segmentation Example</h5>
                <p><strong>Process Segments:</strong></p>
                <ul>
                  <li>Segment 0 (Code): 10KB</li>
                  <li>Segment 1 (Data): 5KB</li>
                  <li>Segment 2 (Stack): 2KB</li>
                </ul>
                <p><strong>Segment Table:</strong></p>
                <ul>
                  <li>Segment 0: Base=10000, Limit=10240</li>
                  <li>Segment 1: Base=20000, Limit=5120</li>
                  <li>Segment 2: Base=30000, Limit=2048</li>
                </ul>
                <p><strong>Address Translation:</strong></p>
                <p>Logical address (2, 1000) = Segment 2, offset 1000:</p>
                <ul>
                  <li>Check: offset (1000) &lt; limit (2048) ✓ Valid</li>
                  <li>Physical address = Base + Offset = 30000 + 1000 = 31000</li>
                </ul>
                <p>Logical address (2, 3000) = Segment 2, offset 3000:</p>
                <ul>
                  <li>Check: offset (3000) &gt; limit (2048) ✗ Segmentation Fault!</li>
                </ul>
              </div>

              <h4>Segmentation Advantages:</h4>
              <ul>
                <li><strong>Logical Division:</strong> Matches program structure naturally</li>
                <li><strong>Sharing:</strong> Easy to share logical entities (code segments)</li>
                <li><strong>Protection:</strong> Per-segment access rights (code read-only, data read-write)</li>
                <li><strong>Dynamic Growth:</strong> Segments can grow during execution</li>
                <li><strong>Modularity:</strong> Supports modular programming</li>
              </ul>

              <h4>Segmentation Disadvantages:</h4>
              <ul>
                <li><strong>External Fragmentation:</strong> Variable-size segments cause fragmentation</li>
                <li><strong>Complexity:</strong> More complex than paging</li>
                <li><strong>Segment Table Overhead:</strong> Storage and access time</li>
                <li><strong>Compaction Required:</strong> Periodic compaction needed</li>
              </ul>

              <h3>Paging vs Segmentation</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Paging</th>
                      <th>Segmentation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Block Size</td>
                      <td>Fixed (pages/frames)</td>
                      <td>Variable (segments)</td>
                    </tr>
                    <tr>
                      <td>User View</td>
                      <td>Invisible to user</td>
                      <td>Visible to user</td>
                    </tr>
                    <tr>
                      <td>Fragmentation</td>
                      <td>Internal only</td>
                      <td>External only</td>
                    </tr>
                    <tr>
                      <td>Logical Division</td>
                      <td>No</td>
                      <td>Yes (matches program structure)</td>
                    </tr>
                    <tr>
                      <td>Sharing</td>
                      <td>Difficult</td>
                      <td>Easy (logical units)</td>
                    </tr>
                    <tr>
                      <td>Protection</td>
                      <td>Per-page</td>
                      <td>Per-segment (more natural)</td>
                    </tr>
                    <tr>
                      <td>Address Space</td>
                      <td>Single linear space</td>
                      <td>Multiple address spaces</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>Segmentation with Paging:</h4>
              <p>Many modern systems combine both techniques:</p>
              <ul>
                <li>Segments are divided into pages</li>
                <li>Gets benefits of both: logical division + no external fragmentation</li>
                <li>Examples: Intel x86 architecture, Multics</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Paging in Operating Systems</h4>
              <p>Comprehensive explanation of paging mechanism and address translation.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/pJ6qrCB8pDw"
                title="Paging in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Segmentation in Operating Systems</h4>
              <p>Understanding segmentation and how it differs from paging.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dz9Tk6KCMlQ"
                title="Segmentation in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 2 Quiz" questions={module2Quiz} subject="OS" unitId={4} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← Swapping & Contiguous Allocation</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">Virtual Memory →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">4.3</div>
              <div className="lesson-title-main">
                <h1>Virtual Memory & Demand Paging</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Virtual Memory</h3>
              <p>Virtual memory is a memory management technique that provides an idealized abstraction of the storage resources actually available on a machine. It creates an illusion for users of a very large (main) memory by treating a portion of secondary storage as though it were part of main memory.</p>

              <h4>Virtual Memory Concepts:</h4>
              <ul>
                <li><strong>Virtual Address Space:</strong> Logical addresses seen by programs (can be larger than physical memory)</li>
                <li><strong>Physical Address Space:</strong> Actual memory locations in RAM</li>
                <li><strong>Address Translation:</strong> Convert virtual addresses to physical addresses</li>
                <li><strong>Page Fault:</strong> Occurs when accessing a page not in physical memory</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250115142221545470/virtual_memory.webp" alt="Virtual Memory" />
                <p className="image-caption">Figure 4.4: Virtual Memory Concept</p>
              </div>

              <h4>Virtual Memory Benefits:</h4>
              <ul>
                <li><strong>Memory Extension:</strong> Run programs larger than physical memory</li>
                <li><strong>Process Isolation:</strong> Each process has separate address space</li>
                <li><strong>Memory Protection:</strong> Prevent processes from interfering with each other</li>
                <li><strong>Memory Sharing:</strong> Share code and data between processes efficiently</li>
                <li><strong>Simplified Programming:</strong> Programmers don't worry about physical memory limits</li>
                <li><strong>More Processes:</strong> More processes can be in memory simultaneously</li>
              </ul>

              <h3>Demand Paging</h3>
              <p>Demand paging is a method of virtual memory management where pages are loaded into memory only when they are demanded (accessed) during program execution, rather than loading the entire program at startup.</p>

              <h4>Demand Paging Process:</h4>
              <div className="example-box">
                <h5>Demand Paging Steps</h5>
                <ol>
                  <li><strong>Process Starts:</strong> No pages loaded initially (or minimal pages)</li>
                  <li><strong>First Access:</strong> CPU tries to access a page not in memory</li>
                  <li><strong>Page Fault:</strong> Hardware trap to OS (page fault exception)</li>
                  <li><strong>Validity Check:</strong> OS checks if reference is valid</li>
                  <li><strong>Find Free Frame:</strong> Locate free frame in physical memory</li>
                  <li><strong>Load Page:</strong> Read page from disk into frame</li>
                  <li><strong>Update Page Table:</strong> Mark page as valid, set frame number</li>
                  <li><strong>Restart Instruction:</strong> Resume execution from faulting instruction</li>
                </ol>
              </div>

              <h4>Page Table Entries in Demand Paging:</h4>
              <ul>
                <li><strong>Valid Bit:</strong> 1 = page in memory, 0 = page on disk</li>
                <li><strong>Frame Number:</strong> Physical frame location (if valid)</li>
                <li><strong>Disk Address:</strong> Location on disk (if invalid)</li>
                <li><strong>Reference Bit:</strong> Set when page is accessed</li>
                <li><strong>Modified (Dirty) Bit:</strong> Set when page is written to</li>
                <li><strong>Protection Bits:</strong> Read, write, execute permissions</li>
              </ul>

              <div className="example-box">
                <h5>Page Fault Handling Example</h5>
                <p><strong>Scenario:</strong> Process tries to access page 5</p>
                <ol>
                  <li>CPU generates address with page number 5</li>
                  <li>MMU checks page table: Valid bit = 0 (not in memory)</li>
                  <li>Page fault trap to OS</li>
                  <li>OS checks: Is page 5 valid for this process? Yes</li>
                  <li>OS finds free frame (e.g., frame 7)</li>
                  <li>OS issues disk I/O to read page 5 into frame 7</li>
                  <li>OS updates page table: Page 5 → Frame 7, Valid = 1</li>
                  <li>OS returns from trap, instruction restarts</li>
                  <li>CPU accesses frame 7 successfully</li>
                </ol>
              </div>

              <h4>Demand Paging Advantages:</h4>
              <ul>
                <li><strong>Reduced I/O:</strong> Only load needed pages, not entire program</li>
                <li><strong>Less Memory Usage:</strong> Only active pages in memory</li>
                <li><strong>Fast Startup:</strong> No initial loading delay</li>
                <li><strong>Greater Multiprogramming:</strong> More processes can fit in memory</li>
                <li><strong>Efficient Memory Use:</strong> Unused code never loaded</li>
              </ul>

              <h4>Demand Paging Considerations:</h4>
              <ul>
                <li><strong>Page Fault Overhead:</strong> Time to handle page faults (disk I/O is slow)</li>
                <li><strong>Thrashing Risk:</strong> Too many page faults degrade performance</li>
                <li><strong>Working Set:</strong> Need to keep frequently used pages in memory</li>
                <li><strong>Replacement Strategy:</strong> Which page to evict when memory is full</li>
              </ul>

              <h4>Effective Access Time (EAT):</h4>
              <p>The average time to access memory considering page faults:</p>
              <div className="example-box">
                <h5>EAT Calculation</h5>
                <p><strong>Formula:</strong> EAT = (1 - p) × memory_access_time + p × page_fault_time</p>
                <p>Where p = page fault rate (0 ≤ p ≤ 1)</p>
                <p><strong>Example:</strong></p>
                <ul>
                  <li>Memory access time = 200 nanoseconds</li>
                  <li>Page fault time = 8 milliseconds = 8,000,000 nanoseconds</li>
                  <li>Page fault rate = 0.001 (1 fault per 1000 accesses)</li>
                </ul>
                <p><strong>Calculation:</strong></p>
                <p>EAT = (1 - 0.001) × 200 + 0.001 × 8,000,000</p>
                <p>EAT = 0.999 × 200 + 8,000</p>
                <p>EAT = 199.8 + 8,000 = 8,199.8 nanoseconds</p>
                <p><strong>Slowdown:</strong> 41× slower than direct memory access!</p>
              </div>

              <h4>Pure Demand Paging:</h4>
              <p>Start process with no pages in memory. First instruction causes page fault, then every page is brought in as needed. This is the extreme case.</p>

              <h4>Prepaging:</h4>
              <p>Opposite of pure demand paging. Load multiple pages at once based on prediction. Reduces page faults but may load unnecessary pages.</p>

              <h4>Copy-on-Write (COW):</h4>
              <p>Optimization for process creation:</p>
              <ul>
                <li>Parent and child initially share same pages</li>
                <li>Pages marked as copy-on-write</li>
                <li>When either process writes, page is copied</li>
                <li>Saves memory and time for fork() operations</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Virtual Memory in Operating Systems</h4>
              <p>Understanding virtual memory concepts and benefits.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2quKyPnUShQ"
                title="Virtual Memory in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Demand Paging</h4>
              <p>Learn how demand paging works and handles page faults.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/eWRnKH5IMNg"
                title="Demand Paging"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 3 Quiz" questions={module3Quiz} subject="OS" unitId={4} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← Paging & Segmentation</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">Page Replacement & Thrashing →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">4.4</div>
              <div className="lesson-title-main">
                <h1>Page Replacement & Thrashing</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Page Replacement Algorithms</h3>
              <p>When memory is full and a page fault occurs, the OS must select a victim page to evict (replace) to make room for the new page. Different algorithms have different performance characteristics measured by page fault rate.</p>

              <h4>Algorithm Selection Criteria:</h4>
              <ul>
                <li><strong>Page Fault Rate:</strong> Minimize number of page faults</li>
                <li><strong>Implementation Complexity:</strong> Practical to implement</li>
                <li><strong>Performance:</strong> Overall system efficiency</li>
                <li><strong>Overhead:</strong> Time and space requirements</li>
              </ul>

              <h3>1. FIFO (First-In, First-Out)</h3>
              <p>The simplest page replacement algorithm. Replace the oldest page in memory (the one that has been in memory the longest).</p>

              <div className="example-box">
                <h5>FIFO Example</h5>
                <p><strong>Reference String:</strong> 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2</p>
                <p><strong>Number of Frames:</strong> 3</p>
                <p><strong>Execution:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem'}}>
{`Page  Frame1  Frame2  Frame3  Fault?
7      7       -       -       Yes
0      7       0       -       Yes
1      7       0       1       Yes
2      2       0       1       Yes (7 replaced)
0      2       0       1       No
3      2       3       1       Yes (0 replaced)
0      2       3       0       Yes (1 replaced)
4      4       3       0       Yes (2 replaced)
2      4       2       0       Yes (3 replaced)
3      4       2       3       Yes (0 replaced)
0      0       2       3       Yes (4 replaced)
3      0       2       3       No
2      0       2       3       No`}
                </pre>
                <p><strong>Total Page Faults:</strong> 10 out of 13 references</p>
                <p><strong>Page Fault Rate:</strong> 77%</p>
              </div>

              <h4>FIFO Advantages:</h4>
              <ul>
                <li><strong>Simplicity:</strong> Easy to understand and implement</li>
                <li><strong>Low Overhead:</strong> Just need a queue</li>
                <li><strong>Predictability:</strong> Deterministic behavior</li>
                <li><strong>Fairness:</strong> Each page gets equal time</li>
              </ul>

              <h4>FIFO Disadvantages:</h4>
              <ul>
                <li><strong>Belady's Anomaly:</strong> More frames can cause MORE page faults</li>
                <li><strong>Ignores Usage:</strong> Doesn't consider access patterns</li>
                <li><strong>Suboptimal:</strong> Often higher fault rates</li>
                <li><strong>Old Important Pages:</strong> May evict frequently used pages</li>
              </ul>

              <div className="example-box">
                <h5>Belady's Anomaly Example</h5>
                <p><strong>Reference String:</strong> 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</p>
                <p><strong>With 3 frames:</strong> 9 page faults</p>
                <p><strong>With 4 frames:</strong> 10 page faults (more!)</p>
                <p>This counterintuitive behavior is unique to FIFO</p>
              </div>

              <h3>2. LRU (Least Recently Used)</h3>
              <p>Replace the page that has not been used for the longest period of time. Based on the principle of temporal locality: recently used pages are likely to be used again soon.</p>

              <div className="example-box">
                <h5>LRU Example</h5>
                <p><strong>Reference String:</strong> 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2</p>
                <p><strong>Number of Frames:</strong> 3</p>
                <p><strong>Execution (tracking recent usage):</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem'}}>
{`Page  Frame1  Frame2  Frame3  Fault?  LRU Order
7      7       -       -       Yes     7
0      7       0       -       Yes     7,0
1      7       0       1       Yes     7,0,1
2      2       0       1       Yes     0,1,2 (7 LRU)
0      2       0       1       No      1,2,0
3      2       0       3       Yes     2,0,3 (1 LRU)
0      2       0       3       No      2,3,0
4      4       0       3       Yes     0,3,4 (2 LRU)
2      4       0       2       Yes     0,4,2 (3 LRU)
3      4       3       2       Yes     4,2,3 (0 LRU)
0      0       3       2       Yes     3,2,0 (4 LRU)
3      0       3       2       No      2,0,3
2      0       3       2       No      0,3,2`}
                </pre>
                <p><strong>Total Page Faults:</strong> 9 out of 13 references</p>
                <p><strong>Page Fault Rate:</strong> 69%</p>
              </div>

              <h4>LRU Implementation Methods:</h4>
              <ul>
                <li><strong>Counter Method:</strong> Timestamp each page access (expensive)</li>
                <li><strong>Stack Method:</strong> Maintain stack of page numbers (doubly linked list)</li>
                <li><strong>Hardware Support:</strong> Reference bits with aging</li>
                <li><strong>Approximation:</strong> Second-chance, clock algorithms</li>
              </ul>

              <h4>LRU Advantages:</h4>
              <ul>
                <li><strong>Good Performance:</strong> Generally low page fault rates</li>
                <li><strong>Intuitive:</strong> Based on reasonable assumption</li>
                <li><strong>No Belady's Anomaly:</strong> More frames never worse</li>
                <li><strong>Exploits Locality:</strong> Works well with temporal locality</li>
              </ul>

              <h4>LRU Disadvantages:</h4>
              <ul>
                <li><strong>Implementation Cost:</strong> Expensive to implement exactly</li>
                <li><strong>Overhead:</strong> Need to track access times</li>
                <li><strong>Hardware Support:</strong> May require special hardware</li>
              </ul>

              <h3>3. Optimal Page Replacement</h3>
              <p>Replace the page that will not be used for the longest period of time in the future. This is the theoretical best algorithm but impossible to implement in practice (requires future knowledge).</p>

              <div className="example-box">
                <h5>Optimal Example</h5>
                <p><strong>Reference String:</strong> 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2</p>
                <p><strong>Number of Frames:</strong> 3</p>
                <p><strong>Execution (knowing future):</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem'}}>
{`Page  Frame1  Frame2  Frame3  Fault?  Reason
7      7       -       -       Yes     
0      7       0       -       Yes     
1      7       0       1       Yes     
2      2       0       1       Yes     Replace 7 (never used again)
0      2       0       1       No      
3      2       0       3       Yes     Replace 1 (used at end)
0      2       0       3       No      
4      2       4       3       Yes     Replace 0 (used soon)
2      2       4       3       No      
3      2       4       3       No      
0      2       0       3       Yes     Replace 4 (never used again)
3      2       0       3       No      
2      2       0       3       No`}
                </pre>
                <p><strong>Total Page Faults:</strong> 7 out of 13 references</p>
                <p><strong>Page Fault Rate:</strong> 54% (Best possible!)</p>
              </div>

              <h4>Optimal Characteristics:</h4>
              <ul>
                <li><strong>Theoretical Benchmark:</strong> Best possible performance</li>
                <li><strong>Impossible to Implement:</strong> Requires future knowledge</li>
                <li><strong>Performance Measure:</strong> Compare other algorithms against this</li>
                <li><strong>Lower Bound:</strong> Sets minimum possible page faults</li>
              </ul>

              <h3>Algorithm Comparison</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Algorithm</th>
                      <th>Page Faults (Example)</th>
                      <th>Belady's Anomaly</th>
                      <th>Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FIFO</td>
                      <td>10 (77%)</td>
                      <td>Yes</td>
                      <td>Simple (queue)</td>
                    </tr>
                    <tr>
                      <td>LRU</td>
                      <td>9 (69%)</td>
                      <td>No</td>
                      <td>Complex (stack/counter)</td>
                    </tr>
                    <tr>
                      <td>Optimal</td>
                      <td>7 (54%)</td>
                      <td>No</td>
                      <td>Impossible (needs future)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Thrashing</h3>
              <p>Thrashing is a severe performance problem that occurs when a computer's virtual memory resources become saturated, leading to a constant state of paging. The system spends more time swapping pages than executing processes.</p>

              <div className="example-box">
                <h5>Thrashing Cycle</h5>
                <ol>
                  <li>Process A needs page X → page fault</li>
                  <li>OS swaps in page X, evicts page Y from Process B</li>
                  <li>Process B needs page Y → page fault</li>
                  <li>OS swaps in page Y, evicts page Z from Process C</li>
                  <li>Process C needs page Z → page fault</li>
                  <li>Cycle continues with excessive swapping</li>
                  <li>CPU utilization drops dramatically</li>
                  <li>System throughput approaches zero</li>
                </ol>
              </div>

              <h4>Thrashing Detection:</h4>
              <ul>
                <li><strong>High Page Fault Rate:</strong> Frequent page faults</li>
                <li><strong>Low CPU Utilization:</strong> CPU mostly idle waiting for I/O</li>
                <li><strong>High Disk Utilization:</strong> Disk constantly active</li>
                <li><strong>Slow Response:</strong> System becomes unresponsive</li>
              </ul>

              <h4>Thrashing Causes:</h4>
              <ul>
                <li><strong>Over-allocation:</strong> Too many processes for available memory</li>
                <li><strong>Working Set Exceeds Memory:</strong> Process needs exceed available frames</li>
                <li><strong>Poor Locality:</strong> Random memory access patterns</li>
                <li><strong>Inadequate Replacement:</strong> Poor page replacement strategy</li>
              </ul>

              <h4>Thrashing Solutions:</h4>
              <ul>
                <li><strong>Reduce Multiprogramming:</strong> Suspend some processes</li>
                <li><strong>Working Set Model:</strong> Keep working sets in memory</li>
                <li><strong>Local Replacement:</strong> Replace only from same process</li>
                <li><strong>Page Fault Frequency (PFF):</strong> Monitor and control fault rate</li>
                <li><strong>Add More Memory:</strong> Increase physical memory</li>
              </ul>

              <h4>Working Set Model:</h4>
              <p>The working set of a process is the set of pages it is currently using. Keep the working set in memory to avoid thrashing.</p>
              <ul>
                <li><strong>Working Set Window (Δ):</strong> Time window to observe page references</li>
                <li><strong>Working Set Size (WSS):</strong> Number of unique pages in window</li>
                <li><strong>Total Demand (D):</strong> Sum of all working set sizes</li>
                <li><strong>Available Frames (m):</strong> Total physical frames</li>
                <li>If D &gt; m: Thrashing likely, suspend processes</li>
                <li>If D &lt; m: Can accommodate more processes</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Page Replacement Algorithms</h4>
              <p>Comprehensive comparison of FIFO, LRU, and Optimal page replacement algorithms.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/HIVmtQGVQ6M"
                title="Page Replacement Algorithms"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Thrashing in Operating Systems</h4>
              <p>Understanding thrashing, its causes, and prevention techniques.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/G1fA4MiIr6E"
                title="Thrashing in Operating Systems"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 4 Quiz" questions={module4Quiz} subject="OS" unitId={4} moduleId={4} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← Virtual Memory & Demand Paging</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Unit 4 Comprehensive Quiz →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <h2>Unit 4 Comprehensive Quiz</h2>
            
            <section className="content-section">
              <p>Test your understanding of all concepts covered in Unit 4: Memory Management.</p>
              <p>This quiz covers:</p>
              <ul>
                <li>Swapping and Contiguous Memory Allocation (MFT & MVT)</li>
                <li>Non-Contiguous Memory Allocation (Paging & Segmentation)</li>
                <li>Virtual Memory and Demand Paging</li>
                <li>Page Replacement Algorithms (FIFO, LRU, Optimal)</li>
                <li>Thrashing and Working Set Model</li>
              </ul>
            </section>

            <Quiz title="Unit 4 Comprehensive Quiz" questions={unit4Quiz} subject="OS" unitId={4} moduleId={5} />

            <div className="reference-section">
              <h3>Reference Materials</h3>
              <ul>
                <li><a href="https://www.geeksforgeeks.org/memory-management-in-operating-system/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Memory Management</a></li>
                <li><a href="https://www.tutorialspoint.com/operating_system/os_memory_management.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint - Memory Management</a></li>
                <li><a href="https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Virtual Memory</a></li>
                <li><a href="https://www.javatpoint.com/os-paging" target="_blank" rel="noopener noreferrer">JavaTpoint - Paging</a></li>
                <li><a href="https://nptel.ac.in/courses/106/106/106106144/" target="_blank" rel="noopener noreferrer">NPTEL - Operating Systems</a></li>
              </ul>
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Page Replacement & Thrashing</button>
            </div>
          </div>
        );

      default:
        return <div>Module content loading...</div>;
    }
  };

  return <div className="unit-container">{renderModule()}</div>;
};

export default Unit4;

