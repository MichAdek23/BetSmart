
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/services/api';

const paymentMethods = [
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'debit_card', name: 'Debit Card' },
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'e_wallet', name: 'E-Wallet' },
  { id: 'crypto', name: 'Cryptocurrency' }
];

const DepositForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await walletService.deposit({
        amount: parseFloat(amount),
        paymentMethod
      });
      
      toast.success(`Successfully deposited $${amount}`);
      
      // Reset form
      setAmount('');
      
      // Invalidate wallet queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Deposit error:', error);
      // Toast already displayed by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Funds</CardTitle>
        <CardDescription>Add money to your betting wallet</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex space-x-2 items-center">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  min="1"
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
            
            <div className="flex flex-wrap gap-2 mt-2">
              {[10, 25, 50, 100, 500].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                >
                  ${value}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              disabled={isLoading}
            >
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* This would be expanded with real payment forms in a production app */}
          <div className="rounded-lg border border-dashed p-4">
            <p className="text-sm text-muted-foreground text-center">
              This is a demo payment form. In a real application, this would integrate with a payment processor.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Deposit Funds'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DepositForm;
