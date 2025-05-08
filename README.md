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
