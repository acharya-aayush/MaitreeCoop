
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type PersonProps = {
  nameKey: string;
  positionKey: string;
  photo: string;
  contact?: string;
  email?: string;
  locationKey?: string;
  featured?: boolean;
};

const PersonCard: React.FC<PersonProps> = ({ 
  nameKey,
  positionKey,
  photo,
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
          <AvatarImage src={photo} alt={t(nameKey)} className="object-cover" />
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

  // Board members data with translation keys
  const boardMembers = [
    {
      nameKey: "board.boardMembers.members.shankarGautam.name",
      positionKey: "board.boardMembers.members.shankarGautam.position",
      photo: "/images/board/chairman.png",
      contact: "+977 98XXXXXXXX",
      email: "chairman@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.boardMembers.members.khumanandaGhimire.name",
      positionKey: "board.boardMembers.members.khumanandaGhimire.position",
      photo: "/images/board/vice-chairman.png",
      contact: "+977 98XXXXXXXX",
      email: "vicechairman@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.boardMembers.members.hariPokhrel.name",
      positionKey: "board.boardMembers.members.hariPokhrel.position",
      photo: "/images/board/secretary.png",
      contact: "+977 98XXXXXXXX",
      email: "secretary@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.boardMembers.members.omKarki.name",
      positionKey: "board.boardMembers.members.omKarki.position",
      photo: "/images/board/joint-secretary.png",
      contact: "+977 98XXXXXXXX",
      email: "jointsec@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.ramKunwar.name",
      positionKey: "board.boardMembers.members.ramKunwar.position",
      photo: "/images/board/treasurer.png",
      contact: "+977 98XXXXXXXX",
      email: "treasurer@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.boardMembers.members.saritaSunar.name",
      positionKey: "board.boardMembers.members.saritaSunar.position",
      photo: "/images/board/joint-treasurer.png",
      contact: "+977 98XXXXXXXX",
      email: "jointtreasurer@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.jangaNepali.name",
      positionKey: "board.boardMembers.members.jangaNepali.position",
      photo: "/images/board/member-1.png",
      contact: "+977 98XXXXXXXX",
      email: "member1@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.puspaPanthi.name",
      positionKey: "board.boardMembers.members.puspaPanthi.position",
      photo: "/images/board/member-2.png",
      contact: "+977 98XXXXXXXX",
      email: "member2@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.cholrajSharma.name",
      positionKey: "board.boardMembers.members.cholrajSharma.position",
      photo: "/images/board/member-3.png",
      contact: "+977 98XXXXXXXX",
      email: "member3@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.tekKhattri.name",
      positionKey: "board.boardMembers.members.tekKhattri.position",
      photo: "/images/board/member-4.png",
      contact: "+977 98XXXXXXXX",
      email: "member4@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.ritaPanday.name",
      positionKey: "board.boardMembers.members.ritaPanday.position",
      photo: "/images/board/member-5.png",
      contact: "+977 98XXXXXXXX",
      email: "member5@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.jayChudara.name",
      positionKey: "board.boardMembers.members.jayChudara.position",
      photo: "/images/board/member-6.png",
      contact: "+977 98XXXXXXXX",
      email: "member6@maitreecooperative.com",
    },
    {
      nameKey: "board.boardMembers.members.tilachanPandey.name",
      positionKey: "board.boardMembers.members.tilachanPandey.position",
      photo: "/images/board/member-7.png",
      contact: "+977 98XXXXXXXX",
      email: "member7@maitreecooperative.com",
    }
  ];

  // Employees data with translation keys
  const employees = [
    {
      nameKey: "board.staff.employees.arjunAcharya.name",
      positionKey: "board.staff.employees.arjunAcharya.position",
      locationKey: "board.staff.employees.arjunAcharya.location",
      photo: "/images/staff/ceo.png",
      contact: "+977 98XXXXXXXX",
      email: "ceo@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.staff.employees.ghanashyamMarasini.name",
      positionKey: "board.staff.employees.ghanashyamMarasini.position",
      locationKey: "board.staff.employees.ghanashyamMarasini.location",
      photo: "/images/staff/deputy-ceo.png",
      contact: "+977 98XXXXXXXX",
      email: "deputyceo@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.staff.employees.dinnathAcharya.name",
      positionKey: "board.staff.employees.dinnathAcharya.position",
      locationKey: "board.staff.employees.dinnathAcharya.location",
      photo: "/images/staff/account-head.png",
      contact: "+977 98XXXXXXXX",
      email: "accounts@maitreecooperative.com",
      featured: true
    },
    {
      nameKey: "board.staff.employees.laxmiMalla.name",
      positionKey: "board.staff.employees.laxmiMalla.position",
      locationKey: "board.staff.employees.laxmiMalla.location",
      photo: "/images/staff/baletaksar-head.png",
      contact: "+977 98XXXXXXXX",
      email: "baletaksar@maitreecooperative.com",
    },
    {
      nameKey: "board.staff.employees.amarMarasini.name",
      positionKey: "board.staff.employees.amarMarasini.position",
      locationKey: "board.staff.employees.amarMarasini.location",
      photo: "/images/staff/dhurkot-head.png",
      contact: "+977 98XXXXXXXX",
      email: "dhurkot@maitreecooperative.com",
    },
    {
      nameKey: "board.staff.employees.surajPokhrel.name",
      positionKey: "board.staff.employees.surajPokhrel.position",
      locationKey: "board.staff.employees.surajPokhrel.location",
      photo: "/images/staff/kalikanagar-head.png",
      contact: "+977 98XXXXXXXX",
      email: "kalikanagar@maitreecooperative.com",
    },
    {
      nameKey: "board.staff.employees.deviMarasini.name",
      positionKey: "board.staff.employees.deviMarasini.position",
      locationKey: "board.staff.employees.deviMarasini.location",
      photo: "/images/staff/admin-assistant.png",
      contact: "+977 98XXXXXXXX",
      email: "admin@maitreecooperative.com",
    },
    {
      nameKey: "board.staff.employees.krishnaAryal.name",
      positionKey: "board.staff.employees.krishnaAryal.position",
      locationKey: "board.staff.employees.krishnaAryal.location",
      photo: "/images/staff/it-officer.png",
      contact: "+977 98XXXXXXXX",
      email: "it@maitreecooperative.com",
    },
    {
      nameKey: "board.staff.employees.laxmanNepali.name",
      positionKey: "board.staff.employees.laxmanNepali.position",
      locationKey: "board.staff.employees.laxmanNepali.location",
      photo: "/images/staff/staff1.png",
      contact: "+977 98XXXXXXXX",
      email: "laxman@maitreecooperative.com",
    }
  ];

  // Group board members by roles
  const featuredBoardMembers = boardMembers.filter(member => member.featured);
  const regularBoardMembers = boardMembers.filter(member => !member.featured);
  
  // Group employees by roles
  const featuredEmployees = employees.filter(employee => employee.featured);
  const regularEmployees = employees.filter(employee => !employee.featured);

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
          
          {/* Featured board members (Chairman, Vice Chairman, Secretary, Treasurer) */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.boardMembers.executiveCommittee')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBoardMembers.map((member, index) => (
                <PersonCard 
                  key={index}
                  nameKey={member.nameKey}
                  positionKey={member.positionKey}
                  photo={member.photo}
                  contact={member.contact}
                  email={member.email}
                  featured={true}
                />
              ))}
            </div>
          </div>
          
          {/* Regular board members */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.boardMembers.boardMembersTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {regularBoardMembers.map((member, index) => (
                <PersonCard 
                  key={index}
                  nameKey={member.nameKey}
                  positionKey={member.positionKey}
                  photo={member.photo}
                  contact={member.contact}
                  email={member.email}
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
          
          {/* Featured employees (CEO, Deputy CEO, Account Head) */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.staff.managementTeam')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredEmployees.map((employee, index) => (
                <PersonCard 
                  key={index}
                  nameKey={employee.nameKey}
                  positionKey={employee.positionKey}
                  photo={employee.photo}
                  contact={employee.contact}
                  email={employee.email}
                  locationKey={employee.locationKey}
                  featured={true}
                />
              ))}
            </div>
          </div>
          
          {/* Regular employees */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {t('board.staff.branchHeads')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {regularEmployees.map((employee, index) => (
                <PersonCard 
                  key={index}
                  nameKey={employee.nameKey}
                  positionKey={employee.positionKey}
                  photo={employee.photo}
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
