import {defineField, defineType} from 'sanity'

export const boardMember = defineType({
  name: 'boardMember',
  title: 'Board Members',
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
          {title: 'Chairman', value: 'chairman'},
          {title: 'Vice Chairman', value: 'vice-chairman'},
          {title: 'Secretary', value: 'secretary'},
          {title: 'Joint Secretary', value: 'joint-secretary'},
          {title: 'Treasurer', value: 'treasurer'},
          {title: 'Joint Treasurer', value: 'joint-treasurer'},
          {title: 'Member', value: 'member'},
          {title: 'Custom', value: 'custom'}
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
      description: 'Use this if you selected "Custom" above',
      hidden: ({parent}) => parent?.post !== 'custom'
    }),
    
    defineField({
      name: 'customPostNepali',
      title: 'Custom Position in Nepali',
      type: 'string',
      description: 'Custom position in Nepali',
      hidden: ({parent}) => parent?.post !== 'other'
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (1 = first). Chairman is always 1, Vice Chairman is always 2.',
      validation: Rule => Rule.required().min(1).error('Display order is required and must be at least 1'),
      initialValue: ({document}) => {
        // Auto-assign based on post
        if (document?.post === 'chairman') return 1;
        if (document?.post === 'vice_chairman') return 2;
        return 3; // Default for others
      }
    }),
    
    defineField({
      name: 'isChairman',
      title: 'Is Chairman',
      type: 'boolean',
      description: 'Mark as Chairman (only one allowed)',
      initialValue: false,
      readOnly: ({parent}) => parent?.post !== 'chairman'
    }),
    
    defineField({
      name: 'isViceChairman', 
      title: 'Is Vice Chairman',
      type: 'boolean',
      description: 'Mark as Vice Chairman',
      initialValue: false,
      readOnly: ({parent}) => parent?.post !== 'vice_chairman'
    }),
    
    // Optional contact information
    defineField({
      name: 'phone',
      title: 'Phone Number (Optional)',
      type: 'string',
      description: 'Contact phone number (optional for board members)'
    }),
    
    defineField({
      name: 'email',
      title: 'Email Address (Optional)',
      type: 'string',
      description: 'Contact email address (optional for board members)',
      validation: Rule => Rule.email().error('Please enter a valid email address')
    }),
    
    defineField({
      name: 'isActive',
      title: 'Active Member',
      type: 'boolean',
      description: 'Only active members will be displayed on the website',
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
      media: 'photo'
    },
    prepare({title, subtitle, media}) {
      // Show custom post if it's "other"
      const postDisplay = subtitle === 'other' ? 'Custom Position' : subtitle?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      
      return {
        title: title || 'Untitled',
        subtitle: postDisplay || 'No position',
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
      title: 'Position (Chairman First)',
      name: 'positionOrder',
      by: [
        {field: 'isChairman', direction: 'desc'},
        {field: 'isViceChairman', direction: 'desc'},
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