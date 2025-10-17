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
          {title: 'Manager', value: 'manager'},
          {title: 'Assistant Manager', value: 'assistant_manager'},
          {title: 'Officer', value: 'officer'},
          {title: 'Senior Officer', value: 'senior_officer'},
          {title: 'Accountant', value: 'accountant'},
          {title: 'Cashier', value: 'cashier'},
          {title: 'Branch Head', value: 'branch_head'},
          {title: 'IT Officer', value: 'it_officer'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required().error('Position is required')
    }),
    
    defineField({
      name: 'postNepali',
      title: 'Position in Nepali',
      type: 'string',
      description: 'पद नेपालीमा'
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
      title: 'Work Location',
      type: 'string',
      validation: Rule => Rule.required().error('Work location is required'),
      description: 'Branch office or work location'
    }),
    
    defineField({
      name: 'locationNepali',
      title: 'Work Location in Nepali',
      type: 'string',
      description: 'कार्यक्षेत्र नेपालीमा'
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
      description: 'Order in which to display (1 = first). CEO is always 1.',
      validation: Rule => Rule.required().min(1).error('Display order is required and must be at least 1'),
      initialValue: ({document}) => {
        // Auto-assign based on post
        if (document?.post === 'ceo') return 1;
        return 2; // Default for others
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