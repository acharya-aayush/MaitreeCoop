import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/sanity';
import { useTranslation } from 'react-i18next';

interface Announcement {
  _id: string;
  title: string;
  titleNepali?: string;
  type: string;
  priority: 'high' | 'medium' | 'normal' | 'low';
  contentType: 'text' | 'image' | 'rich';
  content?: string;
  contentNepali?: string;
  noticeImage?: any;
  displaySettings: {
    showOnLoad: boolean;
    delaySeconds: number;
    allowDismiss: boolean;
    rememberDismissal: boolean;
    displayDuration: number;
  };
  timing: {
    startDate: string;
    endDate?: string;
  };
  relatedLink?: {
    linkText: string;
    linkTextNepali?: string;
    url: string;
    openInNewTab: boolean;
  };
}

interface AnnouncementModalProps {
  announcements: Announcement[];
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ announcements }) => {
  const { t, i18n } = useTranslation();
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Priority colors
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'normal': return 'border-green-500 bg-green-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  // Type icons
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'notice': '📢',
      'event': '🎉',
      'alert': '🚨',
      'meeting': '📋',
      'financial': '💰',
      'celebration': '🎊',
      'news': '📰',
      'achievement': '🏆'
    };
    return icons[type] || '📢';
  };

  // Check localStorage for dismissed announcements
  const isDismissed = (announcementId: string) => {
    const dismissed = localStorage.getItem(`announcement_dismissed_${announcementId}`);
    return dismissed === 'true';
  };

  // Mark announcement as dismissed
  const markAsDismissed = (announcementId: string) => {
    localStorage.setItem(`announcement_dismissed_${announcementId}`, 'true');
  };

  // Find the next active announcement to show
  useEffect(() => {
    if (!announcements || announcements.length === 0) return;

    // Filter out dismissed announcements and find the highest priority one
    const activeAnnouncement = announcements.find(ann => 
      ann.displaySettings.showOnLoad && 
      (!ann.displaySettings.rememberDismissal || !isDismissed(ann._id))
    );

    if (activeAnnouncement) {
      const delay = activeAnnouncement.displaySettings.delaySeconds * 1000;
      
      const timer = setTimeout(() => {
        setCurrentAnnouncement(activeAnnouncement);
        setIsVisible(true);

        // Auto-hide if duration is set
        if (activeAnnouncement.displaySettings.displayDuration > 0) {
          setTimeout(() => {
            setIsVisible(false);
          }, activeAnnouncement.displaySettings.displayDuration * 1000);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [announcements]);

  const handleClose = () => {
    if (currentAnnouncement?.displaySettings.rememberDismissal) {
      markAsDismissed(currentAnnouncement._id);
    }
    setIsVisible(false);
    setCurrentAnnouncement(null);
  };

  const handleLinkClick = () => {
    if (currentAnnouncement?.relatedLink?.url) {
      if (currentAnnouncement.relatedLink.openInNewTab) {
        window.open(currentAnnouncement.relatedLink.url, '_blank');
      } else {
        window.location.href = currentAnnouncement.relatedLink.url;
      }
    }
  };

  if (!isVisible || !currentAnnouncement) return null;

  const displayTitle = i18n.language === 'ne' && currentAnnouncement.titleNepali 
    ? currentAnnouncement.titleNepali 
    : currentAnnouncement.title;

  const displayContent = i18n.language === 'ne' && currentAnnouncement.contentNepali 
    ? currentAnnouncement.contentNepali 
    : currentAnnouncement.content;

  const displayLinkText = i18n.language === 'ne' && currentAnnouncement.relatedLink?.linkTextNepali 
    ? currentAnnouncement.relatedLink.linkTextNepali 
    : currentAnnouncement.relatedLink?.linkText;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-2xl max-h-[90vh] overflow-auto
          ${getPriorityStyles(currentAnnouncement.priority)}
          border-4 animate-in fade-in-0 zoom-in-95 duration-300
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon(currentAnnouncement.type)}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{displayTitle}</h2>
              <p className="text-sm text-gray-600 capitalize">{currentAnnouncement.type} • {currentAnnouncement.priority} priority</p>
            </div>
          </div>
          
          {/* Pin Icon (decorative) */}
          <div className="flex items-center space-x-2">
            <Pin className="h-6 w-6 text-gray-400 transform rotate-45" />
            {currentAnnouncement.displaySettings.allowDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="hover:bg-gray-100 p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Content */}
          {(currentAnnouncement.contentType === 'image' || currentAnnouncement.contentType === 'rich') && 
           currentAnnouncement.noticeImage && (
            <div className="mb-4">
              <img
                src={getImageUrl(currentAnnouncement.noticeImage) || ''}
                alt={displayTitle}
                className="w-full h-auto rounded-lg border-2 border-gray-200 shadow-md"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Text Content */}
          {(currentAnnouncement.contentType === 'text' || currentAnnouncement.contentType === 'rich') && 
           displayContent && (
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {displayContent}
              </p>
            </div>
          )}

          {/* Action Button */}
          {currentAnnouncement.relatedLink?.url && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleLinkClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                {displayLinkText || 'Learn More'}
                {currentAnnouncement.relatedLink.openInNewTab && (
                  <ExternalLink className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-2xl">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Valid until: {new Date(currentAnnouncement.timing.endDate || '').toLocaleDateString()}
            </span>
            {currentAnnouncement.displaySettings.allowDismiss && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="text-xs px-3 py-1"
              >
                {t('dismiss', 'Dismiss')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;