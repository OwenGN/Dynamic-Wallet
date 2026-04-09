import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
import { toast } from 'sonner';

interface Account {
  id: number;
  name: string;
  type: string;
  currency: string;
}

export default function AccountsPage() {
  const { token } = useAuthStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await apiCall('/accounts/', {}, token);
        setAccounts(data);
      } catch (error) {
        toast.error('Failed to load accounts');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchAccounts();
    }
  }, [token]);

  if (isLoading) {
    return <div className="text-center py-8">Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
        <p className="text-gray-600 mt-2">Manage your financial accounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle className="text-lg">{account.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong> {account.type}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Currency:</strong> {account.currency}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <p>No accounts found.</p>
              <Button className="mt-4">Add Account</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
