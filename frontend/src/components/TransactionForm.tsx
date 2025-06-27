import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useEffect } from 'react';

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

  useEffect(() => {
    const fetchOptions = async () => {
      const [accountsRes, categoriesRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/accounts/"),
        fetch("http://127.0.0.1:8000/categories/")
      ]);
      if (accountsRes.ok) setAccounts(await accountsRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
    };
    fetchOptions();
  }, []);

  
  const [formData, setFormData] = useState<TransactionFormData>({
    account_id: '',
    category_id: '',
    date: '',
    amount: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          category_id: parseInt(formData.category_id),
          account_id: parseInt(formData.account_id),
        }),
      });

      if (res.ok) {
        toast.success("Transaction added successfully!");
        setFormData({ account_id: '', category_id: '', date: '', amount: '', description: '' });
      } else {
        toast.error("Failed to add transaction. Please check your input.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };

  return (
  <Card className="max-w-xl mx-auto mt-8">
    <CardContent>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label>Account</Label>
          <select
            className="text-black bg-white"
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            required
          >
            <option value="">Select an account</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Category</Label>
          <select
            className="text-black bg-white"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Date</Label>
          <Input className="text-black bg-white" type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <Label>Amount</Label>
          <Input className="text-black bg-white" type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <Label>Description</Label>
          <Input className="text-black bg-white" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </CardContent>
  </Card>
);

}
