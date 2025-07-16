import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className
}) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold">
              {value}
            </p>
            {change && (
              <p className={cn(
                "text-xs font-medium",
                changeType === 'positive' && "text-success",
                changeType === 'negative' && "text-error",
                changeType === 'neutral' && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground opacity-50">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};