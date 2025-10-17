// Script to populate Sanity with original board members and staff
const { createClient } = require('@sanity/client');
const fs = require('fs');

// Create the Sanity client - we'll try without token first for read/write
const client = createClient({
  projectId: 'w4d9v3bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  // Try without token first
});

// Original Board Members Data
const boardMembersData = [
  {
    name: "Shankar Gautam",
    nameNepali: "शङ्कर गौतम",
    post: "chairman",
    isChairman: true,
    isViceChairman: false,
    displayOrder: 1,
    isActive: true
  },
  {
    name: "Khumananda Ghimire", 
    nameNepali: "खुमानन्द घिमिरे",
    post: "vice-chairman",
    isChairman: false,
    isViceChairman: true,
    displayOrder: 2,
    isActive: true
  },
  {
    name: "Hari Pokhrel",
    nameNepali: "हरि पोखरेल",
    post: "secretary",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 3,
    isActive: true
  },
  {
    name: "Om Karki",
    nameNepali: "ओम कार्की",
    post: "joint-secretary",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 4,
    isActive: true
  },
  {
    name: "Ram Kunwar",
    nameNepali: "राम कुँवर",
    post: "treasurer",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 5,
    isActive: true
  },
  {
    name: "Sarita Sunar",
    nameNepali: "सरिता सुनार",
    post: "joint-treasurer",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 6,
    isActive: true
  },
  {
    name: "Janga Nepali",
    nameNepali: "जङ्गा नेपाली",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 7,
    isActive: true
  },
  {
    name: "Puspa Panthi",
    nameNepali: "पुष्पा पन्थी",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 8,
    isActive: true
  },
  {
    name: "Cholraj Sharma",
    nameNepali: "चोलराज शर्मा",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 9,
    isActive: true
  },
  {
    name: "Tek Khattri",
    nameNepali: "टेक खत्री",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 10,
    isActive: true
  },
  {
    name: "Rita Panday",
    nameNepali: "रिता पाण्डे",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 11,
    isActive: true
  },
  {
    name: "Jay Chudara",
    nameNepali: "जय चुडारा",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 12,
    isActive: true
  },
  {
    name: "Tilachan Pandey",
    nameNepali: "तिलाचन पाण्डे",
    post: "member",
    isChairman: false,
    isViceChairman: false,
    displayOrder: 13,
    isActive: true
  }
];

// Original Staff Members Data
const staffMembersData = [
  {
    name: "Arjun Acharya",
    nameNepali: "अर्जुन आचार्य",
    post: "ceo",
    location: "main-office",
    phone: "9857061987",
    email: "acharyaarjun1@gmail.com",
    displayOrder: 1,
    isCEO: true,
    isActive: true,
    department: "management"
  },
  {
    name: "Ghanashyam Marasini",
    nameNepali: "घनश्याम मरासिनी",
    post: "deputy-ceo",
    location: "main-office",
    phone: "9857049619",
    email: "ghanashyammarasini@gmail.com",
    displayOrder: 2,
    isCEO: false,
    isActive: true,
    department: "management"
  },
  {
    name: "Dinnath Acharya",
    nameNepali: "दिन्नाथ आचार्य",
    post: "account-head",
    location: "main-office",
    phone: "9857064549",
    email: "dina.acharya549@gmail.com",
    displayOrder: 3,
    isCEO: false,
    isActive: true,
    department: "finance"
  },
  {
    name: "Krishna Aryal",
    nameNepali: "कृष्ण अर्याल",
    post: "it-officer",
    location: "main-office",
    phone: "9857064404",
    email: "krishnaaryal404@gmail.com",
    displayOrder: 4,
    isCEO: false,
    isActive: true,
    department: "it"
  },
  {
    name: "Laxmi Malla",
    nameNepali: "लक्ष्मी मल्ल",
    post: "branch-manager",
    location: "baletaksar",
    phone: "9847570662",
    email: "laxmimalla331@gmail.com",
    displayOrder: 5,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Amar Marasini",
    nameNepali: "अमर मरासिनी",
    post: "branch-manager",
    location: "dhurkot",
    phone: "9857076519",
    email: "marasini.amar@gmail.com",
    displayOrder: 6,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Suraj Pokhrel",
    nameNepali: "सुरज पोखरेल",
    post: "branch-manager",
    location: "kalikanagar",
    phone: "9857064684",
    email: "isurajpokhrel@gmail.com",
    displayOrder: 7,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Sushil Pokhrel",
    nameNepali: "सुशील पोखरेल",
    post: "branch-manager",
    location: "purkot",
    phone: "9847574773",
    email: "sushilpokhrel31@gmail.com",
    displayOrder: 8,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Ashok Panthi",
    nameNepali: "अशोक पन्थी",
    post: "branch-manager",
    location: "aapchaur",
    phone: "9840458536",
    email: "panthia099@gmail.com",
    displayOrder: 9,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Dharmendra Chaudhary",
    nameNepali: "धर्मेन्द्र चौधरी",
    post: "branch-manager",
    location: "kapilvastu",
    phone: "9867400139",
    email: "dc.tharu.nepal@gmail.com",
    displayOrder: 10,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Ghanashyam Marasini",
    nameNepali: "घनश्याम मरासिनी",
    post: "branch-manager",
    location: "sandhikharka",
    phone: "9857049619",
    email: "ghanashyammarasini@gmail.com",
    displayOrder: 11,
    isCEO: false,
    isActive: true,
    department: "branch-operations"
  },
  {
    name: "Devi Marasini",
    nameNepali: "देवी मरासिनी",
    post: "admin-staff",
    location: "main-office",
    phone: "9844753699",
    email: "admin@maitreecooperative.com",
    displayOrder: 12,
    isCEO: false,
    isActive: true,
    department: "admin"
  },
  {
    name: "Laxman Nepali",
    nameNepali: "लक्ष्मण नेपाली",
    post: "field-assistant",
    location: "main-office",
    phone: "9857064000",
    email: "laxman@maitreecooperative.com",
    displayOrder: 13,
    isCEO: false,
    isActive: true,
    department: "operations"
  }
];

// Function to create board members
async function createBoardMembers() {
  console.log('Creating board members...');
  
  for (const member of boardMembersData) {
    try {
      const result = await client.create({
        _type: 'boardMember',
        ...member
      });
      console.log(`✓ Created board member: ${member.name}`);
    } catch (error) {
      console.error(`✗ Failed to create board member ${member.name}:`, error);
    }
  }
}

// Function to create staff members
async function createStaffMembers() {
  console.log('Creating staff members...');
  
  for (const member of staffMembersData) {
    try {
      const result = await client.create({
        _type: 'staffMember',
        ...member
      });
      console.log(`✓ Created staff member: ${member.name}`);
    } catch (error) {
      console.error(`✗ Failed to create staff member ${member.name}:`, error);
    }
  }
}

// Main function to populate all data
async function populateData() {
  try {
    console.log('🚀 Starting data population...');
    await createBoardMembers();
    await createStaffMembers();
    console.log('✅ Data population completed successfully!');
  } catch (error) {
    console.error('❌ Error during data population:', error);
  }
}

// Run the script
populateData();