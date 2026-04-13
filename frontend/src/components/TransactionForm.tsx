import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import apiCall from '@/lib/api';

interface TransactionFormData {
  account_id: string;
  category_id: string;
  date: string;
  amount: string;
  description: string;
}

export default function TransactionForm() {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [accountsRes, categoriesRes] = await Promise.all([
          apiCall('/accounts/', {}),
          apiCall('/categories/', {}),
        ]);
        setAccounts(accountsRes);
        setCategories(categoriesRes);
      } catch (error) {
        toast.error('Failed to load accounts and categories');
      }
    };
    fetchOptions();
  }, []);

  const [formData, setFormData] = useState<TransactionFormData>({
    account_id: '',
    category_id: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiCall(
        '/transactions/',
        {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount),
            category_id: formData.category_id ? parseInt(formData.category_id) : null,
            account_id: parseInt(formData.account_id),
          }),
        }
      );

      toast.success('Transaction added successfully!');
      setFormData({
        account_id: '',
        category_id: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="account_id">Account</Label>
          <select
            id="account_id"
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
            required
          >
            <option value="">Select an account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="category_id">Category</Label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Transaction description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Adding...' : 'Add Transaction'}
      </Button>
    </form>
  );
}

