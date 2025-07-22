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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isRTL = i18n.language === 'ar';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('auth.errors.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('auth.errors.lastNameRequired');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        createdBy: formData.firstName
      };
      const loginData={
        email:formData.email,
        password:formData.password
      }
      const response = await authActions.register(submitData);
       await authActions.login(loginData)

      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: true,
          user: (response as any).data
        }
      });

      navigate('/company-setup');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthLogo />

      <div className="space-y-6">
        <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-bold text-foreground">{t('auth.signupTitle')}</h1>
          <p className="text-muted-foreground">{t('auth.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="space-y-1.5">
            <Label htmlFor="firstName">{t('auth.firstName')}</Label>
            <div className="relative">
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.firstName')}
                className={`h-12 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border-auth-border`}
              />
              <User className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <Label htmlFor="lastName">{t('auth.lastName')}</Label>
            <div className="relative">
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.lastName')}
                className={`h-12 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border-auth-border`}
              />
              <User className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.email')}
                className={`h-12 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border-auth-border`}
              />
              <Mail className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('auth.placeholders.password')}
                className={`h-12 ${isRTL ? 'pl-10 pr-3' : 'pr-10 pl-3'} border-auth-border`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute top-1/2 transform -translate-y-1/2 h-auto p-1 hover:bg-transparent ${isRTL ? 'left-2' : 'right-2'}`}
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

          {/* Submit */}
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? t('common.loading') : t('auth.signUp')}
          </Button>

          <div className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('auth.termsText')}
          </div>

          <div className={`text-center text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            <span className="text-foreground">{t('auth.alreadyHaveAccount')}</span>
            <Link to="/login" className="text-foreground hover:underline font-medium">
              {t('auth.signIn')}
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
