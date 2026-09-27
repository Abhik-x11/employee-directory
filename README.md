# 🌾 GreenHarvest Farm - Employee Directory System

**Assignment 3: Employee Directory using State and Events**  
Built with **React**, **Vite**, and **Vanilla CSS**.

---

## 📌 Project Overview

This application maintains employee data for a modern agricultural farm. Each worker profile tracks all required attributes:
- **Full Name**
- **Employee ID** (e.g. `GHF-0101`)
- **Department Name** (e.g. `Crop Production & Harvesting`, `Livestock & Dairy Operations`, `Greenhouse & Hydroponics`, etc.)
- **Gender** (`Male`, `Female`, `Other`)
- **Phone Number**
- **Local Address** (Farm quarters / current address)
- **Permanent Address** (Native / hometown address)

---

## ✨ Features Implemented

1. **Add Employee**:
   - Interactive modal with form validation for all 7 required fields.
   - Quick "Auto-generate ID" button for convenience.
   - "Same as Local Address" checkbox that syncs permanent address automatically.

2. **Delete Employee**:
   - Safe deletion with a custom confirmation modal highlighting employee name and ID.
   - Dynamically updates employee counts upon removal.

3. **Edit Employee Details**:
   - Opens modal pre-filled with the selected employee's current information.
   - Updates state seamlessly and displays feedback toast alerts.

4. **Instant Search**:
   - Real-time search query matching across Name, ID, Phone number, Department, and Addresses.
   - Includes a one-click clear button (`✕`).

5. **Live Employee Counts**:
   - Real-time total staff counter in header.
   - Dynamic filtered count indicator (`Showing X of Y employees`).
   - Interactive **Staff Distribution by Department** breakdown widget with live counts per division.
   - Gender diversity breakdown.

6. **Department Filter**:
   - Filter dropdown menu covering all agricultural divisions.
   - Quick-filter pills for fast one-click division switching.
   - Direct click-to-filter on the department breakdown cards.

7. **Bonus Features**:
   - **View Mode Switcher**: Toggle between responsive **Card Grid** view and **Table** view.
   - **Data Persistence**: Uses browser `localStorage` so changes persist across reloads.
   - **Demo Data Reset**: Instant one-click button to reload default demo data.

---

## 🚀 How to Run Locally

1. **Clone or navigate to the project directory**:
   ```bash
   cd employee-directory
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🐙 How to Upload this Project to GitHub

### Step 1: Install Git (if not yet installed)
If you don't have Git installed on your computer:
- Download and install Git from: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)
- During installation, keep the default recommended settings.

### Step 2: Create a New Repository on GitHub
1. Log in to your [GitHub](https://github.com/) account.
2. Click the **`+`** icon in the top right corner and select **New repository**.
3. Name your repository (e.g., `farm-employee-directory` or `react-employee-directory`).
4. Keep it **Public** (or Private).
5. **Do not** check "Initialize this repository with a README" (since this project already includes one).
6. Click **Create repository**.
7. Copy your repository's URL (e.g. `https://github.com/<your-username>/farm-employee-directory.git`).

### Step 3: Initialize Git and Push your Code
Open PowerShell or Command Prompt inside the project folder:
```bash
# 1. Initialize git
git init -b main

# 2. Add all project files
git add .

# 3. Commit your changes
git commit -m "Initial commit: Farm Employee Directory React App"

# 4. Link your local repo to GitHub (replace with your copied URL)
git remote add origin https://github.com/<your-username>/farm-employee-directory.git

# 5. Push to GitHub
git push -u origin main
```

*(If prompted, sign in with your GitHub credentials or Personal Access Token).*
