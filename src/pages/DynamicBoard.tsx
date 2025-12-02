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
          <AvatarImage src={member.photo || "/images/logo1.png"} alt={member.name} className="object-cover" />
          <AvatarFallback className="bg-white">
            <img src="/images/logo1.png" alt="Maitree Cooperative" className="w-full h-full object-contain p-2" />
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
  const { boardMembers, managementTeam, staffMembers, featuredMembers, loading } = useBoardMembers();
  const isNepali = i18n.language === 'np';

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

          {/* Featured Members */}
          {featuredMembers.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
                {isNepali ? 'मुख्य व्यक्तित्वहरू' : 'Leadership Team'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredMembers.map((member) => (
                  <PersonCard key={member.id} member={member} featured={true} />
                ))}
              </div>
            </section>
          )}

          {/* Board Members */}
          {boardMembers.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
                {isNepali ? 'बोर्ड सदस्यहरू' : 'Board Members'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {boardMembers.filter(member => !member.featured).map((member) => (
                  <PersonCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* Management Team */}
          {managementTeam.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
                {isNepali ? 'व्यवस्थापन टोली' : 'Management Team'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {managementTeam.filter(member => !member.featured).map((member) => (
                  <PersonCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* Staff Members */}
          {staffMembers.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
                {isNepali ? 'कर्मचारीहरू' : 'Staff Members'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {staffMembers.map((member) => (
                  <PersonCard key={member.id} member={member} />
                ))}
              </div>
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
          {boardMembers.length === 0 && managementTeam.length === 0 && staffMembers.length === 0 && (
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