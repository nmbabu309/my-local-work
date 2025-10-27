import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getNotifications, markNotificationAsRead, Notification } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    const userNotifications = getNotifications(user.id);
    setNotifications(userNotifications);
  }, [navigate]);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-accent" />;
      default: return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Notifications</h1>
          </div>

          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map(notification => (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.read ? 'border-primary/50' : ''
                  }`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="ml-2">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
