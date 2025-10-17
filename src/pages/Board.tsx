
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { client, queries, getImageUrl } from '@/lib/sanity';

interface BoardMember {
  _id: string;
  name: string;
  nameNepali?: string;
  photo?: any;
  photoUrl?: string;
  post: 'chairman' | 'vice-chairman' | 'secretary' | 'joint-secretary' | 'treasurer' | 'joint-treasurer' | 'member' | 'custom';
  postNepali?: string;
  customPost?: string;
  customPostNepali?: string;
  displayOrder: number;
  isChairman: boolean;
  isViceChairman: boolean;
  phone?: string;
  email?: string;
  notes?: string;
}

interface StaffMember {
  _id: string;
  name: string;
  nameNepali?: string;
  photo?: any;
  post: 'ceo' | 'deputy-ceo' | 'account-head' | 'it-officer' | 'branch-manager' | 'assistant-manager' | 'loan-officer' | 'cashier' | 'field-assistant' | 'admin-staff' | 'security' | 'cleaner' | 'custom';
  postNepali?: string;
  customPost?: string;
  customPostNepali?: string;
  location?: 'main-office' | 'baletaksar' | 'dhurkot' | 'kalikanagar' | 'purkot' | 'aapchaur' | 'kapilvastu' | 'sandhikharka' | 'custom';
  locationNepali?: string;
  phone: string;
  email: string;
  displayOrder: number;
  isCEO: boolean;
  department?: 'management' | 'finance' | 'operations' | 'hr' | 'it' | 'marketing' | 'branch-operations' | 'admin';
}

type PersonCardProps = {
  person: BoardMember | StaffMember;
  isStaff?: boolean;
  featured?: boolean;
};

