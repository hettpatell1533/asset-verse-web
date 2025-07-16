import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  language: string;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  loading: boolean;
}

type AppAction =
  | { type: 'SET_AUTH'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  language: 'en',
  theme: 'light',
  sidebarCollapsed: false,
  loading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');
    const savedAuth = localStorage.getItem('auth');

    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
      i18n.changeLanguage(savedLanguage);
    }

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
    }

    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        dispatch({ type: 'SET_AUTH', payload: authData });
      } catch (error) {
        console.error('Error parsing saved auth data:', error);
      }
    }
  }, [i18n]);

  useEffect(() => {
    // Update HTML dir attribute for RTL languages
    const isRTL = state.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.className = isRTL ? 'rtl' : 'ltr';
  }, [state.language]);

  useEffect(() => {
    // Update theme
    document.documentElement.className += ` ${state.theme}`;
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};