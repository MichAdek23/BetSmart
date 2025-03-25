
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully."
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated."
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <form onSubmit={handleSaveGeneral}>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your site's general settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="BetSmart" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="support@betsmart.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="odds-format">Default Odds Format</Label>
                  <select 
                    id="odds-format" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="decimal"
                  >
                    <option value="decimal">Decimal</option>
                    <option value="fractional">Fractional</option>
                    <option value="american">American</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="utc"
                  >
                    <option value="utc">UTC</option>
                    <option value="gmt">GMT</option>
                    <option value="est">EST</option>
                    <option value="pst">PST</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="maintenance" />
                  <Label htmlFor="maintenance">Enable Maintenance Mode</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <form onSubmit={handleSaveNotifications}>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control email notifications sent to users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-registration" defaultChecked />
                    <Label htmlFor="notify-registration">Send welcome email on registration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-deposit" defaultChecked />
                    <Label htmlFor="notify-deposit">Send email on deposit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-withdrawal" defaultChecked />
                    <Label htmlFor="notify-withdrawal">Send email on withdrawal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-bet-settled" defaultChecked />
                    <Label htmlFor="notify-bet-settled">Send email when bet is settled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-promotion" />
                    <Label htmlFor="notify-promotion">Send promotional emails</Label>
                  </div>
                </div>
                <div className="space-y-1 pt-4">
                  <Label htmlFor="from-email">From Email Address</Label>
                  <Input id="from-email" type="email" defaultValue="noreply@betsmart.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Notification Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleSaveSecurity}>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your site's security configuration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="force-2fa" defaultChecked />
                  <Label htmlFor="force-2fa">Require 2FA for admin accounts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ip-logging" defaultChecked />
                  <Label htmlFor="ip-logging">Log IP addresses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lockout" defaultChecked />
                  <Label htmlFor="lockout">Enable account lockout after failed attempts</Label>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="failed-attempts">Failed attempts before lockout</Label>
                  <Input id="failed-attempts" type="number" defaultValue="5" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Security Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
