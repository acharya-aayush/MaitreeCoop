import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Homepage Settings',
      readOnly: true,
      description: 'This is a singleton document for homepage settings'
    }),
    
    // Logo Management
    defineField({
      name: 'logo',
      title: 'Main Logo',
      type: 'image',
      description: 'Upload the main logo for the website. Recommended size: 200x80px or similar aspect ratio',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the logo for accessibility'
        }
      ],
      validation: Rule => Rule.required().error('Logo is required')
    }),
    
    // Member Count
    defineField({
      name: 'memberCount',
      title: 'Total Members Count',
      type: 'number',
      description: 'Current total number of cooperative members (displayed in hero section)',
      validation: Rule => Rule.required().min(1).error('Member count must be at least 1'),
      initialValue: 14800
    }),
    
    defineField({
      name: 'memberCountSuffix',
      title: 'Member Count Display Suffix',
      type: 'string',
      description: 'Suffix to display after member count (e.g., "+", "+")',
      initialValue: '+',
      validation: Rule => Rule.max(5).error('Suffix should be short (max 5 characters)')
    }),
    
    // Member Count in Nepali
    defineField({
      name: 'memberCountNepali',
      title: 'Member Count Label (Nepali)',
      type: 'string',
      description: 'Label for members in Nepali language',
      initialValue: 'सदस्यहरू'
    }),
    
    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When was this information last updated',
      initialValue: () => new Date().toISOString()
    }),
    
    // Notes
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about logo or member count updates',
      rows: 3
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      memberCount: 'memberCount',
      logo: 'logo'
    },
    prepare(selection) {
      const { title, memberCount, logo } = selection
      return {
        title: title || 'Homepage Settings',
        subtitle: `${memberCount || 0} members`,
        media: logo
      }
    }
  }
})