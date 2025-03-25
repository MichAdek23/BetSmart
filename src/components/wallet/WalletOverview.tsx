
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Coins, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { walletService } from '@/services/api';

interface WalletData {
  balance: number;
  currency: string;
}

const WalletOverview = ({ onDeposit, onWithdraw }: { onDeposit: () => void; onWithdraw: () => void }) => {
  const { user } = useAuth();

  const { data: walletData, isLoading } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const response = await walletService.getWallet();
      return response.data as WalletData;
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Wallet Balance</CardTitle>
            <CardDescription>Your current available funds</CardDescription>
          </div>
          <Wallet className="h-8 w-8 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-6">
            {isLoading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading wallet...</div>
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-5xl font-bold">
                      ${walletData?.balance.toFixed(2) || user?.wallet.balance.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {walletData?.currency || user?.wallet.currency || 'USD'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={onDeposit} size="sm" className="flex items-center">
                      <ArrowDown className="mr-1 h-4 w-4" />
                      Deposit
                    </Button>
                    <Button onClick={onWithdraw} size="sm" variant="outline" className="flex items-center">
                      <ArrowUp className="mr-1 h-4 w-4" />
                      Withdraw
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm font-medium">
                        Available for betting: ${walletData?.balance.toFixed(2) || user?.wallet.balance.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-500" />
                      <span className="text-sm font-medium">
                        Pending bets: $0.00
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletOverview;
