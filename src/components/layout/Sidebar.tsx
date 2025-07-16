import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Settings, 
  Users, 
  MapPin,
  FolderOpen,
  Wrench
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { state } = useAppContext();
  const location = useLocation();

  const navigationItems = [
    {
      title: t('common.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('common.assets'),
      href: '/assets',
      icon: Package,
    },
    {
      title: t('navigation.inventory'),
      href: '/inventory',
      icon: FolderOpen,
    },
    {
      title: t('navigation.maintenance'),
      href: '/maintenance',
      icon: Wrench,
    },
    {
      title: t('navigation.categories'),
      href: '/categories',
      icon: FolderOpen,
    },
    {
      title: t('navigation.locations'),
      href: '/locations',
      icon: MapPin,
    },
    {
      title: t('navigation.users'),
      href: '/users',
      icon: Users,
    },
    {
      title: t('common.reports'),
      href: '/reports',
      icon: BarChart3,
    },
    {
      title: t('common.settings'),
      href: '/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        state.language === 'ar' && "right-0 left-auto"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gradient">
            Asset Manager
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => onClose()}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive(item.href) 
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" 
                        : "text-muted-foreground",
                      state.language === 'ar' && "flex-row-reverse"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};