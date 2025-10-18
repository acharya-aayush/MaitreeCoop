import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcements & Notices',
  type: 'document',
  icon: () => '',
  fields: [
    defineField({
      name: 'title',
      title: 'Announcement Title',
      type: 'string',
      description: 'Title for this announcement/notice',
      validation: Rule => Rule.required().min(5).max(100).error('Title must be between 5-100 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Title (Nepali)',
      type: 'string',
      description: 'Title in Nepali language'
    }),
    
    defineField({
      name: 'type',
      title: 'Announcement Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Notice', value: 'notice' },
          { title: 'Event Announcement', value: 'event' },
          { title: 'Important Alert', value: 'alert' },
          { title: 'Meeting Notice', value: 'meeting' },
          { title: 'Financial Notice', value: 'financial' },
          { title: 'Celebration', value: 'celebration' },
          { title: 'News Update', value: 'news' },
          { title: 'Achievement', value: 'achievement' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'notice'
    }),
    
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          { title: 'High Priority (Red)', value: 'high' },
          { title: 'Medium Priority (Yellow)', value: 'medium' },
          { title: 'Normal Priority (Green)', value: 'normal' },
          { title: 'Low Priority (Blue)', value: 'low' }
        ]
      },
      initialValue: 'normal'
    }),
    
    // Content Options
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text Content', value: 'text' },
          { title: 'Image Notice', value: 'image' },
          { title: 'Rich Content (Text + Image)', value: 'rich' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'text'
    }),
    
    // Text Content
    defineField({
      name: 'content',
      title: 'Announcement Content',
      type: 'text',
      description: 'Main content of the announcement (English)',
      rows: 5,
      hidden: ({ parent }) => parent?.contentType === 'image'
    }),
    
    defineField({
      name: 'contentNepali',
      title: 'Content (Nepali)',
      type: 'text',
      description: 'Content in Nepali language',
      rows: 5,
      hidden: ({ parent }) => parent?.contentType === 'image'
    }),
    
    // Image Content
    defineField({
      name: 'noticeImage',
      title: 'Notice Image',
      type: 'image',
      description: 'Upload notice image (for image-based announcements)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility'
        }
      ],
      hidden: ({ parent }) => parent?.contentType === 'text',
      validation: Rule => Rule.custom((image, context) => {
        const contentType = (context as any)?.parent?.contentType
        if ((contentType === 'image' || contentType === 'rich') && !image) {
          return 'Image is required for image or rich content types'
        }
        return true
      })
    }),
    
    // Display Settings
    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showOnLoad',
          title: 'Show on Page Load',
          type: 'boolean',
          description: 'Display this announcement when users visit the website',
          initialValue: true
        }),
        defineField({
          name: 'delaySeconds',
          title: 'Delay (seconds)',
          type: 'number',
          description: 'How many seconds to wait before showing (0 = immediate)',
          validation: Rule => Rule.min(0).max(30),
          initialValue: 2,
          hidden: ({ parent }) => !parent?.showOnLoad
        }),
        defineField({
          name: 'allowDismiss',
          title: 'Allow Dismissal',
          type: 'boolean',
          description: 'Allow users to close this announcement',
          initialValue: true
        }),
        defineField({
          name: 'rememberDismissal',
          title: 'Remember When Dismissed',
          type: 'boolean',
          description: 'Don\'t show again if user dismisses it (until expiry)',
          initialValue: true,
          hidden: ({ parent }) => !parent?.allowDismiss
        }),
        defineField({
          name: 'displayDuration',
          title: 'Auto-hide After (seconds)',
          type: 'number',
          description: 'Automatically hide after X seconds (0 = manual close only)',
          validation: Rule => Rule.min(0),
          initialValue: 0
        })
      ]
    }),
    
    // Timing Settings
    defineField({
      name: 'timing',
      title: 'Timing Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'startDate',
          title: 'Start Date & Time',
          type: 'datetime',
          description: 'When should this announcement start showing',
          validation: Rule => Rule.required(),
          initialValue: () => new Date().toISOString()
        }),
        defineField({
          name: 'endDate',
          title: 'End Date & Time',
          type: 'datetime',
          description: 'When should this announcement stop showing',
          validation: Rule => Rule.min(Rule.valueOfField('startDate')).error('End date must be after start date')
        }),
        defineField({
          name: 'timeZone',
          title: 'Time Zone',
          type: 'string',
          description: 'Time zone for the dates',
          initialValue: 'Asia/Kathmandu',
          options: {
            list: [
              { title: 'Nepal Time (Asia/Kathmandu)', value: 'Asia/Kathmandu' },
              { title: 'UTC', value: 'UTC' },
              { title: 'India Time (Asia/Kolkata)', value: 'Asia/Kolkata' }
            ]
          }
        })
      ]
    }),
    
    // Target Audience
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'All Visitors', value: 'all' },
          { title: 'Members Only', value: 'members' },
          { title: 'Staff Only', value: 'staff' },
          { title: 'Board Members', value: 'board' },
          { title: 'New Visitors', value: 'new_visitors' }
        ]
      },
      initialValue: ['all']
    }),
    
    // Publication Settings
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this announcement currently active?',
      initialValue: true
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order when multiple announcements are active (lower = higher priority)',
      validation: Rule => Rule.min(1),
      initialValue: 1
    }),
    
    // Link to related content
    defineField({
      name: 'relatedLink',
      title: 'Related Link',
      type: 'object',
      description: 'Optional link to related page or external URL',
      fields: [
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          description: 'Text for the link button'
        }),
        defineField({
          name: 'linkTextNepali',
          title: 'Link Text (Nepali)',
          type: 'string'
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'External URL or internal path (e.g., /services, /news)'
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false
        })
      ]
    }),
    
    // Admin Notes
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
      description: 'Who created this announcement?'
    }),
    
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this announcement',
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      type: 'type',
      priority: 'priority',
      isActive: 'isActive',
      startDate: 'timing.startDate',
      endDate: 'timing.endDate',
      noticeImage: 'noticeImage'
    },
    prepare(selection) {
      const { title, type, priority, isActive, startDate, endDate, noticeImage } = selection
      
      const typeIcons: Record<string, string> = {
        'notice': '',
        'event': '',
        'alert': '',
        'meeting': '',
        'financial': '',
        'celebration': '',
        'news': '',
        'achievement': ''
      }
      
      const priorityColors: Record<string, string> = {
        'high': '',
        'medium': '',
        'normal': '',
        'low': ''
      }
      
      const status = !isActive ? ' (Inactive)' : ''
      const now = new Date()
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      
      let timeStatus = ''
      if (start && start > now) timeStatus = ' (Scheduled)'
      else if (end && end < now) timeStatus = ' (Expired)'
      else if (start && start <= now && (!end || end >= now)) timeStatus = ' (Active)'
      
      return {
        title: `${title}${status}${timeStatus}`,
        subtitle: `${type} - ${priority} priority`,
        media: noticeImage
      }
    }
  },
  
  orderings: [
    {
      title: 'Priority & Date',
      name: 'priorityDate',
      by: [
        { field: 'priority', direction: 'asc' },
        { field: 'timing.startDate', direction: 'desc' }
      ]
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'timing.startDate', direction: 'desc' }
      ]
    }
  ]
})