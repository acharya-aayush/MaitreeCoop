
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getAssetPath } from '@/lib/assets';
import { cn } from '@/lib/utils';

type PersonProps = {
  nameKey: string;
  positionKey: string;
  photo: string;
  fallbackPhoto?: string;
  contact?: string;
  email?: string;
  locationKey?: string;
  featured?: boolean;
};

const PersonCard: React.FC<PersonProps> = ({ 
  nameKey,
  positionKey,
  photo,
  fallbackPhoto,
  contact,
  email,
  locationKey,
  featured = false
}) => {
  const { t } = useTranslation();
  
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
            src={photo} 
            alt={t(nameKey)} 
            className="object-cover"
            onError={(e) => {
              if (fallbackPhoto) {
                const target = e.target as HTMLImageElement;
                target.src = fallbackPhoto;
              }
            }}
          />
          <AvatarFallback className={cn(
            "bg-green-100 text-green-700 text-xl font-semibold",
            featured && "text-2xl"
          )}>
            {t(nameKey).charAt(0)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <h3 className={cn(
          "font-bold",
          featured ? "text-xl text-green-700" : "text-lg"
        )}>
          {t(nameKey)}
        </h3>
        <p className="text-green-600 font-medium text-sm mb-3">
          {t(positionKey)}
        </p>
        
        <div className="space-y-1 text-sm">
          {locationKey && (
            <p className="text-gray-600 text-xs">
              {t(locationKey)}
            </p>
          )}
          {contact && (
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="h-3 w-3 mr-1" />
              <span className="text-xs">{contact}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center justify-center text-gray-600">
              <Mail className="h-3 w-3 mr-1" />
              <span className="text-xs">{email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Board = () => {
  const { t } = useTranslation();

  // Board members data organized by hierarchy (without contact info)
  const chairman = {
    nameKey: "board.boardMembers.members.shankarGautam.name",
    positionKey: "board.boardMembers.members.shankarGautam.position",
    photo: getAssetPath("/images/board/chairman.png")
  };

  const keyOfficers = [
    {
      nameKey: "board.boardMembers.members.khumanandaGhimire.name",
      positionKey: "board.boardMembers.members.khumanandaGhimire.position",
      photo: "/images/board/vice-chairman.png"
    },
    {
      nameKey: "board.boardMembers.members.hariPokhrel.name",
      positionKey: "board.boardMembers.members.hariPokhrel.position",
      photo: "/images/board/secretary.png"
    },
    {
      nameKey: "board.boardMembers.members.omKarki.name",
      positionKey: "board.boardMembers.members.omKarki.position",
      photo: "/images/board/joint-secretary.png"
    }
  ];

  const otherBoardMembers = [
    {
      nameKey: "board.boardMembers.members.ramKunwar.name",
      positionKey: "board.boardMembers.members.ramKunwar.position",
      photo: "/images/board/treasurer.png"
    },
    {
      nameKey: "board.boardMembers.members.saritaSunar.name",
      positionKey: "board.boardMembers.members.saritaSunar.position",
      photo: "/images/board/joint-treasurer.png"
    },
    {
      nameKey: "board.boardMembers.members.jangaNepali.name",
      positionKey: "board.boardMembers.members.jangaNepali.position",
      photo: "/images/board/member-1.png"
    },
    {
      nameKey: "board.boardMembers.members.puspaPanthi.name",
      positionKey: "board.boardMembers.members.puspaPanthi.position",
      photo: "/images/board/member-2.png"
    },
    {
      nameKey: "board.boardMembers.members.cholrajSharma.name",
      positionKey: "board.boardMembers.members.cholrajSharma.position",
      photo: "/images/board/member-3.png"
    },
    {
      nameKey: "board.boardMembers.members.tekKhattri.name",
      positionKey: "board.boardMembers.members.tekKhattri.position",
      photo: "/images/board/member-4.png"
    },
    {
      nameKey: "board.boardMembers.members.ritaPanday.name",
      positionKey: "board.boardMembers.members.ritaPanday.position",
      photo: "/images/board/member-5.png"
    },
    {
      nameKey: "board.boardMembers.members.jayChudara.name",
      positionKey: "board.boardMembers.members.jayChudara.position",
      photo: "/images/board/member-6.png"
    },
    {
      nameKey: "board.boardMembers.members.tilachanPandey.name",
      positionKey: "board.boardMembers.members.tilachanPandey.position",
      photo: "/images/board/member-7.png"
    }
  ];

  // Staff data organized by hierarchy with contact info
  const ceo = {
    nameKey: "board.staff.employees.arjunAcharya.name",
    positionKey: "board.staff.employees.arjunAcharya.position",
    locationKey: "board.staff.employees.arjunAcharya.location",
    photo: "/images/staff/ceo.png",
    fallbackPhoto: "/images/logo.png",
    contact: "9857061987",
    email: "acharyaarjun1@gmail.com"
  };

  const seniorManagement = [
    {
      nameKey: "board.staff.employees.ghanashyamMarasini.name",
      positionKey: "board.staff.employees.ghanashyamMarasini.position",
      locationKey: "board.staff.employees.ghanashyamMarasini.location",
      photo: "/images/staff/deputy-ceo.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857049619",
      email: "ghanashyammarasini@gmail.com"
    },
    {
      nameKey: "board.staff.employees.dinnathAcharya.name",
      positionKey: "board.staff.employees.dinnathAcharya.position",
      locationKey: "board.staff.employees.dinnathAcharya.location",
      photo: "/images/staff/account-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857064549",
      email: "dina.acharya549@gmail.com"
    },
    {
      nameKey: "board.staff.employees.krishnaAryal.name",
      positionKey: "board.staff.employees.krishnaAryal.position",
      locationKey: "board.staff.employees.krishnaAryal.location",
      photo: "/images/staff/it-officer.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857064404",
      email: "krishnaaryal404@gmail.com"
    }
  ];

  const otherStaff = [
    {
      nameKey: "board.staff.employees.laxmiMalla.name",
      positionKey: "board.staff.employees.laxmiMalla.position",
      locationKey: "board.staff.employees.laxmiMalla.location",
      photo: "/images/staff/baletaksar-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9847570662",
      email: "laxmimalla331@gmail.com"
    },
    {
      nameKey: "board.staff.employees.amarMarasini.name",
      positionKey: "board.staff.employees.amarMarasini.position",
      locationKey: "board.staff.employees.amarMarasini.location",
      photo: "/images/staff/dhurkot-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857076519",
      email: "marasini.amar@gmail.com"
    },
    {
      nameKey: "board.staff.employees.surajPokhrel.name",
      positionKey: "board.staff.employees.surajPokhrel.position",
      locationKey: "board.staff.employees.surajPokhrel.location",
      photo: "/images/staff/kalikanagar-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857064684",
      email: "isurajpokhrel@gmail.com"
    },
    {
      nameKey: "board.staff.employees.sushilPokhrel.name",
      positionKey: "board.staff.employees.sushilPokhrel.position",
      locationKey: "board.staff.employees.sushilPokhrel.location",
      photo: "/images/staff/purkot-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9847574773",
      email: "sushilpokhrel31@gmail.com"
    },
    {
      nameKey: "board.staff.employees.ashokPanthi.name",
      positionKey: "board.staff.employees.ashokPanthi.position",
      locationKey: "board.staff.employees.ashokPanthi.location",
      photo: "/images/staff/aapchaur-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9840458536",
      email: "panthia099@gmail.com"
    },
    {
      nameKey: "board.staff.employees.dharmendraChaudhary.name",
      positionKey: "board.staff.employees.dharmendraChaudhary.position",
      locationKey: "board.staff.employees.dharmendraChaudhary.location",
      photo: "/images/staff/kapilvastu-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9867400139",
      email: "dc.tharu.nepal@gmail.com"
    },
    {
      nameKey: "board.staff.employees.ghanashyamMarasiniSandhikharka.name",
      positionKey: "board.staff.employees.ghanashyamMarasiniSandhikharka.position",
      locationKey: "board.staff.employees.ghanashyamMarasiniSandhikharka.location",
      photo: "/images/staff/sandhikharka-head.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9857049619",
      email: "ghanashyammarasini@gmail.com"
    },
    {
      nameKey: "board.staff.employees.deviMarasini.name",
      positionKey: "board.staff.employees.deviMarasini.position",
      locationKey: "board.staff.employees.deviMarasini.location",
      photo: "/images/staff/admin-assistant.png",
      fallbackPhoto: "/images/logo.png",
      contact: "9844753699",
      email: "admin@maitreecooperative.com"
    },
    {
      nameKey: "board.staff.employees.laxmanNepali.name",
      positionKey: "board.staff.employees.laxmanNepali.position",
      locationKey: "board.staff.employees.laxmanNepali.location",
      photo: "/images/staff/staff-1.png",
      fallbackPhoto: "/images/logo.png",
      contact: "+977 98XXXXXXXX",
      email: "laxman@maitreecooperative.com"
    }
  ];

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
          
          {/* Chairman - Featured and alone at the top */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <PersonCard 
                  nameKey={chairman.nameKey}
                  positionKey={chairman.positionKey}
                  photo={chairman.photo}
                  featured={true}
                />
              </div>
            </div>
          </div>
          
          {/* Key Officers - Vice Chairman, Secretary, Joint Secretary */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {keyOfficers.map((member, index) => (
                <PersonCard 
                  key={index}
                  nameKey={member.nameKey}
                  positionKey={member.positionKey}
                  photo={member.photo}
                  featured={false}
                />
              ))}
            </div>
          </div>
          
          {/* Other Board Members */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {otherBoardMembers.map((member, index) => (
                <PersonCard 
                  key={index}
                  nameKey={member.nameKey}
                  positionKey={member.positionKey}
                  photo={member.photo}
                />
              ))}
            </div>
          </div>
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
          
          {/* CEO - Featured and alone at the top */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <PersonCard 
                  nameKey={ceo.nameKey}
                  positionKey={ceo.positionKey}
                  photo={ceo.photo}
                  fallbackPhoto={ceo.fallbackPhoto}
                  contact={ceo.contact}
                  email={ceo.email}
                  locationKey={ceo.locationKey}
                  featured={true}
                />
              </div>
            </div>
          </div>
          
          {/* Senior Management - Deputy CEO, Account Head, IT Officer */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.staff.managementTeam')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {seniorManagement.map((employee, index) => (
                <PersonCard 
                  key={index}
                  nameKey={employee.nameKey}
                  positionKey={employee.positionKey}
                  photo={employee.photo}
                  fallbackPhoto={employee.fallbackPhoto}
                  contact={employee.contact}
                  email={employee.email}
                  locationKey={employee.locationKey}
                  featured={false}
                />
              ))}
            </div>
          </div>
          
          {/* Other Staff */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.staff.branchHeads')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {otherStaff.map((employee, index) => (
                <PersonCard 
                  key={index}
                  nameKey={employee.nameKey}
                  positionKey={employee.positionKey}
                  photo={employee.photo}
                  fallbackPhoto={employee.fallbackPhoto}
                  contact={employee.contact}
                  email={employee.email}
                  locationKey={employee.locationKey}
                />
              ))}
            </div>
          </div>
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
