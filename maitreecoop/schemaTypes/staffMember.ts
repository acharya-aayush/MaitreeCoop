import {defineField, defineType} from 'sanity'

export const staffMember = defineType({
  name: 'staffMember',
  title: 'Staff Members',
  type: 'document',
  
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().error('Name is required')
    }),
    
    defineField({
      name: 'nameNepali',
      title: 'Name in Nepali',
      type: 'string',
      description: 'पूरा नाम नेपालीमा'
    }),
    
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      validation: Rule => Rule.required().error('Profile photo is required'),
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text'
        }
      ]
    }),
    
    defineField({
      name: 'post',
      title: 'Position/Post',
      type: 'string',
      options: {
        list: [
          {title: 'CEO (Chief Executive Officer)', value: 'ceo'},
          {title: 'Deputy CEO', value: 'deputy-ceo'},
          {title: 'Account Head', value: 'account-head'},
          {title: 'IT Officer', value: 'it-officer'},
          {title: 'Branch Manager', value: 'branch-manager'},
          {title: 'Assistant Manager', value: 'assistant-manager'},
          {title: 'Loan Officer', value: 'loan-officer'},
          {title: 'Cashier', value: 'cashier'},
          {title: 'Senior Administrative Assistant', value: 'senior-admin-assistant'},
          {title: 'Field Assistant', value: 'field-assistant'},
          {title: 'Admin Staff', value: 'admin-staff'},
          {title: 'Security', value: 'security'},
          {title: 'Cleaner', value: 'cleaner'},
          {title: 'Custom', value: 'custom'}
        ]
      },
      validation: Rule => Rule.required().error('Position is required'),
      initialValue: 'admin-staff'
    }),
    
    defineField({
      name: 'postNepali',
      title: 'Position in Nepali (Auto-generated)',
      type: 'string',
      description: 'पद नेपालीमा (स्वचालित)',
      readOnly: true,
      initialValue: (params) => {
        const postTranslations = {
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
        const post = params?.parent?.post as keyof typeof postTranslations;
        return postTranslations[post] || '';
      }
    }),
    
    defineField({
      name: 'customPost',
      title: 'Custom Position Title',
      type: 'string',
      description: 'Use this if you selected "Other" above',
      hidden: ({parent}) => parent?.post !== 'other'
    }),
    
    defineField({
      name: 'customPostNepali',
      title: 'Custom Position in Nepali',
      type: 'string',
      description: 'Custom position in Nepali',
      hidden: ({parent}) => parent?.post !== 'other'
    }),
    
    defineField({
      name: 'location',
      title: 'Work Location/Branch',
      type: 'string',
      options: {
        list: [
          {title: 'Main Office', value: 'main-office'},
          {title: 'Baletaksar Branch', value: 'baletaksar'},
          {title: 'Dhurkot Branch', value: 'dhurkot'},
          {title: 'Kalikanagar Branch', value: 'kalikanagar'},
          {title: 'Purkot Branch', value: 'purkot'},
          {title: 'Aapchaur Branch', value: 'aapchaur'},
          {title: 'Kapilvastu Branch', value: 'kapilvastu'},
          {title: 'Sandhikharka Branch', value: 'sandhikharka'},
          {title: 'Custom Location', value: 'custom'}
        ]
      },
      validation: Rule => Rule.required().error('Work location is required'),
      description: 'Branch office or work location',
      initialValue: 'main-office'
    }),
    
    defineField({
      name: 'locationNepali',
      title: 'Location in Nepali (Auto-generated)',
      type: 'string',
      description: 'कार्यक्षेत्र नेपालीमा (स्वचालित)',
      readOnly: true,
      initialValue: (params) => {
        const locationTranslations = {
          'main-office': 'मुख्य कार्यालय',
          'baletaksar': 'बालेटकसार शाखा',
          'dhurkot': 'धुर्कोट शाखा',
          'kalikanagar': 'कालिकानगर शाखा',
          'purkot': 'पुर्कोट शाखा',
          'aapchaur': 'आपचौर शाखा',
          'kapilvastu': 'कपिलवस्तु शाखा',
          'sandhikharka': 'सन्धिखर्क शाखा',
          'custom': 'अन्य स्थान'
        };
        const location = params?.parent?.location as keyof typeof locationTranslations;
        return locationTranslations[location] || '';
      }
    }),
    
    defineField({
      name: 'customLocation',
      title: 'Custom Location Name',
      type: 'string',
      description: 'Enter custom location if "Custom Location" is selected above',
      hidden: ({parent}) => parent?.location !== 'custom'
    }),
    
    defineField({
      name: 'customLocationNepali',
      title: 'Custom Location in Nepali',
      type: 'string',
      description: 'Custom location name in Nepali',
      hidden: ({parent}) => parent?.location !== 'custom'
    }),
    
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required().error('Phone number is required for staff members')
    }),
    
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email().error('Valid email address is required for staff members')
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower number = higher position)',
      validation: Rule => Rule.required().min(1).error('Display order is required and must be at least 1'),
      initialValue: (params) => {
        // Auto-assign hierarchical order based on post
        const orderMap = {
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
        const post = params?.parent?.post as keyof typeof orderMap;
        return orderMap[post] || 50;
      }
    }),
    
    defineField({
      name: 'isCEO',
      title: 'Is CEO',
      type: 'boolean',
      description: 'Mark as CEO (only one allowed)',
      initialValue: false,
      readOnly: ({parent}) => parent?.post !== 'ceo'
    }),
    
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Administration', value: 'administration'},
          {title: 'Finance', value: 'finance'},
          {title: 'Operations', value: 'operations'},
          {title: 'IT/Technology', value: 'it'},
          {title: 'Customer Service', value: 'customer_service'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Branch Operations', value: 'branch_operations'},
          {title: 'Other', value: 'other'}
        ]
      }
    }),
    
    defineField({
      name: 'isActive',
      title: 'Active Staff Member',
      type: 'boolean',
      description: 'Only active staff members will be displayed on the website',
      initialValue: true
    }),
    
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes (not displayed on website)',
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'post',
      description: 'location',
      media: 'photo'
    },
    prepare({title, subtitle, description, media}) {
      // Show custom post if it's "other"
      const postDisplay = subtitle === 'other' ? 'Custom Position' : subtitle?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      
      return {
        title: title || 'Untitled',
        subtitle: `${postDisplay} - ${description}` || 'No position',
        media: media
      }
    }
  },
  
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Position (CEO First)',
      name: 'positionOrder',
      by: [
        {field: 'isCEO', direction: 'desc'},
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Department',
      name: 'department',
      by: [
        {field: 'department', direction: 'asc'},
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
})