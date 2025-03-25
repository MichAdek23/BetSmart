
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminEvents = () => {
  const { toast } = useToast();
  
  const events = [
    {
      id: '1',
      title: 'Premier League: Liverpool vs Manchester City',
      date: 'May 12, 2023',
      time: '3:00 PM',
      status: 'Upcoming',
      category: 'Football'
    },
    {
      id: '2',
      title: 'NBA Finals: Lakers vs Celtics',
      date: 'June 15, 2023',
      time: '8:30 PM',
      status: 'Upcoming',
      category: 'Basketball'
    },
    {
      id: '3',
      title: 'UFC 300: Main Event',
      date: 'April 28, 2023',
      time: '10:00 PM',
      status: 'Completed',
      category: 'MMA'
    },
    {
      id: '4',
      title: 'Wimbledon: Men\'s Final',
      date: 'July 16, 2023',
      time: '2:00 PM',
      status: 'Scheduled',
      category: 'Tennis'
    }
  ];

  const handleEdit = (eventId: string) => {
    toast({
      title: "Editing Event",
      description: `Now editing event with ID: ${eventId}`
    });
  };

  const handleDelete = (eventId: string) => {
    toast({
      title: "Event Deleted",
      description: `Event with ID: ${eventId} has been deleted.`
    });
  };

  const handleAdd = () => {
    toast({
      title: "Add New Event",
      description: "Create a new betting event."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Manage Events</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="MMA">MMA</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground text-sm">
                  <th className="text-left pb-3 font-medium">Event</th>
                  <th className="text-left pb-3 font-medium">Category</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Time</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{event.title}</td>
                    <td className="py-4">{event.category}</td>
                    <td className="py-4">{event.date}</td>
                    <td className="py-4">{event.time}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Live' ? 'bg-green-100 text-green-800' :
                        event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(event.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(event.id)}>
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

export default AdminEvents;
