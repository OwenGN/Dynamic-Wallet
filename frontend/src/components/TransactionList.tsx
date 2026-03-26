import React, { useEffect, useState, ChangeEvent } from 'react';

interface Transaction {
  id: number;
  account_id: number;
  category_id: number;
  date: string;
  amount: number;
  description: string;
}

interface Account {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [filters, setFilters] = useState({
    account: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetch("http://localhost:8000/transactions")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data);
      });

    fetch("http://localhost:8000/accounts")
      .then(res => res.json())
      .then(data => setAccounts(data));

    fetch("http://localhost:8000/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filters.account) {
      filtered = filtered.filter(t => t.account_id.toString() === filters.account);
    }

    if (filters.category) {
      filtered = filtered.filter(t => t.category_id.toString() === filters.category);
    }

    if (filters.startDate) {
      filtered = filtered.filter(t => t.date >= filters.startDate);
    }

    if (filters.endDate) {
      filtered = filtered.filter(t => t.date <= filters.endDate);
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const accountName = (id: number) =>
    accounts.find(acc => acc.id === id)?.name || `Account ${id}`;

  const categoryName = (id: number) =>
    categories.find(cat => cat.id === id)?.name || `Category ${id}`;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          name="account"
          value={filters.account}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Accounts</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>{acc.name}</option>
          ))}
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Start date"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="End date"
        />
      </div>

      {/* Transactions List */}
      <ul className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <li className="text-gray-500">No transactions found.</li>
        ) : (
          filteredTransactions.map(tx => (
            <li key={tx.id} className="p-4 bg-gray-50 border rounded shadow-sm">
              <p><strong>Date:</strong> {tx.date}</p>
              <p><strong>Amount:</strong> ${tx.amount.toFixed(2)}</p>
              <p><strong>Account:</strong> {accountName(tx.account_id)}</p>
              <p><strong>Category:</strong> {categoryName(tx.category_id)}</p>
              <p><strong>Description:</strong> {tx.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
