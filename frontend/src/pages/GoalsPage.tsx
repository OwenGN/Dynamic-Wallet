import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
import { toast } from 'sonner';

interface Goal {
  id: number;
  name: string;
  type: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
}

export default function GoalsPage() {
  const { token } = useAuthStore();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await apiCall('/goals/', {}, token);
        setGoals(data);
      } catch (error) {
        toast.error('Failed to load goals');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchGoals();
    }
  }, [token]);

  if (isLoading) {
    return <div className="text-center py-8">Loading goals...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
        <p className="text-gray-600 mt-2">Track your financial goals and targets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {goal.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      ${goal.current_amount.toFixed(2)} / ${goal.target_amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Target: {new Date(goal.target_date).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <p>No goals found.</p>
              <Button className="mt-4">Create Goal</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
