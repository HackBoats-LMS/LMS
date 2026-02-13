# 🎨 Student Dashboard Color Palette

This document lists all the colors used in the **Student Dashboard** implementation (`studentDashboard/page.tsx`). Refer to this when adding new widgets, subjects, or styling components to maintain visual consistency.

## 🏛️ Layout & Structural Colors

| Usage | Class / Hex | Description |
| :--- | :--- | :--- |
| **Main Background** | `bg-[#FFF8F8]` | Very pale pink/off-white, used for the main screen background. |
| **Widgets/Cards** | `bg-white` | Standard card background. |
| **Sidebar Border** | `border-gray-100` | Light divider for the sidebar. |
| **Active Nav Item** | `bg-[#FFF0F0]` | Light red tint for the active sidebar link. |
| **Active Nav Text** | `text-[#FF5B5B]` | Primary brand red for active navigation text. |

## 📊 Subject & Statistics Themes

### 1. FSWD (Full Stack Web Dev)
*   **Theme**: Cyan / Teal
*   **Text**: `text-cyan-600`
*   **Background**: `bg-cyan-50`
*   **Border**: `border-cyan-100`
*   **Progress Bar**: `bg-cyan-500`
*   **Chart Stroke**: `#0891b2`

### 2. OS (Operating Systems)
*   **Theme**: Purple
*   **Text**: `text-purple-600`
*   **Background**: `bg-purple-50`
*   **Border**: `border-purple-100`
*   **Progress Bar**: `bg-purple-500`
*   **Chart Stroke**: `#9333ea`

### 3. General Stats (Cards)
| Category | Theme | Classes (Text / BG / Border / Progress) |
| :--- | :--- | :--- |
| **Hours Spent** | Purple | `text-purple-600` / `bg-purple-50` / `border-purple-100` / `bg-purple-500` |
| **Units Completed** | Yellow | `text-yellow-600` / `bg-yellow-50` / `border-yellow-100` / `bg-yellow-500` |
| **Lessons Completed** | Green | `text-green-600` / `bg-green-50` / `border-green-100` / `bg-green-500` |
| **Quizzes Completed** | Rose | `text-rose-600` / `bg-rose-50` / `border-rose-100` / `bg-rose-500` |

## 📅 Calendar Colors
*   **Selected Date**: `bg-[#FFDE85]` (Soft Yellow)
*   **Today (Highlight)**: `text-red-500` (implied in logic)
*   **Schedule Chip**: `bg-gray-100`

## 📝 Text Hierarchy
*   **Headings**: `text-gray-900`, `text-gray-800`
*   **Body Text**: `text-gray-700`
*   **Subtitles/Metadata**: `text-gray-500`, `text-gray-400`
*   **Brand Highlight**: `text-[#FF5B5B]`

## 🧩 Special Widgets

### Active Tasks
*   **Container BG**: `bg-[#F2F6FF]` (Light Blue Tint)
*   **Status: Upcoming/In Progress**:
    *   Text: `text-blue-600`
    *   BG: `bg-blue-50`
*   **Time Remaining**:
    *   Text: `text-red-500`
    *   BG: `bg-red-50`

### Course Statistics (Donut Chart)
*   **Container BG**: `bg-[#FFF8E5]` (Light Yellow Tint)
*   **Border**: `border-yellow-100/50`

## 🗓️ Event Type Categories

These colors are used in the **Events Page** and related widgets for categorization tags.

| Type | Theme | BG Class | Text Class |
| :--- | :--- | :--- | :--- |
| **Announcement** | Blue | `bg-blue-100` | `text-blue-700` |
| **Event** | Purple | `bg-purple-100` | `text-purple-700` |
| **Workshop** | Orange | `bg-orange-100` | `text-orange-700` |
| **Webinar** | Red | `bg-red-100` | `text-red-700` |
| **Competition** | Yellow | `bg-yellow-100` | `text-yellow-700` |
| **Holiday** | Green | `bg-green-100` | `text-green-700` |
