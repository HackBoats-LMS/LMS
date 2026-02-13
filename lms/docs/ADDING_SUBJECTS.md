# How to Add New Subjects to the Dashboard

This guide explains how to add new subjects (like CN, DSA, DBMS, etc.) to your LMS so they appear in both the **Student Dashboard** and the **Admin Dashboard's Average Performance Widget**.

## 1. Update the Admin Dashboard
The Admin Dashboard uses a configuration object to decide which subjects to calculate averages for.

1.  Open `app/pages/adminDashboard/page.tsx`.
2.  Locate the `SUBJECT_CONFIG` constant (around line 58).
3.  Add a new entry for your subject. The **key** (e.g., `'cn'`) must match the `subject` name stored in your database (case-insensitive).

```typescript
// app/pages/adminDashboard/page.tsx

const SUBJECT_CONFIG: { [key: string]: any } = {
    'fswd': { ... },
    'os': { ... },
    
    // Add your new subject here:
    'cn': {
        name: 'CN',                 // Short display name
        title: 'Computer Networks',   // Full title
        color: 'text-indigo-600',     // Text color class
        bg: 'bg-indigo-50',           // Background color class
        border: 'border-indigo-100',  // Border color class
        stroke: '#6366f1'             // Hex color for the circular progress bar
    },
    'dsa': {
        name: 'DSA',
        title: 'Data Structures',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        stroke: '#f97316'
    }
};
```

### Color Reference
You can use standard Tailwind CSS colors. Common pairings:
-   **Blue**: `text-blue-600`, `bg-blue-50`, `border-blue-100`, `#2563eb`
-   **Green**: `text-green-600`, `bg-green-50`, `border-green-100`, `#16a34a`
-   **Red**: `text-red-600`, `bg-red-50`, `border-red-100`, `#dc2626`
-   **Yellow**: `text-yellow-600`, `bg-yellow-50`, `border-yellow-100`, `#ca8a04`

---

## 2. Update the Student Dashboard (Optional but Recommended)
If you want the subject to appear as a card for students as well, update the configuration in the student dashboard.

1.  Open `app/pages/studentDashboard/page.tsx`.
2.  Locate its `SUBJECT_CONFIG` (around line 55).
3.  Add the same key. Note that the student dashboard might require extra fields like `units` count.

```typescript
// app/pages/studentDashboard/page.tsx

'cn': {
    name: 'CN',
    title: 'Computer Networks',
    units: { 1: 5, 2: 5 }, // Define units and module counts if needed for progress tracking
    baseColor: 'indigo',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    progressColor: 'bg-indigo-500',
    stroke: '#6366f1'
}
```

---

## 3. How Data is Calculated
The Admin Dashboard widget automatically calculates averages based on the **Progress** data stored in your database.

-   **Data Source**: The widget fetches all progress records from `/api/progress?all=true`.
-   **Matching Logic**: It filters these records where `record.subject.toLowerCase() === configKey`.
    -   *Example*: If you have a database record with `subject: "CN"`, the widget will find it if you added the `'cn'` key in `SUBJECT_CONFIG`.
-   **Calculation**:
    -   It sums the `score` of all matching records.
    -   It divides by the total number of records to get the **Average Score**.
    -   It counts unique `userEmail`s to calculate **Active Students**.

### No Data Showing?
If you added the subject configuration but see "0% Average" or "No data available":
1.  Ensure students have actually taken quizzes/modules for that subject.
2.  Check the `subject` name in your database (supabase/progress table) matches the key you added (e.g., 'cn').
3.  Ensure the API `/api/progress?all=true` is returning data (you can check this in the browser network tab or by visiting the URL directly if you are an admin).
