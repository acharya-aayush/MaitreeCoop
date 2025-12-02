
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TeamMemberProps {
  name: {
    en: string;
    np: string;
  };
  position: {
    en: string;
    np: string;
  };
  imageSrc: string;
  contact?: string;
  email?: string;
  location?: {
    np: string;
  };
  language: 'en' | 'np';
  delay?: number;
  featured?: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  position, 
  imageSrc, 
  contact,
  email,
  location,
  language,
  delay = 0,
  featured = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const memberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (memberRef.current) observer.unobserve(memberRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (memberRef.current) {
      observer.observe(memberRef.current);
    }

    return () => {
      if (memberRef.current) observer.unobserve(memberRef.current);
    };
  }, [delay]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={memberRef}
      className={cn(
        "glass-card rounded-xl overflow-hidden hover-card transition-all duration-700 h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        featured && "border-green-500 shadow-md bg-gradient-to-b from-green-50/50 to-white"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-4 flex flex-col items-center">
        <Avatar className={cn(
          "w-24 h-24 border-2 border-white shadow-md mb-4",
          featured && "w-28 h-28 md:w-32 md:h-32 border-green-200"
        )}>
          <AvatarImage src={imageSrc || "/images/logo1.png"} alt={name[language]} className="object-cover" />
          <AvatarFallback className="bg-white">
            <img src="/images/logo1.png" alt="Maitree Cooperative" className="w-full h-full object-contain p-2" />
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h3 className={cn(
            "font-bold",
            featured ? "text-xl text-green-700" : "text-lg"
          )}>
            {name[language]}
          </h3>
          
          <p className="text-green-600 font-medium text-sm mb-3">
            {position[language]}
          </p>
          
          {featured && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2">
              {language === 'en' ? 'Executive' : 'कार्यकारी'}
            </Badge>
          )}
          
          <div className="space-y-1 text-sm mt-2">
            {location && (
              <p className="text-gray-600 text-xs">
                {location.np}
              </p>
            )}
            
            {contact && (
              <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contact}
              </p>
            )}
            
            {email && (
              <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
