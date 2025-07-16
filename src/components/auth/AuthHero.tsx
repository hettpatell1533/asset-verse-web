import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    alt: 'Woman using laptop for asset management'
  },
  {
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    alt: 'Laptop computer showing dashboard'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    alt: 'Professional using technology'
  }
];

export const AuthHero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-auth relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-auth" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-16 text-white">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          {t('auth.heroTitle')}
        </h1>
        <p className="text-lg opacity-90 mb-12">
          {t('auth.heroSubtitle')}
        </p>

        {/* Image Slider Container */}
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto bg-black/20 rounded-2xl backdrop-blur-sm overflow-hidden">
            {/* Logo overlay */}
            <div className="absolute top-4 left-4 z-20 bg-black/50 rounded-lg px-3 py-2">
              <div className="text-white text-sm font-bold">MAHER</div>
              <div className="text-white/80 text-xs">Asset Management System</div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="text-white hover:bg-white/10 h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="text-white hover:bg-white/10 h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};