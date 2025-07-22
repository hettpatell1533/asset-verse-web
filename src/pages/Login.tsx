import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { useAppContext } from '../contexts/AppContext';
import { authActions } from '../actions/authActions';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthLogo } from '../components/auth/AuthLogo';

export const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isRTL = i18n.language === 'ar';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.password.trim()) {
      newErrors.password = t('auth.errors.passwordRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await authActions.login({
        email: formData.email,
        password: formData.password
      });

      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: true,
          user: response.user
        }
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-fit mx-auto">
        <AuthLogo />
      </div>

      <div className="space-y-6">
        <div className={`space-y-2 mt-4 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-bold text-foreground">
            {t('auth.signinTitle')}
          </h1>
          <p className="text-muted-foreground">
            {t('auth.loginSubHeading')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.email')}
                className="h-12 pr-10 pl-3 border-auth-border"
              />
              <Mail className="absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground right-3" />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.password')}
                className="h-12 pr-10 pl-3 border-auth-border"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 transform -translate-y-1/2 h-auto p-1 hover:bg-transparent right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-foreground hover:underline"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('auth.signIn')}
          </Button>

          {/* Remember Me */}
          <div className={`flex items-center ${isRTL ? 'justify-end space-x-reverse space-x-2' : 'justify-start space-x-2'}`}>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
              }
            />
            <Label htmlFor="rememberMe" className="text-sm text-foreground">
              {t('auth.rememberMe')}
            </Label>
          </div>

          {/* Sign Up Link */}
          <div className={`text-center text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            <span className="text-foreground">{t('auth.dontHaveAccount')}</span>
            <Link to="/register" className="text-foreground hover:underline font-medium">
              {t('auth.signUp')}
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
