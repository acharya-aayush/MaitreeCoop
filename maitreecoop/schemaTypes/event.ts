import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Community Events',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'Name of the event',
      validation: Rule => Rule.required().min(5).max(100).error('Title must be between 5-100 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Event Title (Nepali)',
      type: 'string',
      description: 'Event name in Nepali language'
    }),
    
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'Brief description of the event',
      rows: 3,
      validation: Rule => Rule.required().min(20).error('Description must be at least 20 characters')
    }),
    
    defineField({
      name: 'descriptionNepali',
      title: 'Event Description (Nepali)',
      type: 'text',
      description: 'Event description in Nepali',
      rows: 3
    }),
    
    // Event Type
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Member Meeting', value: 'meeting' },
          { title: 'Training/Workshop', value: 'training' },
          { title: 'Celebration', value: 'celebration' },
          { title: 'General Assembly', value: 'assembly' },
          { title: 'Award Ceremony', value: 'award' },
          { title: 'Financial Review', value: 'financial' },
          { title: 'Community Development', value: 'development' },
          { title: 'Educational Program', value: 'educational' },
          { title: 'Festival', value: 'festival' },
          { title: 'Announcement', value: 'announcement' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'meeting'
    }),
    
    // Date and Time
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      description: 'Date when the event will take place',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'Event start time (e.g., "11:00 AM")',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Event end time (e.g., "2:00 PM")'
    }),
    
    // Location
    defineField({
      name: 'location',
      title: 'Event Location',
      type: 'string',
      description: 'Where the event will take place',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'locationNepali',
      title: 'Event Location (Nepali)',
      type: 'string',
      description: 'Location in Nepali language'
    }),
    
    defineField({
      name: 'venue',
      title: 'Venue Details',
      type: 'string',
      options: {
        list: [
          { title: 'Maitree Headquarters', value: 'headquarters' },
          { title: 'Baletaksar Branch', value: 'baletaksar' },
          { title: 'Dhurkot Branch', value: 'dhurkot' },
          { title: 'Kalikanagar Branch', value: 'kalikanagar' },
          { title: 'Purkot Branch', value: 'purkot' },
          { title: 'Aapchaur Branch', value: 'aapchaur' },
          { title: 'Kapilvastu Branch', value: 'kapilvastu' },
          { title: 'Sandhikharka Branch', value: 'sandhikharka' },
          { title: 'Community Hall', value: 'community_hall' },
          { title: 'Online/Virtual', value: 'virtual' },
          { title: 'Other Location', value: 'other' }
        ]
      },
      initialValue: 'headquarters'
    }),
    
    // Attendance
    defineField({
      name: 'expectedAttendees',
      title: 'Expected Attendees',
      type: 'number',
      description: 'Estimated number of attendees'
    }),
    
    defineField({
      name: 'actualAttendees',
      title: 'Actual Attendees',
      type: 'number',
      description: 'Actual number who attended (fill after event)'
    }),
    
    // Registration Settings
    defineField({
      name: 'requiresRegistration',
      title: 'Requires Registration',
      type: 'boolean',
      description: 'Does this event require registration?',
      initialValue: false
    }),
    
    defineField({
      name: 'registrationSettings',
      title: 'Registration Settings',
      type: 'object',
      hidden: ({ parent }) => !parent?.requiresRegistration,
      fields: [
        defineField({
          name: 'registrationDeadline',
          title: 'Registration Deadline',
          type: 'datetime',
          description: 'Last date/time for registration'
        }),
        defineField({
          name: 'registrationUrl',
          title: 'Registration URL',
          type: 'url',
          description: 'External registration link (Google Forms, etc.)'
        }),
        defineField({
          name: 'registrationEmail',
          title: 'Registration Email',
          type: 'string',
          description: 'Email for registration inquiries'
        }),
        defineField({
          name: 'registrationPhone',
          title: 'Registration Phone',
          type: 'string',
          description: 'Phone number for registration'
        }),
        defineField({
          name: 'maxAttendees',
          title: 'Maximum Attendees',
          type: 'number',
          description: 'Maximum number of registrations allowed'
        }),
        defineField({
          name: 'registrationFee',
          title: 'Registration Fee',
          type: 'number',
          description: 'Fee amount (0 for free events)'
        })
      ]
    }),
    
    // Attachments
    defineField({
      name: 'attachments',
      title: 'Event Attachments',
      type: 'array',
      description: 'Documents, agendas, presentations, etc.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'titleNepali',
              title: 'Document Title (Nepali)',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Document Description',
              type: 'string'
            }),
            defineField({
              name: 'file',
              title: 'Document File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png'
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Agenda', value: 'agenda' },
                  { title: 'Presentation', value: 'presentation' },
                  { title: 'Minutes', value: 'minutes' },
                  { title: 'Form', value: 'form' },
                  { title: 'Photo', value: 'photo' },
                  { title: 'Notice', value: 'notice' },
                  { title: 'Report', value: 'report' },
                  { title: 'Other', value: 'other' }
                ]
              },
              initialValue: 'other'
            })
          ],
          preview: {
            select: {
              title: 'title',
              fileType: 'fileType',
              file: 'file'
            },
            prepare(selection) {
              const { title, fileType, file } = selection
              return {
                title: `${title}`,
                subtitle: file?.asset?.originalFilename || 'No file attached'
              }
            }
          }
        }
      ]
    }),
    
    // Event Status
    defineField({
      name: 'eventStatus',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Scheduled', value: 'scheduled' },
          { title: '🔴 Live/Ongoing', value: 'ongoing' },
          { title: '✅ Completed', value: 'completed' },
          { title: '❌ Cancelled', value: 'cancelled' },
          { title: '⏱️ Postponed', value: 'postponed' }
        ]
      },
      initialValue: 'scheduled'
    }),
    
    // Priority
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          { title: '🔴 High Priority', value: 'high' },
          { title: '🟡 Medium Priority', value: 'medium' },
          { title: '🟢 Normal Priority', value: 'normal' },
          { title: '🔵 Low Priority', value: 'low' }
        ]
      },
      initialValue: 'normal'
    }),
    
    // Publication Settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Should this event be visible on the website?',
      initialValue: true
    }),
    
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in event listings (lower number shows first)',
      validation: Rule => Rule.min(1),
      initialValue: 1
    }),
    
    // Contact Information
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      description: 'Person to contact for event inquiries'
    }),
    
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string'
    }),
    
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string'
    }),
    
    // Admin Fields
    defineField({
      name: 'organizer',
      title: 'Event Organizer',
      type: 'string',
      description: 'Department or person organizing this event'
    }),
    
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this event',
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      eventDate: 'eventDate',
      eventType: 'eventType',
      eventStatus: 'eventStatus',
      priority: 'priority',
      isFeatured: 'isFeatured',
      requiresRegistration: 'requiresRegistration'
    },
    prepare(selection) {
      const { title, eventDate, eventType, eventStatus, priority, isFeatured, requiresRegistration } = selection
      
      const featured = isFeatured ? ' [Featured]' : ''
      const registration = requiresRegistration ? ' [Registration Required]' : ''
      const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString() : 'No date'
      
      return {
        title: `${title}${featured}${registration}`,
        subtitle: `${formattedDate} • ${priority} Priority • ${eventStatus}`
      }
    }
  },
  
  orderings: [
    {
      title: 'Event Date (Newest)',
      name: 'eventDateDesc',
      by: [{ field: 'eventDate', direction: 'desc' }]
    },
    {
      title: 'Event Date (Upcoming)',
      name: 'eventDateAsc',
      by: [{ field: 'eventDate', direction: 'asc' }]
    },
    {
      title: 'Priority & Date',
      name: 'priorityDate',
      by: [
        { field: 'priority', direction: 'asc' },
        { field: 'eventDate', direction: 'asc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'eventDate', direction: 'asc' }
      ]
    }
  ]
})