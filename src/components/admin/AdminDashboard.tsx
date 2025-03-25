
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Users, Trophy, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  // Sample data for the charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const metrics = [
    { title: "Total Users", value: "2,345", icon: Users, change: "+12% from last month", color: "bg-blue-500" },
    { title: "Active Events", value: "187", icon: Calendar, change: "+5% from last month", color: "bg-green-500" },
    { title: "Total Bets", value: "15,456", icon: Trophy, change: "+18% from last month", color: "bg-purple-500" },
    { title: "Revenue", value: "$45,289", icon: LineChart, change: "+7% from last month", color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
                </div>
                <div className={`${metric.color} p-2 rounded-md`}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Revenue over the last 7 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center border-b pb-3 last:border-0 last:pb-0">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User placed a bet on Liverpool vs Man City</p>
                    <p className="text-xs text-muted-foreground">{item * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Events</CardTitle>
            <CardDescription>Most active betting events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Premier League: Liverpool vs Man City', 'NBA Finals: Lakers vs Celtics', 'UFC 300: Main Event', 'Wimbledon: Men\'s Final'].map((event, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium">{event}</p>
                  </div>
                  <div className="text-sm font-medium">{(5 - i) * 234} bets</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
