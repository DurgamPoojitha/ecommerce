# Full-Stack E-commerce Platform

A comprehensive, production-ready E-commerce application featuring a **Python FastAPI** backend paired with a **React + Vite** frontend. Built seamlessly with robust REST architectures, JWT authentication, and Tailwind CSS layouts.

---

## 🚀 Tech Stack

### Backend
- **FastAPI**: Exceptionally fast Python web framework.
- **PostgreSQL**: Relational database.
- **SQLAlchemy ORM**: Used to abstract underlying database schemas safely into Python classes.
- **Pydantic**: Input and output serialization/validation schemas.
- **Passlib & Python-Jose**: Hashing security for passwords and issuing JWT.

### Frontend
- **React 18 & Vite**: Lightning-fast hot-reloading dev environment and optimized builds.
- **Tailwind CSS v3**: For highly customizable, utility-first CSS styling and custom Light/Dark Mode toggling.
- **Axios**: Advanced XHR integration running JWT interceptor workflows.
- **React Router Dom**: Client-side routing with specialized `<ProtectedRoute />` components.
- **Lucide React**: Modern, consistent vector iconography.

---

## 🌟 Key Features

1. **JWT Auth Architecture**: Users can securely sign up, log in, and receive auto-expiring JWT tokens. 
2. **CORS Protected API Flow**: Auto-configured FastAPI CORSMiddleware ensures only the matching Vite React clients communicate successfully over REST loops.
3. **Admin Dashboard Controls**: Granular Role-Based Access Controls restrict certain paths (`/admin`, `/products/ POST`) exclusively to `admin` users safely in both UI routing logic and Backend dependency injection validations.
4. **Interactive Shopping Cart**: Add product quantities safely tracked against live database inventory stocks. Checkout dynamically processes and persists new internal Orders mapped safely to your distinct user ID context.
5. **Dark Mode Integration**: Fluid UI adapting to contextual user preference states.

---

## 📂 Project Structure

```text
ecommerce/
├── main.py                # FastAPI Application Entrypoint & CORS Config
├── database/              # PostgreSQL session instances
├── models/                # SQLAlchemy SQL-table maps (Users, Products)
├── schemas/               # Pydantic data serialization classes
├── services/              # JWT issuance logic & password hashing
├── routers/               # Isolated Endpoints (Auth, Cart, Orders)
└── frontend/              # Root React Web Application directory
    ├── index.html         # Vite Web Mount
    ├── tailwind.config.js # Custom Design System styling rules
    └── src/
        ├── api/           # Pre-configured Axios instance holding interceptors
        ├── components/    # Reusable Navbars and Layout wrapper blocks
        ├── context/       # AuthContext handling global user states
        └── pages/         # Primary routes (Cart, Admin, Dashboard, Login)
```

---

## 🛠️ Installation & Setup

### 1. Database Initialization
Ensure PostgreSQL is running locally on your system.
```sql
CREATE DATABASE ecommerce_db;
```

> Remember to double check your `.env` connection URL located at `./database/session.py` or `.env` space to match your Postgres password exactly:
> `DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce_db`

### 2. Backend Initialization
Initialize the Python virtual environment and install frameworks natively.
```bash
python -m venv venv
source venv/bin/activate
# Windows: venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Frontend Initialization
Boot up the `node_modules` targeting the isolated `frontend/` space.
```bash
cd frontend
npm install
```

---

## 💻 Running the Applications

Both components must be actively running concurrently to prevent failed CORS interceptions. Start two terminals in the root of the project:

### Terminal 1: FastAPI Backend
```bash
# Starts backend identically at http://localhost:8000
python main.py
```
> Test the robust APIs and auto-generated data schemas mapping directly via Swagger UI at `http://localhost:8000/docs`.

### Terminal 2: React Frontend
```bash
# Starts frontend optimally mapping to backend at http://localhost:5173
cd frontend
npm run dev
```

Point your browser exactly to `http://localhost:5173` to navigate the fluid E-Commerce user interface safely!
