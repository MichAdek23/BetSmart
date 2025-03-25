
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const { toast } = useToast();
  
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'Active',
      bets: 24,
      balance: '$450.00',
      joined: 'Jan 15, 2023'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'Active',
      bets: 42,
      balance: '$1,250.00',
      joined: 'Mar 3, 2023'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      status: 'Suspended',
      bets: 16,
      balance: '$75.50',
      joined: 'Nov 22, 2022'
    },
    {
      id: '4',
      name: 'Jessica Lee',
      email: 'jessica.lee@example.com',
      status: 'Inactive',
      bets: 8,
      balance: '$320.00',
      joined: 'Apr 10, 2023'
    }
  ];

  const handleEdit = (userId: string) => {
    toast({
      title: "Editing User",
      description: `Now editing user with ID: ${userId}`
    });
  };

  const handleDelete = (userId: string) => {
    toast({
      title: "User Deleted",
      description: `User with ID: ${userId} has been removed.`
    });
  };

  const handleEmail = (email: string) => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${email}`
    });
  };

  const handleAdd = () => {
    toast({
      title: "Add New User",
      description: "Create a new user account."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">User Management</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground text-sm">
                  <th className="text-left pb-3 font-medium">User</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium">Bets</th>
                  <th className="text-left pb-3 font-medium">Balance</th>
                  <th className="text-left pb-3 font-medium">Joined</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4">{user.bets}</td>
                    <td className="py-4">{user.balance}</td>
                    <td className="py-4">{user.joined}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEmail(user.email)}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(user.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
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

export default AdminUsers;
