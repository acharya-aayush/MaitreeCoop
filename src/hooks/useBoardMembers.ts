import { useState, useEffect } from 'react';

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

export const useBoardMembers = () => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = () => {
      try {
        const savedMembers = localStorage.getItem('maitree_board_members');
        if (savedMembers) {
          setMembers(JSON.parse(savedMembers));
        } else {
          // Load default members if none exist
          const defaultMembers: BoardMember[] = [
            {
              id: '1',
              name: 'Ram Bahadur Sharma',
              nameNepali: 'राम बहादुर शर्मा',
              position: 'Chairman',
              positionNepali: 'अध्यक्ष',
              email: 'chairman@maitriecoop.com',
              phone: '9841234567',
              bio: 'Experienced leader with 15+ years in cooperative sector, dedicated to community development and financial inclusion.',
              bioNepali: 'सहकारी क्षेत्रमा १५+ वर्षको अनुभव भएका अनुभवी नेता, समुदायिक विकास र वित्तीय समावेशीकरणमा समर्पित।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'board',
              featured: true,
              joinDate: '2020-01-15'
            },
            {
              id: '2',
              name: 'Sita Devi Poudel',
              nameNepali: 'सीता देवी पौडेल',
              position: 'Vice Chairman',
              positionNepali: 'उपाध्यक्ष',
              email: 'vice.chairman@maitriecoop.com',
              phone: '9851234567',
              bio: 'Women empowerment advocate and financial expert with strong background in rural development.',
              bioNepali: 'महिला सशक्तिकरणका वकालत गर्ने र ग्रामीण विकासमा बलियो पृष्ठभूमि भएका वित्तीय विशेषज्ञ।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'board',
              featured: true,
              joinDate: '2020-01-15'
            },
            {
              id: '3',
              name: 'Krishna Prasad Neupane',
              nameNepali: 'कृष्ण प्रसाद न्यौपाने',
              position: 'Secretary',
              positionNepali: 'सचिव',
              email: 'secretary@maitriecoop.com',
              phone: '9861234567',
              bio: 'Administrative expert ensuring smooth operations and regulatory compliance.',
              bioNepali: 'प्रशासनिक विशेषज्ञ जसले सुचारु सञ्चालन र नियामक अनुपालन सुनिश्चित गर्छ।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'board',
              featured: false,
              joinDate: '2020-02-01'
            },
            {
              id: '4',
              name: 'Maya Gurung',
              nameNepali: 'माया गुरुङ',
              position: 'Treasurer',
              positionNepali: 'कोषाध्यक्ष',
              email: 'treasurer@maitriecoop.com',
              phone: '9871234567',
              bio: 'Financial management specialist with expertise in cooperative banking.',
              bioNepali: 'सहकारी बैंकिङमा विशेषज्ञता भएका वित्तीय व्यवस्थापन विशेषज्ञ।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'board',
              featured: false,
              joinDate: '2020-02-01'
            },
            {
              id: '5',
              name: 'Bikash Thapa',
              nameNepali: 'बिकास थापा',
              position: 'General Manager',
              positionNepali: 'महाप्रबन्धक',
              email: 'gm@maitriecoop.com',
              phone: '9881234567',
              bio: 'Strategic leader overseeing daily operations and business development.',
              bioNepali: 'दैनिक सञ्चालन र व्यापारिक विकासको निरीक्षण गर्ने रणनीतिक नेता।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'management',
              featured: true,
              joinDate: '2020-03-01'
            },
            {
              id: '6',
              name: 'Sunita Karki',
              nameNepali: 'सुनिता कार्की',
              position: 'Branch Manager',
              positionNepali: 'शाखा प्रबन्धक',
              email: 'branch.manager@maitriecoop.com',
              phone: '9891234567',
              bio: 'Branch operations expert focused on customer service excellence.',
              bioNepali: 'ग्राहक सेवा उत्कृष्टतामा केन्द्रित शाखा सञ्चालन विशेषज्ञ।',
              photo: '/images/placeholder-avatar.jpg',
              category: 'management',
              featured: false,
              joinDate: '2020-04-01'
            }
          ];
          setMembers(defaultMembers);
          localStorage.setItem('maitree_board_members', JSON.stringify(defaultMembers));
        }
      } catch (error) {
        console.error('Error loading board members:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const boardMembers = members.filter(member => member.category === 'board');
  const managementTeam = members.filter(member => member.category === 'management');
  const staffMembers = members.filter(member => member.category === 'staff');
  const featuredMembers = members.filter(member => member.featured);

  return {
    members,
    boardMembers,
    managementTeam,
    staffMembers,
    featuredMembers,
    loading
  };
};