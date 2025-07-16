import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Activity, Wrench, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { apiService } from '../services/api';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalAssets: 0,
    activeAssets: 0,
    maintenanceDue: 0,
    inRepair: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, activitiesData] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getRecentActivities()
        ]);
        
        setStats(statsData as any);
        setActivities(activitiesData as any);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your assets.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('dashboard.totalAssets')}
          value={stats.totalAssets}
          change="+2.5% from last month"
          changeType="positive"
          icon={<Package className="h-6 w-6" />}
        />
        <StatsCard
          title={t('dashboard.activeAssets')}
          value={stats.activeAssets}
          change="+1.2% from last month"
          changeType="positive"
          icon={<Activity className="h-6 w-6" />}
        />
        <StatsCard
          title={t('dashboard.maintenanceDue')}
          value={stats.maintenanceDue}
          change="3 due this week"
          changeType="neutral"
          icon={<Wrench className="h-6 w-6" />}
        />
        <StatsCard
          title={t('dashboard.inRepair')}
          value={stats.inRepair}
          change="-1 from last week"
          changeType="positive"
          icon={<AlertTriangle className="h-6 w-6" />}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Asset Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.assetsByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Chart will be implemented</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <RecentActivities activities={activities} />
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.assetsByLocation')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Location chart will be implemented</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.upcomingMaintenance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Maintenance calendar will be implemented</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};