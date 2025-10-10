import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Alert, AlertDescription } from './alert';
import { Button } from './button';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getVariant = (type) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'success':
      case 'info':
      default:
        return 'default';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={getVariant(notification.type)}
          className="shadow-lg border animate-in slide-in-from-right-full"
        >
          <div className="flex items-start gap-2">
            {getIcon(notification.type)}
            <div className="flex-1">
              {notification.title && (
                <h4 className="font-medium mb-1">{notification.title}</h4>
              )}
              <AlertDescription>{notification.message}</AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 hover:bg-transparent"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationContainer;
