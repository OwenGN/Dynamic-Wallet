// frontend/src/App.tsx
import React from 'react';
import TransactionForm from './components/TransactionForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Add a Transaction</h1>
        <TransactionForm />
      </div>
    </div>
  );
};

export default App;
