
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/services/api';

const withdrawalMethods = [
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'e_wallet', name: 'E-Wallet' },
  { id: 'crypto', name: 'Cryptocurrency' }
];

const WithdrawForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank_transfer');
  const [accountDetails, setAccountDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const maxWithdrawal = user?.wallet.balance || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amount || amountValue <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amountValue > maxWithdrawal) {
      toast.error('Withdrawal amount exceeds your available balance');
      return;
    }
    
    if (!accountDetails) {
      toast.error('Please enter your account details');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await walletService.withdraw({
        amount: amountValue,
        withdrawalMethod,
        accountDetails
      });
      
      toast.success(`Withdrawal request for $${amount} submitted`);
      
      // Reset form
      setAmount('');
      setAccountDetails('');
      
      // Invalidate wallet queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      // Toast already displayed by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>Withdraw money from your betting wallet</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-sm text-muted-foreground">
                Available: ${maxWithdrawal.toFixed(2)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                min="1"
                max={maxWithdrawal}
                step="0.01"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
            <Select
              value={withdrawalMethod}
              onValueChange={setWithdrawalMethod}
              disabled={isLoading}
            >
              <SelectTrigger id="withdrawal-method">
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                {withdrawalMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account-details">Account Details</Label>
            <Input
              id="account-details"
              placeholder="Enter your account details"
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-muted-foreground">
              {withdrawalMethod === 'bank_transfer' && 'Enter your bank account number and routing information'}
              {withdrawalMethod === 'e_wallet' && 'Enter your e-wallet account ID or email'}
              {withdrawalMethod === 'crypto' && 'Enter your cryptocurrency wallet address'}
            </p>
          </div>
          
          <div className="rounded-lg border border-dashed p-4">
            <p className="text-sm text-muted-foreground text-center">
              This is a demo withdrawal form. In a real application, additional verification would be required.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading || maxWithdrawal <= 0}>
            {isLoading ? 'Processing...' : 'Withdraw Funds'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WithdrawForm;
