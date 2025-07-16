import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Settings, User, Globe, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAppContext } from '../../contexts/AppContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useAppContext();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    dispatch({ type: 'SET_LANGUAGE', payload: language });
    localStorage.setItem('language', language);
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-custom-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('common.search')}
            className="pl-10 bg-muted/50"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => handleLanguageChange('en')}
              className={state.language === 'en' ? 'bg-accent' : ''}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleLanguageChange('ar')}
              className={state.language === 'ar' ? 'bg-accent' : ''}
            >
              العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" alt={state.user?.name || ''} />
                <AvatarFallback>
                  {state.user?.name?.charAt(0) || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{state.user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {state.user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {t('common.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('common.settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};