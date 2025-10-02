import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'navbar' | 'button';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className, 
  variant = 'navbar' 
}) => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'np' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isNepali = i18n.language === 'np';

  if (variant === 'button') {
    return (
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className={cn("flex items-center space-x-2", className)}
      >
        <Languages className="h-4 w-4" />
        <span className="font-medium">
          {isNepali ? 'English' : 'नेपाली'}
        </span>
      </Button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "text-gray-700 dark:text-gray-300",
        className
      )}
      title={isNepali ? 'Switch to English' : 'नेपालीमा फेर्नुहोस्'}
    >
      <Languages className="h-4 w-4" />
      <span>{isNepali ? 'EN' : 'नेप'}</span>
    </button>
  );
};

export default LanguageSwitcher;