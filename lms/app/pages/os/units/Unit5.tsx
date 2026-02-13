'use client';
import React from 'react';
import Quiz from '../components/Quiz';

interface Unit5Props {
  currentModule: number;
  setCurrentModule: (module: number) => void;
  onBack: () => void;
}

const Unit5: React.FC<Unit5Props> = ({ currentModule, setCurrentModule, onBack }) => {
  const module1Quiz = [
    {
      question: "What is a file in operating systems?",
      options: ["A collection of related information", "A hardware component", "A type of process", "A memory allocation technique"],
      correctAnswer: 0,
      explanation: "A file is a named collection of related information recorded on secondary storage, representing a logical unit of information."
    },
    {
      question: "What is sequential access?",
      options: ["Accessing records in random order", "Accessing records in predetermined order", "Accessing records simultaneously", "Accessing records through direct addresses"],
      correctAnswer: 1,
      explanation: "Sequential access means records are accessed in a predetermined order, one after another."
    },
    {
      question: "What is a directory?",
      options: ["A special file containing information about other files", "A memory location", "A type of process", "A hardware device"],
      correctAnswer: 0,
      explanation: "A directory is a special type of file that contains information about other files and organizes them hierarchically."
    }
  ];

  const module2Quiz = [
    {
      question: "What is file system mounting?",
      options: ["Installing a file system", "Making a file system available at a mount point", "Deleting a file system", "Encrypting a file system"],
      correctAnswer: 1,
      explanation: "Mounting is the process of making a file system available for access at a particular mount point in the directory tree."
    },
    {
      question: "What are access control lists (ACLs)?",
      options: ["Lists of files", "Lists of users and their permissions", "Lists of directories", "Lists of processes"],
      correctAnswer: 1,
      explanation: "ACLs are lists that specify which users or groups have what permissions on files and directories."
    },
    {
      question: "What is file sharing?",
      options: ["Copying files", "Multiple users accessing same file", "Deleting files", "Encrypting files"],
      correctAnswer: 1,
      explanation: "File sharing allows multiple users or processes to access the same file simultaneously."
    }
  ];

  const module3Quiz = [
    {
      question: "What is seek time in disk operations?",
      options: ["Time to read data", "Time to position head over track", "Time for disk rotation", "Time to transfer data"],
      correctAnswer: 1,
      explanation: "Seek time is the time required to position the disk head over the desired track."
    },
    {
      question: "What is a cylinder in disk structure?",
      options: ["A single track", "Same track number across all platters", "A sector", "A platter"],
      correctAnswer: 1,
      explanation: "A cylinder consists of the same track number on all platters in a disk drive."
    },
    {
      question: "What is rotational latency?",
      options: ["Time to position head", "Time for sector to rotate under head", "Time to transfer data", "Time to start disk"],
      correctAnswer: 1,
      explanation: "Rotational latency is the time for the desired sector to rotate under the read/write head."
    }
  ];

  const module4Quiz = [
    {
      question: "What is the FCFS disk scheduling algorithm?",
      options: ["Serves shortest seek time first", "Serves requests in arrival order", "Moves head in one direction", "Serves requests in circular manner"],
      correctAnswer: 1,
      explanation: "FCFS (First-Come, First-Served) processes disk requests in the order they arrive in the queue."
    },
    {
      question: "What is the main advantage of SCAN algorithm?",
      options: ["Simplest to implement", "Better performance than FCFS", "Fastest algorithm", "Uses least memory"],
      correctAnswer: 1,
      explanation: "SCAN provides better performance than FCFS by servicing requests in a directional sweep."
    },
    {
      question: "What is the SSTF algorithm?",
      options: ["Serves requests in order", "Selects request with minimum seek time", "Moves in one direction", "Serves requests circularly"],
      correctAnswer: 1,
      explanation: "SSTF (Shortest Seek Time First) selects the request requiring minimum seek time from current head position."
    }
  ];

  const unit5Quiz = [
    {
      question: "What is direct access in files?",
      options: ["Sequential reading", "Any record can be accessed directly", "Indexed access", "Random writing"],
      correctAnswer: 1,
      explanation: "Direct access allows any record to be accessed directly without reading previous records."
    },
    {
      question: "Which disk scheduling algorithm can cause starvation?",
      options: ["FCFS", "SCAN", "SSTF", "CSCAN"],
      correctAnswer: 2,
      explanation: "SSTF can cause starvation as requests far from current head position may wait indefinitely."
    },
    {
      question: "What is the purpose of file protection?",
      options: ["Compress files", "Safeguard from unauthorized access", "Speed up access", "Reduce file size"],
      correctAnswer: 1,
      explanation: "File protection mechanisms ensure only authorized users can access files and prevent unauthorized modifications."
    },
    {
      question: "What is CSCAN algorithm?",
      options: ["Circular SCAN that returns to beginning", "Same as SCAN", "Same as FCFS", "Same as SSTF"],
      correctAnswer: 0,
      explanation: "CSCAN moves in one direction, then immediately returns to beginning without servicing requests on return."
    },
    {
      question: "What is a mount point?",
      options: ["A file location", "Directory where file system is attached", "A disk sector", "A memory address"],
      correctAnswer: 1,
      explanation: "A mount point is a directory in the file system where another file system is attached and made accessible."
    }
  ];

  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">5.1</div>
              <div className="lesson-title-main">
                <h1>File System Interface</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>The Concept of a File</h3>
              <p>A file is a named collection of related information that is recorded on secondary storage. From the user's perspective, a file is the smallest allocation of logical secondary storage and represents a logical unit of information that can be accessed and manipulated.</p>

              <h4>File Fundamentals:</h4>
              <p>A file is an abstract data type that represents a sequence of bytes stored on a storage device. It serves as a container for:</p>
              <ul>
                <li><strong>Data:</strong> Text, numbers, images, videos, etc.</li>
                <li><strong>Programs:</strong> Executable code and scripts</li>
                <li><strong>Documents:</strong> Text documents, spreadsheets, presentations</li>
              </ul>

              <h4>File Attributes:</h4>
              <ul>
                <li><strong>Name:</strong> Human-readable string identifying the file</li>
                <li><strong>Identifier:</strong> Unique tag (inode number) for internal OS use</li>
                <li><strong>Type:</strong> File type classification (.txt, .exe, .jpg, etc.)</li>
                <li><strong>Location:</strong> Pointer to device and location on device</li>
                <li><strong>Size:</strong> Current file size in bytes</li>
                <li><strong>Protection:</strong> Access control information (read, write, execute)</li>
                <li><strong>Time/Date:</strong> Creation, last modification, last access timestamps</li>
                <li><strong>Owner:</strong> User ID of the file owner</li>
              </ul>

              <div className="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230925210229/os-file-attr-660.png" alt="File Attributes" />
                <p className="image-caption">Figure 5.1: File Attributes</p>
              </div>

              <h4>File Types and Organization:</h4>
              <div className="example-box">
                <h5>Common File Types</h5>
                <p><strong>1. Source Files:</strong></p>
                <ul>
                  <li>Program code: .c, .cpp, .java, .py, .js</li>
                  <li>Documentation: .txt, .doc, .pdf, .md</li>
                  <li>Configuration: .ini, .conf, .xml, .json</li>
                </ul>
                <p><strong>2. Binary Files:</strong></p>
                <ul>
                  <li>Executables: .exe, .out, .app</li>
                  <li>Object files: .obj, .o</li>
                  <li>Libraries: .dll, .so, .lib</li>
                </ul>
                <p><strong>3. Data Files:</strong></p>
                <ul>
                  <li>Text: .txt, .csv, .log</li>
                  <li>Database: .db, .mdb, .sql</li>
                  <li>Multimedia: .mp3, .jpg, .mp4, .avi</li>
                </ul>
                <p><strong>4. Special Files:</strong></p>
                <ul>
                  <li>Device files (character/block devices)</li>
                  <li>Pipes and sockets</li>
                  <li>Symbolic links</li>
                </ul>
              </div>

              <h4>File Operations:</h4>
              <ul>
                <li><strong>Create:</strong> Establish a new file in the file system</li>
                <li><strong>Delete:</strong> Remove a file and free its space</li>
                <li><strong>Open:</strong> Prepare file for access, load metadata</li>
                <li><strong>Close:</strong> Terminate access, update metadata</li>
                <li><strong>Read:</strong> Transfer data from file to process memory</li>
                <li><strong>Write:</strong> Transfer data from process memory to file</li>
                <li><strong>Reposition (Seek):</strong> Move file pointer to specific location</li>
                <li><strong>Truncate:</strong> Reduce file size, delete content</li>
                <li><strong>Append:</strong> Add data to end of file</li>
              </ul>

              <h3>Access Methods</h3>
              <p>Access methods define how files can be accessed and read. Different methods are suited for different types of applications and data processing requirements.</p>

              <h4>1. Sequential Access</h4>
              <p>Records are accessed in order, one after another. The file pointer automatically advances after each read/write operation.</p>
              <ul>
                <li><strong>Process:</strong> Read/write next record sequentially</li>
                <li><strong>Pointer Movement:</strong> Automatic after each operation</li>
                <li><strong>Use Cases:</strong> Tape storage, log files, batch processing, streaming</li>
                <li><strong>Advantages:</strong> Simple, efficient for sequential processing</li>
                <li><strong>Disadvantages:</strong> Slow for random access, must read all previous records</li>
              </ul>

              <div className="example-box">
                <h5>Sequential Access Example</h5>
                <p>Reading a log file line by line:</p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`File: system.log
Line 1: [2024-01-01] System started
Line 2: [2024-01-01] User logged in
Line 3: [2024-01-01] File accessed

Sequential Read:
read_next() → Line 1
read_next() → Line 2
read_next() → Line 3`}
                </pre>
              </div>

              <h4>2. Direct Access (Random Access)</h4>
              <p>Any record can be accessed directly without reading previous records. The file is viewed as a numbered sequence of blocks or records.</p>
              <ul>
                <li><strong>Process:</strong> Calculate position, jump directly to record</li>
                <li><strong>Pointer Movement:</strong> Explicitly positioned to desired record</li>
                <li><strong>Use Cases:</strong> Database systems, random access files, disk storage</li>
                <li><strong>Advantages:</strong> Fast access to any record, no need to read sequentially</li>
                <li><strong>Disadvantages:</strong> More complex implementation, requires record numbering</li>
              </ul>

              <div className="example-box">
                <h5>Direct Access Example</h5>
                <p>Accessing database records:</p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`File: database.dat (1000 records, 512 bytes each)

Direct Access:
read(record_number=500)
  → Position = 500 × 512 = 256,000 bytes
  → Seek to byte 256,000
  → Read 512 bytes

read(record_number=10)
  → Position = 10 × 512 = 5,120 bytes
  → Seek to byte 5,120
  → Read 512 bytes`}
                </pre>
              </div>

              <h4>3. Indexed Access</h4>
              <p>Uses an index table to locate records quickly. The index contains pointers to various blocks in the file.</p>
              <ul>
                <li><strong>Structure:</strong> Index table + data blocks</li>
                <li><strong>Process:</strong> Search index, follow pointer to data</li>
                <li><strong>Use Cases:</strong> Large databases, frequent searches, complex queries</li>
                <li><strong>Advantages:</strong> Very fast searches, supports multiple indices</li>
                <li><strong>Disadvantages:</strong> Index storage overhead, index maintenance cost</li>
              </ul>

              <h4>Access Methods Comparison:</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Speed</th>
                      <th>Complexity</th>
                      <th>Overhead</th>
                      <th>Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sequential</td>
                      <td>Slow for random</td>
                      <td>Simple</td>
                      <td>None</td>
                      <td>Batch processing, streaming</td>
                    </tr>
                    <tr>
                      <td>Direct</td>
                      <td>Fast for random</td>
                      <td>Moderate</td>
                      <td>None</td>
                      <td>Database systems</td>
                    </tr>
                    <tr>
                      <td>Indexed</td>
                      <td>Very fast</td>
                      <td>Complex</td>
                      <td>Index storage</td>
                      <td>Large datasets, searches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="video-embed">
              <h4>File System Interface</h4>
              <p>Understanding files, file attributes, and access methods in operating systems.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/7pzpYedfzac"
                title="File System Interface"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>File Access Methods</h4>
              <p>Learn about sequential, direct, and indexed access methods.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/q1f2hizy3_M"
                title="File Access Methods"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 1 Quiz" questions={module1Quiz} subject="OS" unitId={5} moduleId={1} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="next-module-btn">Directory Structure & Mounting →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">5.2</div>
              <div className="lesson-title-main">
                <h1>Directory Structure & Mounting</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Directory Structure</h3>
              <p>Directories (also called folders) provide a logical grouping of files and organize the file system in a hierarchical structure. They make it easier to locate, manage, and organize files efficiently.</p>

              <h4>Directory Operations:</h4>
              <ul>
                <li><strong>Search:</strong> Locate files by name or attributes</li>
                <li><strong>Create:</strong> Establish new directory</li>
                <li><strong>Delete:</strong> Remove directory (must be empty or force delete)</li>
                <li><strong>List:</strong> Show directory contents</li>
                <li><strong>Rename:</strong> Change directory name</li>
                <li><strong>Traverse:</strong> Navigate through directory tree</li>
              </ul>

              <h4>Directory Structure Types:</h4>

              <h5>1. Single-Level Directory</h5>
              <p>All files are contained in a single directory. Simplest structure but has limitations.</p>
              <ul>
                <li><strong>Advantages:</strong> Simple, easy to implement</li>
                <li><strong>Disadvantages:</strong> Name conflicts, no grouping, poor organization</li>
                <li><strong>Use Case:</strong> Early systems, simple embedded systems</li>
              </ul>

              <h5>2. Two-Level Directory</h5>
              <p>Separate directory for each user. Solves name conflict problem.</p>
              <ul>
                <li><strong>Structure:</strong> Master File Directory (MFD) + User File Directories (UFD)</li>
                <li><strong>Advantages:</strong> Isolates users, allows same file names</li>
                <li><strong>Disadvantages:</strong> No grouping within user, limited organization</li>
              </ul>

              <h5>3. Hierarchical (Tree) Directory</h5>
              <p>Most common structure. Directories can contain files and subdirectories, forming a tree.</p>
              <ul>
                <li><strong>Root Directory:</strong> Top of tree (/)</li>
                <li><strong>Subdirectories:</strong> Directories within directories</li>
                <li><strong>Path:</strong> Absolute (/home/user/file.txt) or Relative (../file.txt)</li>
                <li><strong>Advantages:</strong> Flexible, organized, supports grouping</li>
                <li><strong>Disadvantages:</strong> More complex, potential for deep nesting</li>
              </ul>

              <div className="example-box">
                <h5>Hierarchical Directory Example</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem'}}>
{`/ (root)
├── home/
│   ├── user1/
│   │   ├── documents/
│   │   │   ├── report.pdf
│   │   │   └── memo.txt
│   │   └── pictures/
│   │       ├── vacation.jpg
│   │       └── family.png
│   └── user2/
│       ├── projects/
│       │   ├── project1.c
│       │   └── project2.py
│       └── downloads/
└── usr/
    ├── bin/
    ├── lib/
    └── share/`}
                </pre>
              </div>

              <h5>4. Acyclic Graph Directory</h5>
              <p>Allows shared subdirectories and files. Uses links to share files between directories.</p>
              <ul>
                <li><strong>Sharing:</strong> Multiple paths to same file</li>
                <li><strong>Links:</strong> Hard links or symbolic links</li>
                <li><strong>Advantages:</strong> Efficient sharing, no duplication</li>
                <li><strong>Disadvantages:</strong> Complex deletion, dangling pointers</li>
              </ul>

              <h5>5. General Graph Directory</h5>
              <p>Allows cycles in directory structure. Most flexible but most complex.</p>
              <ul>
                <li><strong>Cycles:</strong> Directory can be its own ancestor</li>
                <li><strong>Challenges:</strong> Traversal algorithms, garbage collection</li>
                <li><strong>Solution:</strong> Cycle detection, reference counting</li>
              </ul>

              <h4>Directory Implementation:</h4>

              <h5>Linear List Implementation:</h5>
              <ul>
                <li><strong>Structure:</strong> Linear list of file entries</li>
                <li><strong>Entry Format:</strong> File name + pointer to data blocks</li>
                <li><strong>Advantages:</strong> Simple to implement</li>
                <li><strong>Disadvantages:</strong> Slow search O(n), duplicate names possible</li>
              </ul>

              <h5>Hash Table Implementation:</h5>
              <ul>
                <li><strong>Structure:</strong> Hash table for directory entries</li>
                <li><strong>Hash Function:</strong> File name → hash value → bucket</li>
                <li><strong>Advantages:</strong> Fast O(1) average access</li>
                <li><strong>Disadvantages:</strong> Collisions, fixed size, hash function overhead</li>
              </ul>

              <h3>File System Mounting</h3>
              <p>File system mounting is the process of making a file system available for access at a particular mount point in the directory tree structure. It integrates different file systems into a unified directory hierarchy.</p>

              <h4>Mounting Process:</h4>
              <ol>
                <li><strong>Identify Device:</strong> Specify device containing file system (/dev/sdb1)</li>
                <li><strong>Mount Point:</strong> Choose directory where file system will be attached</li>
                <li><strong>File System Type:</strong> Identify format (ext4, NTFS, FAT32)</li>
                <li><strong>Read Superblock:</strong> Load file system metadata</li>
                <li><strong>Verify:</strong> Check file system integrity</li>
                <li><strong>Integration:</strong> Make file system accessible through mount point</li>
              </ol>

              <div className="example-box">
                <h5>Mounting Example</h5>
                <p><strong>Before Mounting:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`Root File System:
/
├── home/
├── usr/
└── mnt/

USB Drive (/dev/sdb1):
music/
videos/
photos/`}
                </pre>
                <p><strong>Mount Command:</strong> <code>mount /dev/sdb1 /mnt/usb</code></p>
                <p><strong>After Mounting:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`/
├── home/
├── usr/
└── mnt/
    └── usb/
        ├── music/
        ├── videos/
        └── photos/`}
                </pre>
              </div>

              <h4>Mounting Operations:</h4>
              <ul>
                <li><strong>Mount:</strong> Attach file system to directory tree</li>
                <li><strong>Unmount:</strong> Detach file system (must not be in use)</li>
                <li><strong>Remount:</strong> Change mount options without unmounting</li>
                <li><strong>Bind Mount:</strong> Create additional mount points for same file system</li>
              </ul>

              <h4>Mount Options:</h4>
              <ul>
                <li><strong>Read-Only (ro):</strong> Prevent modifications</li>
                <li><strong>Read-Write (rw):</strong> Allow modifications</li>
                <li><strong>No-Execute (noexec):</strong> Prevent execution of binaries</li>
                <li><strong>No-Suid (nosuid):</strong> Ignore setuid/setgid bits</li>
                <li><strong>Sync/Async:</strong> Synchronous or asynchronous I/O</li>
              </ul>

              <h4>Mounting Benefits:</h4>
              <ul>
                <li><strong>Abstraction:</strong> Uniform access to different storage devices</li>
                <li><strong>Flexibility:</strong> Add/remove storage dynamically</li>
                <li><strong>Organization:</strong> Structured access to multiple file systems</li>
                <li><strong>Security:</strong> Control access through mount options</li>
              </ul>

              <h3>File Sharing</h3>
              <p>File sharing allows multiple users or processes to access the same file simultaneously. This requires careful coordination to maintain data consistency and prevent conflicts.</p>

              <h4>File Sharing Models:</h4>
              <ul>
                <li><strong>Client-Server:</strong> Centralized file server (NFS, SMB/CIFS)</li>
                <li><strong>Peer-to-Peer:</strong> Distributed file sharing (BitTorrent)</li>
                <li><strong>Hybrid:</strong> Combination of both approaches</li>
                <li><strong>Cloud-Based:</strong> Internet-hosted file sharing (Dropbox, Google Drive)</li>
              </ul>

              <h4>File Sharing Semantics:</h4>
              <ul>
                <li><strong>UNIX Semantics:</strong> Changes immediately visible to all users</li>
                <li><strong>Session Semantics:</strong> Changes visible only when file is closed</li>
                <li><strong>Immutable Shared Files:</strong> Files cannot be modified once shared</li>
                <li><strong>Transaction Semantics:</strong> All-or-nothing atomic operations</li>
              </ul>

              <h3>File Protection</h3>
              <p>File protection mechanisms ensure that only authorized users can access files and that users cannot damage files they do not own. Protection is essential for multi-user systems.</p>

              <h4>Protection Approaches:</h4>

              <h5>1. Access Control Lists (ACLs):</h5>
              <ul>
                <li>List of users and their permissions for each file</li>
                <li>Flexible but can be large for many users</li>
                <li>Example: User1(read,write), User2(read), User3(execute)</li>
              </ul>

              <h5>2. Capability-Based:</h5>
              <ul>
                <li>Tokens granting specific rights to holders</li>
                <li>Capabilities can be passed between processes</li>
                <li>Difficult to revoke capabilities</li>
              </ul>

              <h5>3. Protection Domains:</h5>
              <ul>
                <li>Sets of access rights for processes</li>
                <li>Processes execute within protection domains</li>
                <li>Domain switching for different privileges</li>
              </ul>

              <h5>4. Groups:</h5>
              <ul>
                <li>Users organized into groups</li>
                <li>Permissions assigned to groups</li>
                <li>Simplifies management for many users</li>
              </ul>

              <h4>Access Rights:</h4>
              <ul>
                <li><strong>Read (r):</strong> View file contents</li>
                <li><strong>Write (w):</strong> Modify file contents</li>
                <li><strong>Execute (x):</strong> Run file as program</li>
                <li><strong>Delete (d):</strong> Remove file</li>
                <li><strong>Append (a):</strong> Add to end of file only</li>
                <li><strong>List (l):</strong> List directory contents</li>
              </ul>

              <div className="example-box">
                <h5>UNIX File Permissions Example</h5>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`File: report.txt
Permissions: -rw-r--r--

Breakdown:
- : Regular file (d for directory)
rw- : Owner can read and write
r-- : Group can read only
r-- : Others can read only

Numeric: 644
6 (rw-) = 4(r) + 2(w) + 0(-)
4 (r--) = 4(r) + 0(-) + 0(-)
4 (r--) = 4(r) + 0(-) + 0(-)`}
                </pre>
              </div>
            </section>

            <div className="video-embed">
              <h4>Directory Structure</h4>
              <p>Understanding directory structures and file system organization.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ibXj-wMGr-g"
                title="Directory Structure"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>File System Mounting</h4>
              <p>Learn about file system mounting and integration.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/psRgiwWmaE0"
                title="File System Mounting"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 2 Quiz" questions={module2Quiz} subject="OS" unitId={5} moduleId={2} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(1)} className="prev-module-btn">← File System Interface</button>
              <button onClick={() => setCurrentModule(3)} className="next-module-btn">Mass Storage Structure →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">5.3</div>
              <div className="lesson-title-main">
                <h1>Mass Storage Structure</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Overview of Mass Storage Structure</h3>
              <p>Mass storage refers to secondary storage devices that provide non-volatile storage for large amounts of data. Understanding the structure and organization of mass storage is crucial for efficient file system design and performance optimization.</p>

              <h4>Storage Hierarchy:</h4>
              <ul>
                <li><strong>Cache Memory:</strong> Fastest, smallest (KB-MB), volatile, most expensive</li>
                <li><strong>Main Memory (RAM):</strong> Fast, moderate size (GB), volatile, expensive</li>
                <li><strong>Magnetic Disks (HDD):</strong> Slower, large (TB), non-volatile, moderate cost</li>
                <li><strong>Solid State Drives (SSD):</strong> Fast, large (TB), non-volatile, moderate cost</li>
                <li><strong>Optical Storage:</strong> Slower, moderate (GB), non-volatile, cheap</li>
                <li><strong>Magnetic Tapes:</strong> Slowest, largest (TB-PB), non-volatile, cheapest</li>
              </ul>

              <h4>Mass Storage Characteristics:</h4>
              <ul>
                <li><strong>Capacity:</strong> Amount of data that can be stored</li>
                <li><strong>Transfer Rate:</strong> Speed of data transfer (MB/s or GB/s)</li>
                <li><strong>Access Time:</strong> Time to locate and retrieve data</li>
                <li><strong>Reliability:</strong> Failure rates and Mean Time To Failure (MTTF)</li>
                <li><strong>Cost per Byte:</strong> Economic consideration</li>
              </ul>

              <h3>Disk Structure</h3>
              <p>Magnetic disks (Hard Disk Drives - HDDs) are the most common form of secondary storage. Understanding their physical structure is essential for efficient data access and disk scheduling algorithms.</p>

              <h4>Physical Disk Structure:</h4>
              <div className="example-box">
                <h5>Disk Components</h5>
                <ul>
                  <li><strong>Platters:</strong> Multiple circular disks stacked together (coated with magnetic material)</li>
                  <li><strong>Tracks:</strong> Concentric circles on each platter surface</li>
                  <li><strong>Sectors:</strong> Arc-shaped divisions of tracks (typically 512 bytes or 4KB)</li>
                  <li><strong>Cylinders:</strong> Same track number across all platters (vertical alignment)</li>
                  <li><strong>Read/Write Heads:</strong> Access data on each platter surface (one per surface)</li>
                  <li><strong>Spindle:</strong> Rotates the entire disk assembly (5400-15000 RPM)</li>
                  <li><strong>Actuator Arm:</strong> Positions heads over tracks</li>
                </ul>
              </div>

              <div className="image-container">
                <img src="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter10/10_01_DiskMechanism.jpg" alt="Disk Structure" />
                <p className="image-caption">Figure 5.2: Physical Disk Structure</p>
              </div>

              <div className="example-box">
                <h5>Disk Capacity Calculation</h5>
                <p><strong>Example: 3-platter disk</strong></p>
                <ul>
                  <li>6 surfaces (top and bottom of each platter)</li>
                  <li>1000 tracks per surface</li>
                  <li>50 sectors per track</li>
                  <li>512 bytes per sector</li>
                </ul>
                <p><strong>Calculation:</strong></p>
                <p>Capacity per surface = 1000 × 50 × 512 = 25,600,000 bytes = 25.6 MB</p>
                <p>Total capacity = 6 × 25.6 MB = 153.6 MB</p>
              </div>

              <h4>Disk Performance Parameters:</h4>

              <h5>1. Seek Time:</h5>
              <ul>
                <li><strong>Definition:</strong> Time to position read/write head over desired track</li>
                <li><strong>Components:</strong> Startup time + travel time</li>
                <li><strong>Typical Values:</strong> 3-15 milliseconds</li>
                <li><strong>Impact:</strong> Major component of access time</li>
              </ul>

              <h5>2. Rotational Latency:</h5>
              <ul>
                <li><strong>Definition:</strong> Time for desired sector to rotate under head</li>
                <li><strong>Average:</strong> Half rotation time</li>
                <li><strong>Calculation:</strong> (60 seconds / RPM) / 2</li>
                <li><strong>Example:</strong> 7200 RPM → (60/7200)/2 = 4.17 ms</li>
              </ul>

              <h5>3. Transfer Time:</h5>
              <ul>
                <li><strong>Definition:</strong> Time to read/write data</li>
                <li><strong>Calculation:</strong> (Bytes to transfer) / (Transfer rate)</li>
                <li><strong>Typical Rate:</strong> 50-200 MB/s for HDDs</li>
              </ul>

              <h5>4. Average Access Time:</h5>
              <p><strong>Formula:</strong> Access Time = Seek Time + Rotational Latency + Transfer Time</p>

              <div className="example-box">
                <h5>Access Time Calculation</h5>
                <p><strong>Given:</strong></p>
                <ul>
                  <li>Average seek time = 8 ms</li>
                  <li>Rotational speed = 7200 RPM</li>
                  <li>Transfer rate = 100 MB/s</li>
                  <li>Data to read = 4 KB</li>
                </ul>
                <p><strong>Calculation:</strong></p>
                <ul>
                  <li>Seek time = 8 ms</li>
                  <li>Rotational latency = (60/7200)/2 = 4.17 ms</li>
                  <li>Transfer time = (4 KB / 100 MB/s) = 0.04 ms</li>
                  <li><strong>Total = 8 + 4.17 + 0.04 = 12.21 ms</strong></li>
                </ul>
              </div>

              <h4>Disk Scheduling Impact:</h4>
              <ul>
                <li><strong>Head Movement:</strong> Minimize seek time (most significant)</li>
                <li><strong>Request Ordering:</strong> Optimize sequence to reduce total movement</li>
                <li><strong>Throughput:</strong> Maximize requests serviced per unit time</li>
                <li><strong>Fairness:</strong> Prevent starvation of requests</li>
              </ul>

              <h3>Disk Attachment</h3>
              <p>Disk attachment refers to the methods by which storage devices are connected to and communicate with computer systems.</p>

              <h4>Attachment Types:</h4>

              <h5>1. Host-Attached Storage:</h5>
              <ul>
                <li>Direct connection to host computer</li>
                <li>Examples: Internal HDDs, SSDs</li>
                <li>Fast access, dedicated to single host</li>
              </ul>

              <h5>2. Network-Attached Storage (NAS):</h5>
              <ul>
                <li>Connected via network (Ethernet)</li>
                <li>File-level access</li>
                <li>Shared among multiple clients</li>
                <li>Examples: NFS, SMB/CIFS</li>
              </ul>

              <h5>3. Storage Area Network (SAN):</h5>
              <ul>
                <li>Dedicated high-speed network for storage</li>
                <li>Block-level access</li>
                <li>High performance, scalable</li>
                <li>Examples: Fibre Channel, iSCSI</li>
              </ul>

              <h4>Interface Standards:</h4>
              <ul>
                <li><strong>SATA (Serial ATA):</strong> Consumer devices, 6 Gb/s</li>
                <li><strong>SAS (Serial Attached SCSI):</strong> Enterprise, 12 Gb/s</li>
                <li><strong>SCSI:</strong> Small Computer System Interface, legacy</li>
                <li><strong>NVMe:</strong> Non-Volatile Memory Express, for SSDs, very fast</li>
                <li><strong>Fibre Channel:</strong> High-speed networking, 16-128 Gb/s</li>
                <li><strong>USB:</strong> Universal Serial Bus, external devices</li>
              </ul>

              <h4>Solid State Drives (SSDs):</h4>
              <p>Modern alternative to HDDs with different characteristics:</p>
              <ul>
                <li><strong>No Moving Parts:</strong> Flash memory based</li>
                <li><strong>Fast Access:</strong> No seek time or rotational latency</li>
                <li><strong>Random Access:</strong> Uniform access time</li>
                <li><strong>Wear Leveling:</strong> Limited write cycles per cell</li>
                <li><strong>TRIM Command:</strong> Helps maintain performance</li>
                <li><strong>Different Scheduling:</strong> Traditional algorithms not optimal</li>
              </ul>
            </section>

            <div className="video-embed">
              <h4>Mass Storage Structure</h4>
              <p>Understanding mass storage hierarchy and disk structure.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wtdnatmVdIg"
                title="Mass Storage Structure"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Disk Structure and Performance</h4>
              <p>Learn about disk components and performance parameters.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/oEORcCQ62nQ"
                title="Disk Structure and Performance"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 3 Quiz" questions={module3Quiz} subject="OS" unitId={5} moduleId={3} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(2)} className="prev-module-btn">← Directory Structure & Mounting</button>
              <button onClick={() => setCurrentModule(4)} className="next-module-btn">Disk Scheduling Algorithms →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="module-content">
            <div className="lesson-header">
              <div className="lesson-number-badge">5.4</div>
              <div className="lesson-title-main">
                <h1>Disk Scheduling Algorithms</h1>
              </div>
            </div>
            
            <section className="content-section">
              <h3>Disk Scheduling</h3>
              <p>Disk scheduling algorithms determine the order in which disk I/O requests are serviced. The goal is to minimize seek time, maximize throughput, and ensure fairness among requests.</p>

              <h4>Scheduling Goals:</h4>
              <ul>
                <li><strong>Minimize Seek Time:</strong> Reduce head movement distance</li>
                <li><strong>Maximize Throughput:</strong> Service more requests per unit time</li>
                <li><strong>Minimize Response Time:</strong> Reduce waiting time for requests</li>
                <li><strong>Minimize Variance:</strong> Provide predictable response times</li>
                <li><strong>Prevent Starvation:</strong> Ensure all requests are eventually served</li>
              </ul>

              <h4>Factors Affecting Scheduling:</h4>
              <ul>
                <li><strong>Current Head Position:</strong> Starting location of read/write head</li>
                <li><strong>Request Queue:</strong> Pending I/O requests</li>
                <li><strong>Direction of Movement:</strong> Previous head motion direction</li>
                <li><strong>Request Distribution:</strong> Spatial distribution of requests</li>
              </ul>

              <h3>1. FCFS (First-Come, First-Served)</h3>
              <p>The simplest disk scheduling algorithm. Processes requests in the order they arrive in the queue, without considering their location on the disk.</p>

              <div className="example-box">
                <h5>FCFS Example</h5>
                <p><strong>Initial head position:</strong> 50</p>
                <p><strong>Request queue:</strong> 98, 183, 37, 122, 14, 124, 65, 67</p>
                <p><strong>Disk size:</strong> 0-199 cylinders</p>
                <p><strong>Sequence of access:</strong></p>
                <p>50 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67</p>
                <p><strong>Head movements:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`|50-98| + |98-183| + |183-37| + |37-122| + 
|122-14| + |14-124| + |124-65| + |65-67|
= 48 + 85 + 146 + 85 + 108 + 110 + 59 + 2
= 643 cylinders`}
                </pre>
                <p><strong>Total head movements: 643 cylinders</strong></p>
              </div>

              <h4>FCFS Advantages:</h4>
              <ul>
                <li><strong>Fairness:</strong> First-come, first-served basis</li>
                <li><strong>Simplicity:</strong> Easy to implement (just a queue)</li>
                <li><strong>No Starvation:</strong> All requests eventually served</li>
                <li><strong>Predictability:</strong> Deterministic behavior</li>
              </ul>

              <h4>FCFS Disadvantages:</h4>
              <ul>
                <li><strong>Poor Performance:</strong> Does not optimize seek time</li>
                <li><strong>Convoy Effect:</strong> Short requests wait behind long ones</li>
                <li><strong>High Average Time:</strong> Suboptimal for many requests</li>
                <li><strong>No Optimization:</strong> Ignores physical disk layout</li>
                <li><strong>Wild Swings:</strong> Head may move back and forth across disk</li>
              </ul>

              <h3>2. SSTF (Shortest Seek Time First)</h3>
              <p>Greedy algorithm that selects the request requiring minimum seek time from the current head position. Always chooses the closest request to service next.</p>

              <div className="example-box">
                <h5>SSTF Example</h5>
                <p><strong>Initial head position:</strong> 50</p>
                <p><strong>Request queue:</strong> 98, 183, 37, 122, 14, 124, 65, 67</p>
                <p><strong>Step-by-step selection:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem'}}>
{`Current: 50 → Closest: 65 (distance 15)
Current: 65 → Closest: 67 (distance 2)
Current: 67 → Closest: 37 (distance 30)
Current: 37 → Closest: 14 (distance 23)
Current: 14 → Closest: 98 (distance 84)
Current: 98 → Closest: 122 (distance 24)
Current: 122 → Closest: 124 (distance 2)
Current: 124 → Closest: 183 (distance 59)`}
                </pre>
                <p><strong>Sequence:</strong> 50 → 65 → 67 → 37 → 14 → 98 → 122 → 124 → 183</p>
                <p><strong>Head movements:</strong> 15 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 239 cylinders</p>
                <p><strong>Total: 239 cylinders (63% better than FCFS!)</strong></p>
              </div>

              <h4>SSTF Advantages:</h4>
              <ul>
                <li><strong>Better Performance:</strong> Significantly better than FCFS</li>
                <li><strong>Greedy Approach:</strong> Locally optimal choices</li>
                <li><strong>Reduced Average Time:</strong> Lower average seek time</li>
                <li><strong>Simple Logic:</strong> Easy to understand</li>
              </ul>

              <h4>SSTF Disadvantages:</h4>
              <ul>
                <li><strong>Potential Starvation:</strong> Requests far from head may wait indefinitely</li>
                <li><strong>Not Globally Optimal:</strong> Greedy may not be best overall</li>
                <li><strong>Direction Changes:</strong> Head may move back and forth</li>
                <li><strong>Unfairness:</strong> Some requests wait much longer</li>
              </ul>

              <h3>3. SCAN (Elevator Algorithm)</h3>
              <p>The disk arm moves in one direction, servicing all requests until it reaches the end of the disk, then reverses direction and repeats. Similar to an elevator moving up and down.</p>

              <div className="example-box">
                <h5>SCAN Example</h5>
                <p><strong>Initial head position:</strong> 50, moving toward larger cylinders</p>
                <p><strong>Request queue:</strong> 98, 183, 37, 122, 14, 124, 65, 67</p>
                <p><strong>Disk size:</strong> 0-199</p>
                <p><strong>Sorted requests in scan direction (→):</strong> 65, 67, 98, 122, 124, 183</p>
                <p><strong>Sorted requests in reverse direction (←):</strong> 37, 14</p>
                <p><strong>Sequence:</strong></p>
                <p>50 → 65 → 67 → 98 → 122 → 124 → 183 → 199 (end) → 37 → 14</p>
                <p><strong>Head movements:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`15 + 2 + 31 + 24 + 2 + 59 + 16 + 162 + 23
= 334 cylinders`}
                </pre>
                <p><strong>Total: 334 cylinders</strong></p>
              </div>

              <h4>SCAN Advantages:</h4>
              <ul>
                <li><strong>Better Performance:</strong> Better than FCFS</li>
                <li><strong>No Starvation:</strong> All requests eventually served</li>
                <li><strong>Stable Performance:</strong> Consistent behavior</li>
                <li><strong>Fairness:</strong> More fair than SSTF</li>
              </ul>

              <h4>SCAN Disadvantages:</h4>
              <ul>
                <li><strong>Midpoint Preference:</strong> Requests near middle serviced more frequently</li>
                <li><strong>End-to-End Travel:</strong> May move to extreme positions unnecessarily</li>
                <li><strong>Unequal Waiting:</strong> Some requests wait longer</li>
                <li><strong>Direction Dependency:</strong> Performance varies by initial direction</li>
              </ul>

              <h3>4. CSCAN (Circular SCAN)</h3>
              <p>Moves the disk arm in one direction, servicing requests until it reaches the end, then immediately returns to the beginning without servicing requests on the return trip. Provides more uniform wait times.</p>

              <div className="example-box">
                <h5>CSCAN Example</h5>
                <p><strong>Initial head position:</strong> 50, moving toward larger cylinders</p>
                <p><strong>Request queue:</strong> 98, 183, 37, 122, 14, 124, 65, 67</p>
                <p><strong>Disk size:</strong> 0-199</p>
                <p><strong>Sorted requests:</strong> 14, 37, 65, 67, 98, 122, 124, 183</p>
                <p><strong>Sequence:</strong></p>
                <p>50 → 65 → 67 → 98 → 122 → 124 → 183 → 199 (end) → 0 (jump) → 14 → 37</p>
                <p><strong>Head movements:</strong></p>
                <pre style={{background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto'}}>
{`15 + 2 + 31 + 24 + 2 + 59 + 16 + 199 + 14 + 23
= 385 cylinders`}
                </pre>
                <p><strong>Total: 385 cylinders</strong></p>
              </div>

              <h4>CSCAN Advantages:</h4>
              <ul>
                <li><strong>Uniform Service:</strong> More uniform wait times</li>
                <li><strong>Predictable Performance:</strong> Consistent behavior</li>
                <li><strong>No Starvation:</strong> All requests eventually served</li>
                <li><strong>Fair Distribution:</strong> Treats all cylinders more equally</li>
              </ul>

              <h4>CSCAN Disadvantages:</h4>
              <ul>
                <li><strong>Jump Overhead:</strong> Large jump from end to beginning</li>
                <li><strong>Less Optimal:</strong> May not be as efficient as SCAN</li>
                <li><strong>Directional Bias:</strong> Always moves in same logical direction</li>
                <li><strong>Wasted Movement:</strong> Return trip services no requests</li>
              </ul>

              <h3>Algorithm Comparison</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Algorithm</th>
                      <th>Total Movement (Example)</th>
                      <th>Fairness</th>
                      <th>Starvation</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FCFS</td>
                      <td>643 cylinders</td>
                      <td>Fair</td>
                      <td>No</td>
                      <td>Simple</td>
                    </tr>
                    <tr>
                      <td>SSTF</td>
                      <td>239 cylinders</td>
                      <td>Unfair</td>
                      <td>Possible</td>
                      <td>Moderate</td>
                    </tr>
                    <tr>
                      <td>SCAN</td>
                      <td>334 cylinders</td>
                      <td>Fair</td>
                      <td>No</td>
                      <td>Moderate</td>
                    </tr>
                    <tr>
                      <td>CSCAN</td>
                      <td>385 cylinders</td>
                      <td>Mostly fair</td>
                      <td>No</td>
                      <td>Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>Algorithm Selection Criteria:</h4>
              <ul>
                <li><strong>Performance:</strong> SSTF best, FCFS worst</li>
                <li><strong>Fairness:</strong> SCAN/CSCAN better than SSTF</li>
                <li><strong>Starvation Prevention:</strong> FCFS, SCAN, CSCAN guarantee service</li>
                <li><strong>Implementation:</strong> FCFS simplest, others more complex</li>
                <li><strong>Workload:</strong> Choice depends on request patterns</li>
              </ul>

              <h4>Modern Considerations:</h4>
              <ul>
                <li><strong>SSD Storage:</strong> No mechanical movement, different scheduling needs</li>
                <li><strong>RAID Arrays:</strong> Multiple disk coordination required</li>
                <li><strong>NCQ (Native Command Queuing):</strong> Hardware-level optimization</li>
                <li><strong>TRIM Command:</strong> For SSD wear leveling and performance</li>
                <li><strong>I/O Schedulers:</strong> Linux uses CFQ, Deadline, or NOOP</li>
              </ul>

              <div className="example-box">
                <h5>Real-World Application</h5>
                <p>Modern operating systems often use variations or combinations:</p>
                <ul>
                  <li><strong>Linux:</strong> CFQ (Completely Fair Queuing), Deadline scheduler</li>
                  <li><strong>Windows:</strong> Anticipatory scheduling</li>
                  <li><strong>SSDs:</strong> Simple FIFO or NOOP (no optimization needed)</li>
                  <li><strong>Enterprise:</strong> Often use SCAN variants for fairness</li>
                </ul>
              </div>
            </section>

            <div className="video-embed">
              <h4>Operating System Playlist</h4>
              <p>Comprehensive playlist covering operating system concepts.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed?listType=playlist&list=PLRNkaOMDE7cjCqDc5XWgYosTiITLLpVsC"
                title="Operating System Playlist"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-embed">
              <h4>Disk Scheduling Examples</h4>
              <p>Step-by-step examples and calculations for disk scheduling algorithms.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/okmXOmtfkaI"
                title="Disk Scheduling Examples"
                allowFullScreen
              ></iframe>
            </div>

            <Quiz title="Module 4 Quiz" questions={module4Quiz} subject="OS" unitId={5} moduleId={4} />

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(3)} className="prev-module-btn">← Mass Storage Structure</button>
              <button onClick={() => setCurrentModule(5)} className="next-module-btn">Unit 5 Comprehensive Quiz →</button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="module-content">
            <h2>Unit 5 Comprehensive Quiz</h2>
            
            <section className="content-section">
              <p>Test your understanding of all concepts covered in Unit 5: File System Interface and Mass Storage.</p>
              <p>This quiz covers:</p>
              <ul>
                <li>File System Interface (Files, Attributes, Access Methods)</li>
                <li>Directory Structure and File System Mounting</li>
                <li>File Sharing and Protection</li>
                <li>Mass Storage Structure and Disk Organization</li>
                <li>Disk Scheduling Algorithms (FCFS, SSTF, SCAN, CSCAN)</li>
              </ul>
            </section>

            <Quiz title="Unit 5 Comprehensive Quiz" questions={unit5Quiz} subject="OS" unitId={5} moduleId={5} />

            <div className="reference-section">
              <h3>Reference Materials</h3>
              <ul>
                <li><a href="https://www.geeksforgeeks.org/file-systems-in-operating-system/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - File Systems</a></li>
                <li><a href="https://www.tutorialspoint.com/operating_system/os_file_system.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint - File System</a></li>
                <li><a href="https://www.geeksforgeeks.org/disk-scheduling-algorithms/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - Disk Scheduling</a></li>
                <li><a href="https://www.javatpoint.com/os-disk-scheduling" target="_blank" rel="noopener noreferrer">JavaTpoint - Disk Scheduling</a></li>
                <li><a href="https://nptel.ac.in/courses/106/106/106106144/" target="_blank" rel="noopener noreferrer">NPTEL - Operating Systems</a></li>
              </ul>
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentModule(4)} className="prev-module-btn">← Disk Scheduling Algorithms</button>
            </div>
          </div>
        );

      default:
        return <div>Module content loading...</div>;
    }
  };

  return <div className="unit-container">{renderModule()}</div>;
};

export default Unit5;

