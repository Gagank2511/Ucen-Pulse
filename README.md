# 🏃‍♂️ UCENPulse — Personal Fitness Tracker

UCENPulse is a full-stack web application designed to help users log daily activities, track health metrics, and visualise trends over time. The system has evolved from a client-side application into a complete solution with a secure backend, persistent storage, and third-party API integration.


## 🚀 Features

### 👤 User Authentication

* Secure user registration and login
* JWT-based authentication
* Protected API routes

### 🏋️ Activity Tracking

* Add, view, and delete fitness activities
* Store duration, type, and notes
* Linked to individual user accounts

### 📊 Metrics Tracking

* Record health metrics (steps, water, sleep, calories)
* View recent entries and trends
* Data visualised using charts

### 📈 Data Visualisation

* Aggregated metrics over selectable time ranges
* Interactive charts for insights

### 🌦️ Web Service Integration

* Integrated external **weather API**
* Enhances context for activities (e.g., performance vs weather conditions)


## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Fetch API

### Backend

* Node.js + Express
* Prisma ORM
* SQLite database
* JWT authentication
* Swagger (OpenAPI documentation)


## 📁 Project Structure

```id="project-structure"
ucenpulse/
├── frontend/               # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components (Dashboard, Auth)
│   ├── controllers/        # API interaction logic
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
│
├── backend/                # Express backend
│   ├── controllers/        # Business logic & Prisma DB access
│   ├── services/           # Handle HTTP requests/responses
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth middleware (JWT protection)
│   ├── prisma/             # Prisma schema & migrations
│   └── swagger/            # API documentation setup
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="clone"
git clone <your-repo-url>
cd ucenpulse
```


### 2️⃣ Backend Setup

```bash id="backend-setup"
cd backend
npm install
```

Create a `.env` file:

```env id="env"
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
```

Run database migrations:

```bash id="migrate"
npx prisma migrate dev
```

Start backend server:

```bash id="backend-run"
npm run dev
```


### 3️⃣ Frontend Setup

```bash id="frontend-setup"
cd frontend
npm install
npm run dev
```

Frontend runs at:

```id="frontend-url"
http://localhost:5173
```

---

## 🔐 Authentication (JWT)

* Users authenticate via `/api/auth/login`
* Server returns a JWT token
* Token is stored in localStorage (simple implementation)
* Protected routes require:

```id="auth-header"
Authorization: Bearer <token>
```

Middleware validates the token before granting access.


## 🗄️ Database (Prisma ORM)

Prisma is used for database access and schema management.

### Models:

* **User**
* **Activity**
* **Metric**

### Example Relationship:

* A user can have multiple activities and metrics

Prisma ensures:

* Type-safe queries
* Easy migrations
* Clean data relationships


## 📡 API Documentation (Swagger)

Swagger is used to document and test API endpoints.

Access it at:

```id="swagger-url"
http://localhost:5001/api-docs
```

### Benefits:

* Interactive API testing
* Clear endpoint documentation
* Improved frontend-backend integration

---

## 🌦️ Third-Party API Integration

A weather API is integrated to enhance application functionality.

### Purpose:

* Provide contextual insights for activities
* Example: correlate workout performance with weather conditions

This demonstrates the use of **external web services to add real value**.


## 🧪 Testing

Basic unit and integration tests are implemented using:

* Jest
* Supertest

Test coverage includes:

* Authentication endpoints
* Activity routes
* Metric routes


## 🔒 Security & Best Practices

* Passwords hashed using bcrypt
* JWT for stateless authentication
* Protected API routes
* Environment variables for secrets
* Input validation and error handling


## 📌 Future Improvements

* Move token storage to HTTP-only cookies for better security
* Add role-based access control
* Improve UI/UX further
* Add more third-party integrations (e.g., wearable APIs)


## 📖 Conclusion

UCENPulse demonstrates a complete full-stack application with:

* Secure authentication
* Persistent database integration
* RESTful API design
* Third-party service integration
* Interactive data visualisation

The project follows a modular and scalable architecture, separating concerns between controllers, services, and routes while leveraging modern tools such as Prisma and Swagger.

