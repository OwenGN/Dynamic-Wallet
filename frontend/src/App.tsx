// frontend/src/App.tsx
import React from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function AppWrapper() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Transaction Tracker</h1>
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
}

export default AppWrapper;
