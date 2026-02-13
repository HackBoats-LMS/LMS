export const MODULE_NAMES: { [subject: string]: { [unitId: number]: { [moduleId: number]: string } } } = {
  DS: {
    1: {
      1: "Arrays",
      2: "Sparse Matrices",
      3: "Stack Operations",
      4: "Queue Operations",
      5: "Practical Experiments"
    },
    2: {
      1: "Singly Linked List",
      2: "Doubly Linked List",
      3: "Circular Linked List",
      4: "Applications",
      5: "Practice Problems"
    },
    3: {
      1: "Binary Trees",
      2: "Binary Search Trees",
      3: "AVL Trees",
      4: "Tree Traversals",
      5: "Applications"
    },
    4: {
      1: "Graph Representation",
      2: "Graph Traversal",
      3: "Shortest Path",
      4: "Minimum Spanning Tree",
      5: "Applications"
    },
    5: {
      1: "Searching Techniques",
      2: "Basic Sorting Algorithms",
      3: "Divide and Conquer Sorting",
      4: "Quick Sort Implementation",
      5: "Data Structures Assessment"
    }
  },
  ES: {
    1: {
      1: "Introduction to Environmental Science",
      2: "Ecosystems and Biodiversity",
      3: "Natural Resources",
      4: "Environmental Ethics",
      5: "Unit 1 Quiz"
    },
    2: {
      1: "Renewable and Non-Renewable Energy Resources",
      2: "Forest Resources: Use and Over-exploitation",
      3: "Water Resources Management",
      4: "Mineral Resources and Environmental Effects",
      5: "Unit 2 Quiz"
    },
    3: {
      1: "Definition: Genetic, Species and Ecosystem Diversity",
      2: "Value of Biodiversity",
      3: "Biodiversity at Global, National and Local Levels",
      4: "Threats to Biodiversity",
      5: "Unit 3 Quiz"
    },
    4: {
      1: "Air Pollution: Definition, Causes, Effects and Control",
      2: "Water Pollution: Definition, Causes, Effects and Control",
      3: "Soil Pollution and Noise Pollution",
      4: "Nuclear Hazards and Solid Waste Management",
      5: "Unit 4 Quiz"
    },
    5: {
      1: "Population Growth and Population Explosion",
      2: "Women Empowerment and Population Control",
      3: "Environmental Issues: Global Warming, Acid Rain, Ozone Depletion",
      4: "Role of Information Technology in Environment and Human Health",
      5: "Unit 5 Quiz"
    }
  },
  NSS: {
    1: {
      1: "Career Orientation & Future Planning",
      2: "Ice Breaking & Personal Skills",
      3: "Success Stories & Motivation",
      4: "Talent Show Activities",
      5: "Environmental Literature"
    },
    2: {
      1: "Best Out of Waste Competition",
      2: "Poster Making Competition",
      3: "Recycling & Environmental Pollution",
      4: "Rainwater Harvesting Management",
      5: "Eco-Friendly Product Management"
    },
    3: {
      1: "One Day Special Camp in Village",
      2: "Village Survey & Problem Identification",
      3: "Health Awareness Programs",
      4: "Consumer Awareness Programs",
      5: "Collaboration with NGOs & Charities"
    },
    4: {
      1: "Eco-Friendly Approaches",
      2: "Vehicle Maintenance Workshops",
      3: "Safety Campaign Projects",
      4: "Go Green Activities",
      5: "Clean Campus Program"
    },
    5: {
      1: "Digital Environmental Awareness",
      2: "Organizing Zero-Waste Day",
      3: "Women Empowerment Programs",
      4: "Internet Safety & Cyber Wellness",
      5: "Digital Citizenship Activities"
    }
  },
  OS: {
    1: {
      1: "Overview of Operating Systems",
      2: "OS Types and Generation",
      3: "OS Operations & Security",
      4: "System Calls & Structures",
      5: "Unit 1 Quiz"
    },
    2: {
      1: "Process Concepts",
      2: "Process Scheduling",
      3: "Scheduling Algorithms",
      4: "Multithreading & IPC",
      5: "Unit 2 Quiz"
    },
    3: {
      1: "Concurrency Principles",
      2: "Process Synchronization",
      3: "Deadlock Principles",
      4: "Deadlock Handling",
      5: "Unit 3 Quiz"
    },
    4: {
      1: "Memory Allocation",
      2: "Paging & Segmentation",
      3: "Virtual Memory",
      4: "Page Replacement",
      5: "Unit 4 Quiz"
    },
    5: {
      1: "File System Interface",
      2: "Directory Structure",
      3: "Mass Storage Structure",
      4: "Disk Scheduling",
      5: "Unit 5 Quiz"
    }
  },
  LS: {
    1: {
      1: "Overview of Linguistics and its Sub-fields",
      2: "Phonetics",
      3: "Phonology",
      4: "Morphology",
      5: "Unit 1 Quiz"
    },
    2: {
      1: "Syntax and Syntactic Structures",
      2: "Semantics and Semantic Structures",
      3: "Language Typology",
      4: "Unit 2 Quiz"
    },
    3: {
      1: "First and Second Language Acquisition",
      2: "Language Change and Language Contact",
      3: "Historical Linguistics",
      4: "Unit 3 Quiz"
    },
    4: {
      1: "Sociolinguistics and Language Variation",
      2: "Language Policy and Planning",
      3: "Language and Identity",
      4: "Language and Technology",
      5: "Unit 4 Quiz"
    },
    5: {
      1: "Language and Culture",
      2: "Language and Gender",
      3: "Language and Power",
      4: "Language and Globalization",
      5: "Unit 5 Quiz"
    }
  },
  FSWD: {
    1: {
      1: "Setting up React with Vite - Introduction",
      2: "Setting up React with Vite - Deep-dive #1",
      3: "Setting up React with Vite - Deep-dive #2",
      4: "Practice Assignment #1",
      5: "Practice Assignment #2",
      6: "Follow-along Milestone #15",
      7: "Follow-along Milestone #16",
      8: "ASAP Project - Setup",
      9: "Knowledge Review #5"
    },
    2: {
      1: "Deploying Frontend - Introduction",
      2: "Deploying Frontend - Deep-dive #1 (Vercel)",
      3: "Deploying Frontend - Deep-dive #2 (Netlify)",
      4: "Practice Assignment #1",
      5: "Practice Assignment #2",
      6: "Follow-along Milestone #17",
      7: "Follow-along Milestone #18",
      8: "ASAP Project - Deploy",
      9: "Knowledge Review #6"
    }
  }
};

export function getModuleName(subject: string, unitId: number, moduleId: number): string {
  return MODULE_NAMES[subject]?.[unitId]?.[moduleId] || `Unit ${unitId} - Module ${moduleId}`;
}
