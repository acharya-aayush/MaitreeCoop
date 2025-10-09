import React from 'react';
import { Phone, Mail, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { Link } from 'react-router-dom';

interface BoardMember {
  id: string;
  name: string;
  nameNepali: string;
  position: string;
  positionNepali: string;
  email: string;
  phone: string;
  bio: string;
  bioNepali: string;
  photo: string;
  category: 'board' | 'management' | 'staff';
  featured: boolean;
  joinDate: string;
}

const PersonCard: React.FC<{ member: BoardMember; featured?: boolean }> = ({ 
  member,
  featured = false
}) => {
  const { i18n } = useTranslation();
  const isNepali = i18n.language === 'np';
  
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg",
      featured && "border-green-500 shadow-md bg-gradient-to-b from-green-50/50 to-white"
    )}>
      <CardHeader className="p-6 flex items-center justify-center">
        <Avatar className={cn(
          "w-24 h-24 border-2 border-white shadow-md",
          featured && "w-28 h-28 md:w-36 md:h-36 border-green-200"
        )}>
          <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
          <AvatarFallback className={cn(
            "bg-green-100 text-green-700 text-xl font-semibold",
            featured && "text-2xl"
          )}>
            {member.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 text-center space-y-3">
        <div>
          <h3 className={cn(
            "font-semibold text-gray-900",
            featured ? "text-lg md:text-xl" : "text-base"
          )}>
            {isNepali && member.nameNepali ? member.nameNepali : member.name}
          </h3>
          <p className={cn(
            "text-green-600 font-medium",
            featured ? "text-base" : "text-sm"
          )}>
            {isNepali && member.positionNepali ? member.positionNepali : member.position}
          </p>
        </div>
        
        {(member.bio || member.bioNepali) && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {isNepali && member.bioNepali ? member.bioNepali : member.bio}
          </p>
        )}
        
        <div className="space-y-2 pt-2">
          {member.phone && (
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              <a href={`tel:${member.phone}`} className="hover:text-green-600 transition-colors">
                {member.phone}
              </a>
            </div>
          )}
          
          {member.email && (
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2 text-green-600" />
              <a href={`mailto:${member.email}`} className="hover:text-green-600 transition-colors">
                {member.email}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DynamicBoard = () => {
  const { t, i18n } = useTranslation();
  const { boardMembers, managementTeam, staffMembers, loading } = useBoardMembers();
  const isNepali = i18n.language === 'np';

  // Hierarchy for Board Members
  const getPositionPriority = (position: string) => {
    const pos = position.toLowerCase();
    if (pos.includes('chairman') || pos.includes('अध्यक्ष')) return 1;
    if (pos.includes('vice chairman') || pos.includes('उपाध्यक्ष')) return 2;
    if (pos.includes('secretary') || pos.includes('सचिव')) return 3;
    if (pos.includes('joint secretary') || pos.includes('सह सचिव')) return 4;
    if (pos.includes('treasurer') || pos.includes('कोषाध्यक्ष')) return 5;
    return 6; // Other board members
  };

  // Hierarchy for Staff Members
  const getStaffPriority = (position: string) => {
    const pos = position.toLowerCase();
    if (pos.includes('ceo') || pos.includes('chief executive') || pos.includes('मुख्य कार्यकारी')) return 1;
    if (pos.includes('deputy ceo') || pos.includes('उप मुख्य कार्यकारी')) return 2;
    if (pos.includes('account head') || pos.includes('लेखा प्रमुख')) return 3;
    if (pos.includes('it officer') || pos.includes('आईटी अधिकृत')) return 4;
    if (pos.includes('manager') || pos.includes('प्रबन्धक')) return 5;
    return 6; // Other staff
  };

  // Sort board members by hierarchy
  const sortedBoardMembers = [...boardMembers].sort((a, b) => {
    return getPositionPriority(a.position) - getPositionPriority(b.position);
  });

  // Sort staff members by hierarchy
  const sortedStaffMembers = [...managementTeam, ...staffMembers].sort((a, b) => {
    return getStaffPriority(a.position) - getStaffPriority(b.position);
  });

  // Get specific positions for special layout
  const chairman = sortedBoardMembers.find(member => 
    member.position.toLowerCase().includes('chairman') || 
    member.position.toLowerCase().includes('अध्यक्ष')
  );
  
  const topThreeBoard = sortedBoardMembers.filter(member => {
    const pos = member.position.toLowerCase();
    return (pos.includes('vice chairman') || pos.includes('उपाध्यक्ष') ||
            pos.includes('secretary') || pos.includes('सचिव') ||
            pos.includes('joint secretary') || pos.includes('सह सचिव'));
  }).slice(0, 3);

  const otherBoardMembers = sortedBoardMembers.filter(member => 
    !chairman || member.id !== chairman.id
  ).filter(member => 
    !topThreeBoard.find(topMember => topMember.id === member.id)
  );

  const ceo = sortedStaffMembers.find(member => 
    member.position.toLowerCase().includes('ceo') || 
    member.position.toLowerCase().includes('chief executive') ||
    member.position.toLowerCase().includes('मुख्य कार्यकारी')
  );

  const topThreeStaff = sortedStaffMembers.filter(member => {
    const pos = member.position.toLowerCase();
    return (pos.includes('deputy ceo') || pos.includes('उप मुख्य कार्यकारी') ||
            pos.includes('account head') || pos.includes('लेखा प्रमुख') ||
            pos.includes('it officer') || pos.includes('आईटी अधिकृत'));
  }).slice(0, 3);

  const otherStaffMembers = sortedStaffMembers.filter(member => 
    !ceo || member.id !== ceo.id
  ).filter(member => 
    !topThreeStaff.find(topMember => topMember.id === member.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading board members...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="page-header text-center">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {t('board.title')}
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('board.intro')}
                </p>
              </div>
              
              {/* Admin Link */}
              <Link to="/admin/board">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
          </div>

          {/* Board Members Section */}
          {sortedBoardMembers.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
                {isNepali ? 'बोर्ड सदस्यहरू' : 'Board Members'}
              </h2>

              {/* Chairman - Top Row Alone */}
              {chairman && (
                <div className="mb-12">
                  <div className="flex justify-center">
                    <div className="max-w-sm">
                      <PersonCard member={chairman} featured={true} />
                    </div>
                  </div>
                </div>
              )}

              {/* Top 3 Board Members - Second Row */}
              {topThreeBoard.length > 0 && (
                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {topThreeBoard.map((member) => (
                      <PersonCard key={member.id} member={member} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Board Members */}
              {otherBoardMembers.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {otherBoardMembers.map((member) => (
                      <PersonCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Staff Members Section */}
          {sortedStaffMembers.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
                {isNepali ? 'कर्मचारी टोली' : 'Staff Team'}
              </h2>

              {/* CEO - Top Row Alone */}
              {ceo && (
                <div className="mb-12">
                  <div className="flex justify-center">
                    <div className="max-w-sm">
                      <PersonCard member={ceo} featured={true} />
                    </div>
                  </div>
                </div>
              )}

              {/* Top 3 Staff - Second Row */}
              {topThreeStaff.length > 0 && (
                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {topThreeStaff.map((member) => (
                      <PersonCard key={member.id} member={member} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Staff Members */}
              {otherStaffMembers.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {otherStaffMembers.map((member) => (
                      <PersonCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Mobile Admin Link */}
          <div className="md:hidden text-center mt-12">
            <Link to="/admin/board">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Manage Board Members
              </Button>
            </Link>
          </div>

          {/* No Members Message */}
          {sortedBoardMembers.length === 0 && sortedStaffMembers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No board members found.</p>
              <Link to="/admin/board">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Add Board Members
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DynamicBoard;