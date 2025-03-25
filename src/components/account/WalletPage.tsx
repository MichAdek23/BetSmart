
import React, { useState } from 'react';
import WalletOverview from '@/components/wallet/WalletOverview';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DepositForm from '@/components/wallet/DepositForm';
import WithdrawForm from '@/components/wallet/WithdrawForm';

const WalletPage = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleOpenDeposit = () => {
    setIsDepositOpen(true);
  };

  const handleOpenWithdraw = () => {
    setIsWithdrawOpen(true);
  };

  const handleCloseDeposit = () => {
    setIsDepositOpen(false);
  };

  const handleCloseWithdraw = () => {
    setIsWithdrawOpen(false);
  };

  return (
    <div className="space-y-8">
      <WalletOverview 
        onDeposit={handleOpenDeposit}
        onWithdraw={handleOpenWithdraw}
      />
      
      <TransactionHistory />
      
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Add money to your betting wallet.
            </DialogDescription>
          </DialogHeader>
          <DepositForm onSuccess={handleCloseDeposit} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Withdraw money from your betting wallet.
            </DialogDescription>
          </DialogHeader>
          <WithdrawForm onSuccess={handleCloseWithdraw} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletPage;
