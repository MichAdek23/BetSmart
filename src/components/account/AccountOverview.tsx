
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Trophy, Wallet } from 'lucide-react';

const AccountOverview = () => {
  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    joinDate: "January 15, 2023",
    balance: "$450.00",
    recentBets: [
      { id: "1", event: "Liverpool vs Man City", stake: "$50", potential: "$110", status: "Pending", date: "May 12, 2023" },
      { id: "2", event: "Lakers vs Celtics", stake: "$75", potential: "$138.75", status: "Won", date: "May 10, 2023" },
      { id: "3", event: "UFC Fight Night", stake: "$30", potential: "$105", status: "Lost", date: "May 5, 2023" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Your account information and recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=100`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Security Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Wallet className="h-8 w-8 mx-auto text-primary" />
              <div className="mt-2 text-3xl font-bold">{user.balance}</div>
              <div className="flex justify-center gap-2 mt-4">
                <Button size="sm">Deposit</Button>
                <Button variant="outline" size="sm">Withdraw</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Bets</CardTitle>
              <CardDescription>Your betting history</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.recentBets.map(bet => (
                <div key={bet.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-md ${
                      bet.status === 'Won' ? 'bg-green-100' : 
                      bet.status === 'Lost' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {bet.status === 'Won' ? 
                        <Trophy className={`h-4 w-4 ${bet.status === 'Won' ? 'text-green-600' : bet.status === 'Lost' ? 'text-red-600' : 'text-blue-600'}`} /> : 
                        <Clock className={`h-4 w-4 ${bet.status === 'Won' ? 'text-green-600' : bet.status === 'Lost' ? 'text-red-600' : 'text-blue-600'}`} />
                      }
                    </div>
                    <div>
                      <div className="font-medium">{bet.event}</div>
                      <div className="text-sm text-muted-foreground">Stake: {bet.stake} • Potential: {bet.potential}</div>
                      <div className="text-xs text-muted-foreground">{bet.date}</div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      bet.status === 'Won' ? 'bg-green-100 text-green-800' : 
                      bet.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {bet.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Betting Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Bets</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Wins</span>
                <span className="font-bold text-green-600">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Losses</span>
                <span className="font-bold text-red-600">9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Win Rate</span>
                <span className="font-bold">62.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Profit</span>
                <span className="font-bold text-green-600">+$320.50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;
