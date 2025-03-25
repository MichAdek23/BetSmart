
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminBets = () => {
  const { toast } = useToast();
  
  const bets = [
    {
      id: '1',
      user: 'John Smith',
      event: 'Premier League: Liverpool vs Manchester City',
      selection: 'Liverpool',
      odds: '2.20',
      stake: '$100.00',
      potential: '$220.00',
      status: 'Pending'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      event: 'NBA Finals: Lakers vs Celtics',
      selection: 'Lakers',
      odds: '1.85',
      stake: '$250.00',
      potential: '$462.50',
      status: 'Settled'
    },
    {
      id: '3',
      user: 'Michael Brown',
      event: 'UFC 300: Main Event',
      selection: 'Fighter A',
      odds: '3.50',
      stake: '$50.00',
      potential: '$175.00',
      status: 'Lost'
    },
    {
      id: '4',
      user: 'Jessica Lee',
      event: 'Wimbledon: Men\'s Final',
      selection: 'Player B',
      odds: '1.65',
      stake: '$300.00',
      potential: '$495.00',
      status: 'Pending'
    }
  ];

  const handleApprove = (betId: string) => {
    toast({
      title: "Bet Approved",
      description: `Bet ID: ${betId} has been marked as won.`
    });
  };

  const handleReject = (betId: string) => {
    toast({
      title: "Bet Rejected",
      description: `Bet ID: ${betId} has been marked as lost.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Manage Bets</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bets..." 
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Settled">Settled</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground text-sm">
                  <th className="text-left pb-3 font-medium">User</th>
                  <th className="text-left pb-3 font-medium">Event</th>
                  <th className="text-left pb-3 font-medium">Selection</th>
                  <th className="text-left pb-3 font-medium">Odds</th>
                  <th className="text-left pb-3 font-medium">Stake</th>
                  <th className="text-left pb-3 font-medium">Potential</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet) => (
                  <tr key={bet.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{bet.user}</td>
                    <td className="py-4 max-w-[200px] truncate">{bet.event}</td>
                    <td className="py-4">{bet.selection}</td>
                    <td className="py-4">{bet.odds}</td>
                    <td className="py-4">{bet.stake}</td>
                    <td className="py-4">{bet.potential}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        bet.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                        bet.status === 'Settled' ? 'bg-green-100 text-green-800' :
                        bet.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bet.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {bet.status === 'Pending' && (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleApprove(bet.id)}>
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleReject(bet.id)}>
                            <X className="h-4 w-4 text-red-600" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBets;
