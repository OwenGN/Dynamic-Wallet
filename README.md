# Dynamic-Wallet
A cloud-based dynamic wallet for managing personal finances, built using Python, SQL and deployed with AWS.

# Project Overview

# Tech Stack
**Database:** PostgreSQL
**Backend:** Python

**Database Schema**
Includes:
- Accounts(with institution & type)
- Transactions(with category and date)
- Loans(for detailed tracking)
- Categories

**Backend Architecture**

Built in Python with SQLAlchemy ORM. Backend support relational mapping of financial data, initializes tables and allows future expansion to REST APIs via FastAPI.
Project structure follows modular convention for easy extension.

## Features (so far)
- PostgreSQL database schema for accounts, transactions, loans, and categories
- FastAPI backend with full CRUD for accounts
    - POST /accounts
    - GET /accounts
    - PUT /accounts/{id}
    - DELETE /accounts/{id}
- Pydantic v2 support with `from_attributes=True`
- SQLAlchemy ORM with session management