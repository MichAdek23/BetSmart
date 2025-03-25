
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useQuery } from '@tanstack/react-query';
import { walletService } from '@/services/api';
import { format } from 'date-fns';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
  reference: string;
}

const TransactionHistory = () => {
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', transactionType, page, limit],
    queryFn: async () => {
      const params: Record<string, any> = { page, limit };
      if (transactionType) params.type = transactionType;
      
      const response = await walletService.getTransactions(params);
      return response;
    }
  });

  const transactions = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;

  const getTransactionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      bet_placed: 'Bet Placed',
      bet_won: 'Bet Won',
      bet_lost: 'Bet Lost',
      cashout: 'Cashout',
      bonus: 'Bonus',
      promotion: 'Promotion',
      referral: 'Referral',
      fee: 'Fee'
    };
    
    return types[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      refunded: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge variant="outline" className={statusColors[status] || 'bg-gray-100'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your recent transactions</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="all" onValueChange={(value) => setTransactionType(value === 'all' ? null : value)}>
        <div className="px-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposit">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
            <TabsTrigger value="bet_placed">Bets</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="m-0">
          <CardContent>
            {renderTransactionTable()}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="deposit" className="m-0">
          <CardContent>
            {renderTransactionTable()}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="withdrawal" className="m-0">
          <CardContent>
            {renderTransactionTable()}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="bet_placed" className="m-0">
          <CardContent>
            {renderTransactionTable()}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );

  function renderTransactionTable() {
    if (isLoading) {
      return (
        <div className="py-10 text-center">
          <div className="animate-pulse">Loading transactions...</div>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-center font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: Transaction) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="px-4 py-3 text-left">
                      {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-left">
                      {getTransactionTypeLabel(transaction.type)}
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">Ref: {transaction.reference}</div>
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(transaction.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(page - 1)} 
                  className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    isActive={pageNum === page}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(page + 1)} 
                  className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  }
};

export default TransactionHistory;
