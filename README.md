# E-commerce FastAPI Backend

This is a production-ready, modular E-commerce backend developed with Python and FastAPI. It follows a clean architecture separating Database configurations, Models, Schemas, and the Router Endpoints.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Tech Stack
- **FastAPI**: Modern, fast web framework for building APIs with Python.
- **PostgreSQL**: Robust open-source relational database.
- **SQLAlchemy**: Python SQL toolkit and Object Relational Mapper.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **Uvicorn**: Lightning-fast ASGI server implementation.
- **Passlib & Jose**: Cryptography libraries for hashing passwords and managing JSON Web Tokens (JWTs).

## Project Structure
- `database/`: Contains the database connection code and SQLAlchemy declarative base (`session.py` and `base.py`).
- `models/`: Contains the database schemas mapping Python objects to PostgreSQL tables (`user.py`, `product.py`, `order.py`).
- `schemas/`: Houses all Pydantic schemas for data validation on both input requests and output responses.
- `services/`: Stores business logic utilities like password hashing, token generation, and the `get_current_user` dependencies.
- `routers/`: Segregated API endpoints mapping to features such as `/auth`, `/products`, `/cart`, and `/orders`.
- `main.py`: The entry point that ties everything together. Initializes FastAPI and database tables.

## Features
- **JWT Authentication**: Full `/auth/signup` and `/auth/login` workflow granting an `access_token` for protected endpoints.
- **Role-based Access Control**: Administrative endpoints (like adding products and categories) check if the user is an `admin`.
- **Products & Cart**: Customers can browse products by categories, search, and securely add/remove them from their carts.
- **Orders**: Directly checkout products from the cart to an Order with dynamic inventory checking.

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone git@github.com:DurgamPoojitha/ecommerce.git
   cd ecommerce
   ```

2. **Database Setup**
   Ensure you have PostgreSQL installed. Open your local Postgres shell (`psql`) and setup the initial blank database:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```
   *Make sure your credentials in `.env` match your local PostgreSQL configuration.* (If you don't have a `.env`, create one following the format in `database/session.py`!)

3. **Install Dependencies**
   It's recommended to create a isolated Python environment before installing project requirements:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Running the Application

Once dependencies are installed and the postgres connection URL is set, run the core server:
```bash
python main.py
```
> Alternatively, you can run and use live-reload via Uvicorn explicitly: `uvicorn main:app --reload`

## API Documentation
Once running, FastAPI abstracts the REST endpoints into a clean, interactive GUI dashboard:
Visit **`http://localhost:8000/docs`** to explore all endpoints, explore request payloads, mock queries, and authorize globally using your newly created login credentials!
