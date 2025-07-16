import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'maintenance';
}

interface RecentActivitiesProps {
  activities?: Activity[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ 
  activities = [] 
}) => {
  const { t } = useTranslation();

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return 'bg-success text-white';
      case 'update':
        return 'bg-info text-white';
      case 'delete':
        return 'bg-error text-white';
      case 'maintenance':
        return 'bg-warning text-white';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.recentActivities')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activities
            </p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>
                    {activity.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {activity.user.name}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={getActivityColor(activity.type)}
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} <strong>{activity.target}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};