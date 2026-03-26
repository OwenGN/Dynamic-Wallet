CREATE TABLE IF NOT EXISTS Accounts(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, --"bank", "credit card", "investment", etc.
    currency TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS Categories(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS Transactions(
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES Accounts(id),
    date DATE NOT NULL,
    amount REAL NOT NULL,
    category_id INTEGER REFERENCES Categories(id),
    description TEXT
);
CREATE TABLE IF NOT EXISTS Loans(
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES Accounts(id),
    borrower_name TEXT NOT NULL,
    loan_type TEXT,
    amount REAL NOT NULL,
    interest_rate REAL,
    start_date TEXT NOT NULL,
    due_date DATE,
    status TEXT NOT NULL,
    notes TEXT
);
CREATE TABLE IF NOT EXISTS Goals(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    target_amount FLOAT NOT NULL,
    goalType ENUM('savings', 'debt'),
    deadline DATE,
    priority INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    