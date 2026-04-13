import React, { useEffect, useState, ChangeEvent } from 'react';
import apiCall from '@/lib/api';

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

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    account: '',
    category: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, accRes, catRes] = await Promise.all([
          apiCall('/transactions/', {}),
          apiCall('/accounts/', {}),
          apiCall('/categories/', {}),
        ]);

        setTransactions(transRes);
        setFilteredTransactions(transRes);
        setAccounts(accRes);
        setCategories(catRes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filters.account) {
      filtered = filtered.filter((t) => t.account_id.toString() === filters.account);
    }

    if (filters.category) {
      filtered = filtered.filter((t) => t.category_id?.toString() === filters.category);
    }

    if (filters.startDate) {
      filtered = filtered.filter((t) => t.date >= filters.startDate);
    }

    if (filters.endDate) {
      filtered = filtered.filter((t) => t.date <= filters.endDate);
    }

    setFilteredTransactions(filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [filters, transactions]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const accountName = (id: number) => accounts.find((acc) => acc.id === id)?.name || `Account ${id}`;
  const categoryName = (id: number) => (id ? categories.find((cat) => cat.id === id)?.name || `Category ${id}` : '-');

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading transactions...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <select
          name="account"
          value={filters.account}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 text-sm"
        >
          <option value="">All Accounts</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          placeholder="Start date"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          placeholder="End date"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Account</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{accountName(tx.account_id)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{categoryName(tx.category_id)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{tx.description || '-'}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                    ${tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
