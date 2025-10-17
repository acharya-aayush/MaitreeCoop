// Staff Position Display Utilities

export interface StaffMember {
  post: string;
  postNepali?: string;
  customPost?: string;
  customPostNepali?: string;
  location: string;
  locationNepali?: string;
  customLocation?: string;
  customLocationNepali?: string;
  displayOrder: number;
  isCEO: boolean;
}

// Staff position mappings with automatic Nepali translations
const staffPositionMap: Record<string, string> = {
  'ceo': 'Chief Executive Officer',
  'deputy-ceo': 'Deputy CEO',
  'account-head': 'Account Head',
  'it-officer': 'IT Officer',
  'branch-manager': 'Branch Manager',
  'assistant-manager': 'Assistant Manager',
  'loan-officer': 'Loan Officer',
  'cashier': 'Cashier',
  'senior-admin-assistant': 'Senior Administrative Assistant',
  'field-assistant': 'Field Assistant',
  'admin-staff': 'Admin Staff',
  'security': 'Security',
  'cleaner': 'Cleaner',
  'custom': 'Other'
};

const staffPositionMapNepali: Record<string, string> = {
  'ceo': 'मुख्य कार्यकारी अधिकृत',
  'deputy-ceo': 'उप मुख्य कार्यकारी अधिकृत',
  'account-head': 'लेखा प्रमुख',
  'it-officer': 'सूचना प्रविधि अधिकृत',
  'branch-manager': 'शाखा प्रबन्धक',
  'assistant-manager': 'सहायक प्रबन्धक',
  'loan-officer': 'ऋण अधिकृत',
  'cashier': 'खजान्ची',
  'senior-admin-assistant': 'वरिष्ठ प्रशासनिक सहायक',
  'field-assistant': 'क्षेत्रीय सहायक',
  'admin-staff': 'प्रशासनिक कर्मचारी',
  'security': 'सुरक्षा गार्ड',
  'cleaner': 'सफाई कर्मचारी',
  'custom': 'अन्य'
};

// Location mappings
const locationMap: Record<string, string> = {
  'main-office': 'Main Office',
  'baletaksar': 'Baletaksar',
  'dhurkot': 'Dhurkot',
  'kalikanagar': 'Kalikanagar',
  'purkot': 'Purkot',
  'aapchaur': 'Aapchaur',
  'kapilvastu': 'Kapilvastu',
  'sandhikharka': 'Sandhikharka',
  'custom': 'Custom Location'
};

const locationMapNepali: Record<string, string> = {
  'main-office': 'मुख्य कार्यालय',
  'baletaksar': 'बालेटकसार',
  'dhurkot': 'धुर्कोट',
  'kalikanagar': 'कालिकानगर',
  'purkot': 'पुर्कोट',
  'aapchaur': 'आपचौर',
  'kapilvastu': 'कपिलवस्तु',
  'sandhikharka': 'सन्धिखर्क',
  'custom': 'अन्य स्थान'
};

/**
 * Get display position for staff members with special handling for branch managers
 */
export const getStaffDisplayPosition = (member: StaffMember, isNepali: boolean = false): string => {
  const { post, customPost, location, customLocation, postNepali, customPostNepali } = member;
  
  // Handle custom positions
  if (post === 'custom') {
    if (isNepali) {
      return customPostNepali || customPost || 'अन्य';
    }
    return customPost || 'Other';
  }
  
  // Special handling for branch managers - show "Location Branch Head"
  if (post === 'branch-manager') {
    const locationName = location === 'custom' 
      ? (isNepali ? (member.customLocationNepali || member.customLocation) : member.customLocation)
      : (isNepali ? locationMapNepali[location] : locationMap[location]);
    
    if (isNepali) {
      return `${locationName} शाखा प्रमुख`;
    } else {
      return `${locationName} Branch Head`;
    }
  }
  
  // Regular positions
  if (isNepali) {
    return postNepali || staffPositionMapNepali[post] || post;
  }
  
  return staffPositionMap[post] || post;
};

/**
 * Get location display name
 */
export const getLocationDisplay = (member: StaffMember, isNepali: boolean = false): string => {
  const { location, customLocation, locationNepali, customLocationNepali } = member;
  
  if (location === 'custom') {
    if (isNepali) {
      return customLocationNepali || customLocation || 'अन्य स्थान';
    }
    return customLocation || 'Custom Location';
  }
  
  if (isNepali) {
    return locationNepali || locationMapNepali[location] || location;
  }
  
  return locationMap[location] || location;
};

/**
 * Check if position is senior level (CEO, Deputy CEO, Account Head, IT Officer)
 */
export const isSeniorPosition = (post: string): boolean => {
  return ['ceo', 'deputy-ceo', 'account-head', 'it-officer'].includes(post);
};

/**
 * Get position hierarchy order for sorting
 */
export const getPositionOrder = (post: string): number => {
  const orderMap: Record<string, number> = {
    'ceo': 1,
    'deputy-ceo': 2,
    'account-head': 3,
    'it-officer': 4,
    'branch-manager': 5,
    'assistant-manager': 6,
    'loan-officer': 7,
    'cashier': 8,
    'senior-admin-assistant': 9,
    'field-assistant': 10,
    'admin-staff': 11,
    'security': 12,
    'cleaner': 13,
    'custom': 99
  };
  
  return orderMap[post] || 50;
};