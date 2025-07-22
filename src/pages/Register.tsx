import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAppContext } from '../contexts/AppContext';
import { authActions } from '../actions/authActions';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthLogo } from '../components/auth/AuthLogo';

export const Register: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const isRTL = i18n.language === 'ar';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authActions.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: true,
          user: (response as any).user
        }
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='w-fit mx-auto'>
        <AuthLogo />
      </div>
      <div className="space-y-6">
        {/* Header */}
        <div className={`space-y-2 text-center`}>
          <h1 className="text-2xl font-bold text-foreground">
            {t('auth.signupTitle')}
          </h1>
          <p className="text-muted-foreground">
            {t('auth.signupSubHeading')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              {t('auth.firstName')}
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.firstName')}
                className={`h-12 ${isRTL ? 'pl-3' : 'pr-3'} border-auth-border`}
                required
              />
              <User className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground right-3`} />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              {t('auth.lastName')}
            </Label>
            <div className="relative">
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.lastName')}
                className={`h-12 ${isRTL ? 'pr-10 pl-3' : 'pr-3'} border-auth-border`}
                required
              />
              <User className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground right-3`} />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              {t('auth.email')}
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.email')}
                className={`h-12 ${isRTL ? 'pr-10 pl-3' : 'pr-3'} border-auth-border`}
                required
              />
              <Mail className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground right-3`} />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              {t('auth.password')}
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.password')}
                className={`h-12 ${isRTL ? 'pl-10 pr-3' : 'pr-10 pl-3'} border-auth-border`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute top-1/2 transform -translate-y-1/2 h-auto p-1 hover:bg-transparent ${isRTL ? 'left-2' : 'right-2'
                  }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('auth.signUp')}
          </Button>

          {/* Terms Text */}
          <div className={`text-xs text-muted-foreground text-center`}>
            {t('auth.termsText')}
          </div>

          {/* Sign In Link */}
          <div className={`text-center text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            <span className="text-foreground">
              {t('auth.alreadyHaveAccount')}{' '}
            </span>
            <Link
              to="/login"
              className="text-foreground hover:underline font-medium"
            >
              {t('auth.signIn')}
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};