# 🚀 ClientFlow — Business Enquiry & CRM Management System

A full-stack Business Enquiry & Client Relationship Management (CRM) system featuring an **Executive Dashboard**, **Visual Pipeline Stage Board**, **Enquiry Management**, **Team Workload Tracking**, and a **RESTful Express Backend with Prisma ORM**.

---

## 🌟 Key Features

- 📊 **Executive Dashboard**: Real-time business metrics, total pipeline revenue value (`$90,500+`), conversion rates, and stage distribution charts.
- 📋 **Enquiry Management Engine**: Filter, search, and manage leads by status, budget, lead source, and assigned team members.
- 🗂️ **Visual Pipeline Stage Board (Kanban)**: Drag/move leads across sales stages (`New Leads` ➔ `In Progress` ➔ `Proposal Sent` ➔ `Won/Converted` ➔ `Lost`).
- 👥 **Team & Role Performance**: Track active leads and revenue won per team member (`Admin` & `Member` permissions).
- ⚡ **Full-Stack Architecture**: React + Vite frontend styled with a modern dark theme and an Express.js API backend powered by Prisma ORM.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Lucide Icons, Custom CSS Design System
- **Backend**: Node.js, Express.js, Prisma ORM, CORS, Dotenv
- **Database**: SQLite (Local Zero-Config Dev) / PostgreSQL (Cloud Production)

---

## ⚡ Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Manoj-Sivanandharaja/ClientFlow-Business-Enquiry-CRM-Management-System.git
cd ClientFlow-Business-Enquiry-CRM-Management-System
```

### 2. Run the Backend API (`/server`)
```bash
cd server
npm install
npm run db:setup
node src/server.js
```
*Backend runs on `http://localhost:5000`*

### 3. Run the Frontend App (`/client`)
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🔐 Default Demo Accounts

| Name | Email | Role |
| :--- | :--- | :--- |
| Manoj Vijay | `admin@clientflow.com` | ADMIN |
| Priya Sharma | `priya@clientflow.com` | MEMBER |
| Rahul Verma | `rahul@clientflow.com` | MEMBER |

---

## 📄 License

Distributed under the MIT License. Created by Manoj Vijay.
