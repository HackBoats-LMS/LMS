# 📚 How to Add a New Subject

This guide explains how to add a new subject to the Student Dashboard and tracking system. The system has been refactored to be **configuration-driven**, meaning you only need to update a central configuration object.

## 🚀 Quick Steps

To add a new subject (e.g., "Data Structures"), follow these steps:

### 1. Open the Dashboard File
Navigate to:
`app/pages/studentDashboard/page.tsx`

### 2. Update `SUBJECT_CONFIG`
Locate the `SUBJECT_CONFIG` constant near the top of the component (around line ~55). Add your new subject object to the list.

**Example Structure:**

```typescript
const SUBJECT_CONFIG = {
    // ... existing subjects (fswd, os) ...

    'ds': {  // <--- Unique Key (lowercase, no spaces)
        name: 'DS',                 // Short name (displayed in charts)
        title: 'Data Structures',   // Full title (displayed in card footer)
        units: {                    // Define structure: Unit ID -> Number of Modules
            1: 8, 
            2: 10,
            3: 6 
        }, 
        baseColor: 'orange',        // Theme base color name
        color: 'text-orange-600',   // Text color class
        bg: 'bg-orange-50',         // Background tint
        border: 'border-orange-100',// Border color
        progressColor: 'bg-orange-500', // Progress bar fill
        stroke: '#ea580c'           // Hex code for charts (Tailwind orange-600)
    }
};
```

---

## 🎨 Styling Reference

For consistent aesthetics, use standard Tailwind color palettes. Here are recommendations for common subjects:

| Subject Theme | Text Class | BG Class | Border Class | Progress Class | Hex Stroke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Blue** | `text-blue-600` | `bg-blue-50` | `border-blue-100` | `bg-blue-500` | `#2563eb` |
| **Green** | `text-green-600` | `bg-green-50` | `border-green-100` | `bg-green-500` | `#16a34a` |
| **Red** | `text-red-600` | `bg-red-50` | `border-red-100` | `bg-red-500` | `#dc2626` |
| **Yellow** | `text-yellow-600` | `bg-yellow-50` | `border-yellow-100` | `bg-yellow-500` | `#ca8a04` |

---

## 🔄 What Happens Automatically?

Once you add the config entry, the system creates:

1.  **Donut Chart Entry**: A new slide in the "Course Statistics" widget.
2.  **Avg Score Card**: A new slide in the "Average Score" widget.
3.  **Total Calculations**:
    *   The "Lessons Completed" total is automatically updated (sum of all modules).
    *   The "Units Completed" total is updated.
    *   The "Quizzes Completed" total is updated.
4.  **Progress Tracking**:
    *   Any progress data saved with `subject: 'ds'` (matching your key) will automatically be tracked and calculated towards this subject's completion.

## 📝 Naming Convention Note

    *   *Example*: If key is `'ds'`, valid DB subjects include `'Data Structures'`, `'DS - Trees'`, `'Intro to dS'`.

---

## ⚙️ Backend & Database Behavior

### 1. Database Storage (Automatic)
You do **NOT** need to update any backend code or database schema.
*   The `progress` table stores the subject string exactly as sent by the frontend component.
*   The API (`/api/progress`) does strict validation of the *structure* of the data, but it tolerates **new subject names** automatically.

### 2. Module Titles (Optional but Recommended)
By default, a new subject's modules will be labelled generically (e.g., "Unit 1 - Module 1") in the database.

To provide specific titles (e.g., "Linked Lists", "Arrays"):
1.  Open `lib/moduleNames.ts`.
2.  Add your subject key to the `MODULE_NAMES` object.

```typescript
// lib/moduleNames.ts
export const MODULE_NAMES = {
  // ...
  DS: {  // <-- Add this block
    1: {
      1: "Introduction to Arrays",
      2: "Linked Lists Basics"
    }
  }
};
```
*Note: This step is purely cosmetic. The system works fully without it.*