const PersonCard: React.FC<PersonCardProps> = ({ 
  person,
  isStaff = false,
  featured = false
}) => {
  const { t, i18n } = useTranslation();
  
  const getDisplayName = () => {
    if (i18n.language === 'ne' && person.nameNepali) {
      return person.nameNepali;
    }
    return person.name;
  };

  const getDisplayPosition = () => {
    // Handle custom positions first
    if (person.post === 'custom') {
      if (i18n.language === 'ne' && person.customPostNepali) {
        return person.customPostNepali;
      }
      return person.customPost || person.post;
    }
    
    // Handle predefined positions with translations or default formatting
    if (i18n.language === 'ne' && person.postNepali) {
      return person.postNepali;
    }
    
    // Create proper sentence case for English positions
    const positionMap = {
      'chairman': 'Chairman',
      'vice-chairman': 'Vice Chairman',
      'secretary': 'Secretary',
      'joint-secretary': 'Joint Secretary',
      'treasurer': 'Treasurer',
      'joint-treasurer': 'Joint Treasurer',
      'member': 'Member',
      'ceo': 'Chief Executive Officer',
      'deputy-ceo': 'Deputy CEO',
      'account-head': 'Account Head',
      'it-officer': 'IT Officer',
      'branch-manager': 'Branch Manager',
      'assistant-manager': 'Assistant Manager',
      'loan-officer': 'Loan Officer',
      'cashier': 'Cashier',
      'field-assistant': 'Field Assistant',
      'admin-staff': 'Admin Staff',
      'security': 'Security',
      'cleaner': 'Cleaner'
    };
    
    return positionMap[person.post] || person.post.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getDisplayLocation = () => {
    if (!isStaff || !('location' in person)) return null;
    
    const staffPerson = person as StaffMember;
    if (!staffPerson.location) return null;
    
    if (i18n.language === 'ne' && staffPerson.locationNepali) {
      return staffPerson.locationNepali;
    }
    
    return t(`locations.${staffPerson.location}`, staffPerson.location);
  };

  const photoUrl = (person as any).photoUrl || (person.photo ? getImageUrl(person.photo) : null);
  

  

  
  return (
    <Card className={cn(
      "h-full glass-card hover-card transition-all duration-300",
      featured && "border-green-500 shadow-md bg-gradient-to-b from-green-50/50 to-white"
    )}>
      <CardHeader className="p-4 flex items-center justify-center">
        <Avatar className={cn(
          "w-24 h-24 border-2 border-white shadow-md",
          featured && "w-28 h-28 md:w-36 md:h-36 border-green-200"
        )}>
          <AvatarImage 
            src={photoUrl || "/images/logo.png"} 
            alt={getDisplayName()} 
            className="object-cover"
          />
          <AvatarFallback className={cn(
            "bg-green-100 text-green-700 text-xl font-semibold",
            featured && "text-2xl"
          )}>
            {getDisplayName().charAt(0)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <h3 className={cn(
          "font-bold",
          featured ? "text-xl text-green-700" : "text-lg"
        )}>
          {getDisplayName()}
        </h3>
        <p className="text-green-600 font-medium text-sm mb-3">
          {getDisplayPosition()}
        </p>
        
        <div className="space-y-1 text-sm">
          {getDisplayLocation() && (
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="text-xs">{getDisplayLocation()}</span>
            </div>
          )}
          {isStaff && 'phone' in person && person.phone && (
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="h-3 w-3 mr-1" />
              <span className="text-xs">{person.phone}</span>
            </div>
          )}
          {isStaff && 'email' in person && person.email && (
            <div className="flex items-center justify-center text-gray-600">
              <Mail className="h-3 w-3 mr-1" />
              <span className="text-xs break-all">{person.email}</span>
            </div>
          )}
          {!isStaff && person.phone && (
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="h-3 w-3 mr-1" />
              <span className="text-xs">{person.phone}</span>
            </div>
          )}
          {!isStaff && person.email && (
            <div className="flex items-center justify-center text-gray-600">
              <Mail className="h-3 w-3 mr-1" />
              <span className="text-xs break-all">{person.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Board = () => {
  const { t } = useTranslation();
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [boardData, staffData] = await Promise.all([
          client.fetch(queries.boardMembers),
          client.fetch(queries.staffMembers)
        ]);
        
        setBoardMembers(boardData || []);
        setStaffMembers(staffData || []);
      } catch (error) {
        console.error('Error fetching board/staff data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Organize board members
  const chairman = boardMembers.find(member => member.isChairman);
  const keyOfficers = boardMembers.filter(member => 
    !member.isChairman && 
    ['vice-chairman', 'secretary', 'joint-secretary'].includes(member.post)
  );
  const otherBoardMembers = boardMembers.filter(member =>
    !member.isChairman &&
    !['vice-chairman', 'secretary', 'joint-secretary'].includes(member.post)
  );

  // Organize staff members
  const ceo = staffMembers.find(member => member.isCEO);
  const seniorManagement = staffMembers.filter(member => 
    !member.isCEO && 
    ['deputy-ceo', 'account-head', 'it-officer'].includes(member.post)
  );
  const otherStaff = staffMembers.filter(member =>
    !member.isCEO && 
    !['deputy-ceo', 'account-head', 'it-officer'].includes(member.post)
  );

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('board.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('board.subtitle')}
          </p>
        </div>
      </div>
      
      {/* Board Members Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('board.leadership')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {t('board.boardMembers.title')}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {t('board.boardMembers.description')}
            </p>
          </div>
          
          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading board members...</p>
            </div>
          )}
          
          {/* Chairman - Featured and alone at the top */}
          {!loading && chairman && (
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <PersonCard 
                    person={chairman}
                    featured={true}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Key Officers - Vice Chairman, Secretary, Joint Secretary */}
          {!loading && keyOfficers.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {keyOfficers.map((member) => (
                  <PersonCard 
                    key={member._id}
                    person={member}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Other Board Members */}
          {!loading && otherBoardMembers.length > 0 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {otherBoardMembers.map((member) => (
                  <PersonCard 
                    key={member._id}
                    person={member}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Empty state for board members */}
          {!loading && boardMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No board members found. Please add some in the CMS.</p>
            </div>
          )}
        </div>
      </section>
      
      <Separator className="max-w-5xl mx-auto bg-green-100" />
      
      {/* Employees Section */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('board.operations')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {t('board.staff.title')}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {t('board.staff.description')}
            </p>
          </div>
          
          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading staff members...</p>
            </div>
          )}
          
          {/* CEO - Featured and alone at the top */}
          {!loading && ceo && (
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <PersonCard 
                    person={ceo}
                    isStaff={true}
                    featured={true}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Senior Management - Deputy CEO, Account Head, IT Officer */}
          {!loading && seniorManagement.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
                {t('board.staff.managementTeam')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {seniorManagement.map((employee) => (
                  <PersonCard 
                    key={employee._id}
                    person={employee}
                    isStaff={true}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Other Staff */}
          {!loading && otherStaff.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
                {t('board.staff.branchHeads')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {otherStaff.map((employee) => (
                  <PersonCard 
                    key={employee._id}
                    person={employee}
                    isStaff={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Empty state for staff */}
          {!loading && staffMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No staff members found. Please add some in the CMS.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Organization Structure - Kept from the original */}
      <section className="py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('board.structure')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {t('board.organizationalStructure.title')}
            </h2>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <div className="flex flex-col items-center">
              {/* General Assembly */}
              <div className="bg-green-600 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{t('board.organizationalStructure.generalAssembly.title')}</h3>
                <p className="text-sm">{t('board.organizationalStructure.generalAssembly.subtitle')}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Board of Directors */}
              <div className="bg-green-500 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{t('board.organizationalStructure.boardOfDirectors.title')}</h3>
                <p className="text-sm">{t('board.organizationalStructure.boardOfDirectors.subtitle')}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Executive Management */}
              <div className="bg-green-400 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{t('board.organizationalStructure.executiveManagement.title')}</h3>
                <p className="text-sm">{t('board.organizationalStructure.executiveManagement.subtitle')}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Departments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{t('board.organizationalStructure.departments.finance')}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{t('board.organizationalStructure.departments.memberServices')}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{t('board.organizationalStructure.departments.agriculturalServices')}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{t('board.organizationalStructure.departments.administration')}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Board;
