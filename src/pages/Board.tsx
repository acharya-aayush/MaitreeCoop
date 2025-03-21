
import React, { useState } from 'react';
import { Phone, Mail, Languages } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Language = 'en' | 'np';

type PersonProps = {
  name: { en: string; np: string };
  position: { en: string; np: string };
  photo: string;
  contact?: string;
  email?: string;
  location?: { np: string };
  language: Language;
  featured?: boolean;
};

const PersonCard: React.FC<PersonProps> = ({ 
  name,
  position,
  photo,
  contact,
  email,
  location,
  language,
  featured = false
}) => (
  <Card className={cn(
    "h-full glass-card hover-card transition-all duration-300",
    featured && "border-green-500 shadow-md bg-gradient-to-b from-green-50/50 to-white"
  )}>
    <CardHeader className="p-4 flex items-center justify-center">
      <Avatar className={cn(
        "w-24 h-24 border-2 border-white shadow-md",
        featured && "w-28 h-28 md:w-36 md:h-36 border-green-200"
      )}>
        <AvatarImage src={photo} alt={name[language]} className="object-cover" />
        <AvatarFallback className={cn(
          "bg-green-100 text-green-700 text-xl font-semibold",
          featured && "text-2xl"
        )}>
          {name[language].charAt(0)}
        </AvatarFallback>
      </Avatar>
    </CardHeader>
    <CardContent className="p-4 text-center">
      <h3 className={cn(
        "font-bold",
        featured ? "text-xl text-green-700" : "text-lg"
      )}>
        {name[language]}
      </h3>
      <p className="text-green-600 font-medium text-sm mb-3">
        {position[language]}
      </p>
      
      <div className="space-y-1 text-sm">
        {location && (
          <p className="text-gray-600 text-xs">
            {location.np}
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

const Board = () => {
  const [language, setLanguage] = useState<Language>('en');

  // Board members data
  const boardMembers = [
    {
      name: { en: "Shankar Prasad Gautam", np: "शकंरप्रसाद गौतम" },
      position: { en: "Chairman", np: "अध्यक्ष" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "chairman@maitreecooperative.com",
      featured: true
    },
    {
      name: { en: "Khumananda Ghimire", np: "खुमानन्द घिमिरे" },
      position: { en: "Vice Chairman", np: "उपाध्यक्ष" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "vicechairman@maitreecooperative.com",
      featured: true
    },
    {
      name: { en: "Hari Prasad Pokhrel", np: "हरिप्रसाद पोेखरेल" },
      position: { en: "Secretary", np: "सचिव" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "secretary@maitreecooperative.com",
      featured: true
    },
    {
      name: { en: "Om Bahadur Karki", np: "ओमबहादुर कार्की" },
      position: { en: "Joint Secretary", np: "सह–सचिव" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "jointsec@maitreecooperative.com",
    },
    {
      name: { en: "Ram Bahadur Kunwar", np: "रामबहादुर कुँवर" },
      position: { en: "Treasurer", np: "कोषाध्यक्ष" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "treasurer@maitreecooperative.com",
      featured: true
    },
    {
      name: { en: "Sarita Sunar Bishowkarma", np: "सरिता सुनार विश्वकर्मा" },
      position: { en: "Joint Treasurer", np: "सह–कोषाध्यक्ष" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "jointtreasurer@maitreecooperative.com",
    },
    {
      name: { en: "Janga Bahadur Nepali", np: "जङ्गबहादुर नेपाली" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member1@maitreecooperative.com",
    },
    {
      name: { en: "Puspa Panthi", np: "पुष्पा पन्थी" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member2@maitreecooperative.com",
    },
    {
      name: { en: "Cholraj Sharma", np: "चोलराज शर्मा" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member3@maitreecooperative.com",
    },
    {
      name: { en: "Tek Bahadur Khattri", np: "टेकबहादुर खत्री" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member4@maitreecooperative.com",
    },
    {
      name: { en: "Rita Panday", np: "रिता पाण्डे" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member5@maitreecooperative.com",
    },
    {
      name: { en: "Jay Bahadur Chudara", np: "जयबहादुर चुँदरा" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member6@maitreecooperative.com",
    },
    {
      name: { en: "Tilachan Pandey", np: "तिलाचन पाण्डे" },
      position: { en: "Board Member", np: "सदस्य" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "member7@maitreecooperative.com",
    }
  ];

  // Employees data
  const employees = [
    {
      name: { en: "Arjun Prasad Acharya", np: "अर्जुनप्रसाद आचार्य" },
      position: { en: "Chief Executive Officer", np: "प्रमुख कार्यकारी अधिकृत" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "ceo@maitreecooperative.com",
      location: { np: "रेसुङ्गा – १, गुल्मी" },
      featured: true
    },
    {
      name: { en: "Ghanashyam Marasini", np: "घनश्याम मरासिनी" },
      position: { en: "Deputy Chief Executive Officer", np: "उप–प्रमुख कार्यकारी अधिकृत" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "deputyceo@maitreecooperative.com",
      location: { np: "गुल्मी" },
      featured: true
    },
    {
      name: { en: "Dinnath Acharya", np: "दिननाथ आचार्य" },
      position: { en: "Account Head", np: "लेखा प्रमुख" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "accounts@maitreecooperative.com",
      location: { np: "गुल्मी" },
      featured: true
    },
    {
      name: { en: "Laxmi Malla", np: "लक्ष्मी मल्ल" },
      position: { en: "Baletaksar Branch Head", np: "बलेटक्सार सेवा केन्द्र प्रमुख" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "baletaksar@maitreecooperative.com",
      location: { np: "गुल्मी" }
    },
    {
      name: { en: "Amar Marasini", np: "अमर मरासिनी" },
      position: { en: "Dhurkot Branch Head", np: "धुर्कोट सेवा केन्द्र प्रमुख" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "dhurkot@maitreecooperative.com",
      location: { np: "गुल्मी" }
    },
    {
      name: { en: "Jiblal Lamsal", np: "जिवलाल लम्साल" },
      position: { en: "Khairani Branch Head", np: "खैरेनी सेवा केन्द्र प्रमुख" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "khairani@maitreecooperative.com",
      location: { np: "गुल्मी" }
    },
    {
      name: { en: "Suraj Pokhrel", np: "सूरज पोखरेल" },
      position: { en: "Kalikanagar Branch Head", np: "कालिकानगर सेवा केन्द्र प्रमुख" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "kalikanagar@maitreecooperative.com",
      location: { np: "गुल्मी" }
    },
    {
      name: { en: "Devi Marasini", np: "देवी मरासिनी" },
      position: { en: "Senior Administrative Assistant", np: "वरिष्ठ प्रशासन सहायक" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "admin@maitreecooperative.com",
      location: { np: "गुल्मी" }
    },
    {
      name: { en: "Krishna Aryal", np: "कृष्ण अर्याल" },
      position: { en: "I.T. Officer", np: "सूचना तथा प्रविधि अधिकृत" },
      photo: "",
      contact: "+977 98XXXXXXXX",
      email: "it@maitreecooperative.com",
      location: { np: "गुल्मी" }
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
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {language === 'en' ? 'Board Members & Staff' : 'निर्देशक समिति र कर्मचारीहरू'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Meet the dedicated team leading and operating our cooperative.' 
              : 'हाम्रो सहकारी संचालन गर्ने समर्पित टोलीसँग परिचित हुनुहोस्।'}
          </p>
          
          {/* Language toggle */}
          <div className="mt-6 flex justify-center">
            <Toggle 
              pressed={language === 'np'} 
              onPressedChange={() => setLanguage(prev => prev === 'en' ? 'np' : 'en')}
              className="flex items-center space-x-2 bg-white border border-green-200 px-4 py-2 rounded-full"
            >
              <Languages className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'नेपालीमा हेर्नुहोस्' : 'View in English'}
              </span>
            </Toggle>
          </div>
        </div>
      </div>
      
      {/* Board Members Section */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {language === 'en' ? 'Leadership' : 'नेतृत्व'}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {language === 'en' ? 'Our Board of Directors' : 'हाम्रो निर्देशक समिति'}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'The board members are elected by our members and are responsible for setting the strategic direction and ensuring good governance of the cooperative.'
                : 'निर्देशक समितिका सदस्यहरू हाम्रा सदस्यहरूद्वारा निर्वाचित हुन्छन् र सहकारीको रणनीतिक दिशा निर्धारण गर्न र सुशासन सुनिश्चित गर्न जिम्मेवार छन्।'}
            </p>
          </div>
          
          {/* Featured board members (Chairman, Vice Chairman, Secretary, Treasurer) */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {language === 'en' ? 'Executive Committee' : 'कार्यकारी समिति'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBoardMembers.map((member, index) => (
                <PersonCard 
                  key={index}
                  name={member.name}
                  position={member.position}
                  photo={member.photo}
                  contact={member.contact}
                  email={member.email}
                  language={language}
                  featured={true}
                />
              ))}
            </div>
          </div>
          
          {/* Regular board members */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {language === 'en' ? 'Board Members' : 'समितिका सदस्यहरू'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {regularBoardMembers.map((member, index) => (
                <PersonCard 
                  key={index}
                  name={member.name}
                  position={member.position}
                  photo={member.photo}
                  contact={member.contact}
                  email={member.email}
                  language={language}
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
              {language === 'en' ? 'Operations' : 'संचालन'}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {language === 'en' ? 'Our Staff' : 'हाम्रा कर्मचारीहरू'}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Our dedicated staff members work tirelessly to provide excellent service to our members and implement the cooperative\'s programs.'
                : 'हाम्रा समर्पित कर्मचारीहरूले हाम्रा सदस्यहरूलाई उत्कृष्ट सेवा प्रदान गर्न र सहकारीका कार्यक्रमहरू कार्यान्वयन गर्न अथक परिश्रम गर्दछन्।'}
            </p>
          </div>
          
          {/* Featured employees (CEO, Deputy CEO, Account Head) */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {language === 'en' ? 'Management Team' : 'व्यवस्थापन टोली'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredEmployees.map((employee, index) => (
                <PersonCard 
                  key={index}
                  name={employee.name}
                  position={employee.position}
                  photo={employee.photo}
                  contact={employee.contact}
                  email={employee.email}
                  location={employee.location}
                  language={language}
                  featured={true}
                />
              ))}
            </div>
          </div>
          
          {/* Regular employees */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-6 text-center">
              {language === 'en' ? 'Branch Heads & Support Staff' : 'शाखा प्रमुखहरू र सहयोगी कर्मचारीहरू'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {regularEmployees.map((employee, index) => (
                <PersonCard 
                  key={index}
                  name={employee.name}
                  position={employee.position}
                  photo={employee.photo}
                  contact={employee.contact}
                  email={employee.email}
                  location={employee.location}
                  language={language}
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
              {language === 'en' ? 'Structure' : 'संरचना'}
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              {language === 'en' ? 'Organizational Structure' : 'संगठनात्मक संरचना'}
            </h2>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <div className="flex flex-col items-center">
              {/* General Assembly */}
              <div className="bg-green-600 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{language === 'en' ? 'General Assembly' : 'साधारण सभा'}</h3>
                <p className="text-sm">{language === 'en' ? 'All Members' : 'सबै सदस्यहरू'}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Board of Directors */}
              <div className="bg-green-500 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{language === 'en' ? 'Board of Directors' : 'निर्देशक समिति'}</h3>
                <p className="text-sm">{language === 'en' ? '13 Elected Members' : '१३ निर्वाचित सदस्यहरू'}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Executive Management */}
              <div className="bg-green-400 text-white p-4 rounded-lg w-64 text-center mb-8">
                <h3 className="font-bold">{language === 'en' ? 'Executive Management' : 'कार्यकारी व्यवस्थापन'}</h3>
                <p className="text-sm">{language === 'en' ? 'CEO & Department Heads' : 'सिईओ र विभाग प्रमुखहरू'}</p>
              </div>
              
              {/* Arrow down */}
              <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
              <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-r-8 border-r-transparent mb-2"></div>
              
              {/* Departments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{language === 'en' ? 'Finance' : 'वित्त'}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{language === 'en' ? 'Member Services' : 'सदस्य सेवाहरू'}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{language === 'en' ? 'Agricultural Services' : 'कृषि सेवाहरू'}</h4>
                </div>
                <div className="bg-green-300 p-3 rounded-lg text-center">
                  <h4 className="font-bold text-sm">{language === 'en' ? 'Administration' : 'प्रशासन'}</h4>
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
