import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStory',
  title: 'Success Stories',
  type: 'document',
  icon: () => '🌟',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      description: 'Title of the success story',
      validation: Rule => Rule.required().min(10).max(100).error('Title must be between 10-100 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Story Title (Nepali)',
      type: 'string',
      description: 'Title in Nepali language'
    }),
    
    // Story Type
    defineField({
      name: 'storyType',
      title: 'Story Type',
      type: 'string',
      options: {
        list: [
          { title: '👤 Member Success', value: 'member' },
          { title: '🏢 Cooperative Achievement', value: 'cooperative' },
          { title: '🌱 Community Development', value: 'community' },
          { title: '💼 Business Growth', value: 'business' },
          { title: '🎓 Education/Training', value: 'education' },
          { title: '💰 Financial Inclusion', value: 'financial' },
          { title: '🏆 Award/Recognition', value: 'award' },
          { title: '🤝 Partnership', value: 'partnership' },
          { title: '💡 Innovation', value: 'innovation' },
          { title: '🌍 Social Impact', value: 'social' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'member'
    }),
    
    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the success story',
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
      validation: Rule => Rule.required().error('Featured image is required')
    }),
    
    // Story Content
    defineField({
      name: 'excerpt',
      title: 'Story Excerpt',
      type: 'text',
      description: 'Brief summary of the success story (for preview)',
      rows: 3,
      validation: Rule => Rule.required().min(50).max(200).error('Excerpt must be between 50-200 characters')
    }),
    
    defineField({
      name: 'excerptNepali',
      title: 'Story Excerpt (Nepali)',
      type: 'text',
      description: 'Brief summary in Nepali',
      rows: 3
    }),
    
    defineField({
      name: 'content',
      title: 'Full Story',
      type: 'array',
      description: 'Complete success story content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            }
          ]
        }
      ],
      validation: Rule => Rule.required().error('Story content is required')
    }),
    
    defineField({
      name: 'contentNepali',
      title: 'Full Story (Nepali)',
      type: 'array',
      description: 'Complete story content in Nepali',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            }
          ]
        }
      ]
    }),
    
    // Person/Organization Details
    defineField({
      name: 'protagonist',
      title: 'Story Protagonist',
      type: 'object',
      description: 'Details about the person or organization featured in the story',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          description: 'Name of person/organization',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'nameNepali',
          title: 'Name (Nepali)',
          type: 'string'
        }),
        defineField({
          name: 'role',
          title: 'Role/Position',
          type: 'string',
          description: 'Their role in the cooperative or community'
        }),
        defineField({
          name: 'roleNepali',
          title: 'Role/Position (Nepali)',
          type: 'string'
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'Where they are from/based'
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          description: 'Photo of the person/organization',
          options: { hotspot: true }
        }),
        defineField({
          name: 'memberSince',
          title: 'Member Since',
          type: 'date',
          description: 'When did they join the cooperative?'
        })
      ]
    }),
    
    // Impact Metrics
    defineField({
      name: 'impact',
      title: 'Impact Metrics',
      type: 'object',
      description: 'Quantifiable impact of this success story',
      fields: [
        defineField({
          name: 'beneficiaries',
          title: 'Number of Beneficiaries',
          type: 'number',
          description: 'How many people were impacted?'
        }),
        defineField({
          name: 'financialImpact',
          title: 'Financial Impact (NPR)',
          type: 'number',
          description: 'Financial value of the impact'
        }),
        defineField({
          name: 'timeframe',
          title: 'Timeframe',
          type: 'string',
          description: 'Duration over which this success was achieved'
        }),
        defineField({
          name: 'keyMetrics',
          title: 'Key Success Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'metric',
                  title: 'Metric Name',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'metricNepali',
                  title: 'Metric Name (Nepali)',
                  type: 'string'
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  description: 'e.g., "150%", "500 families", "NPR 50,00,000"',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'Brief explanation of this metric'
                })
              ],
              preview: {
                select: {
                  metric: 'metric',
                  value: 'value'
                },
                prepare(selection) {
                  return {
                    title: `${selection.metric}: ${selection.value}`
                  }
                }
              }
            }
          ]
        })
      ]
    }),
    
    // Quote/Testimonial
    defineField({
      name: 'testimonial',
      title: 'Testimonial Quote',
      type: 'object',
      description: 'A powerful quote from the story',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote Text',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'quoteNepali',
          title: 'Quote Text (Nepali)',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'author',
          title: 'Quote Author',
          type: 'string'
        })
      ]
    }),
    
    // Date Information
    defineField({
      name: 'storyDate',
      title: 'Story Date',
      type: 'date',
      description: 'When did this success occur?',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      description: 'When was this story published?',
      initialValue: () => new Date().toISOString().split('T')[0]
    }),
    
    // Categories and Tags
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Financial Empowerment', value: 'financial-empowerment' },
          { title: 'Women Empowerment', value: 'women-empowerment' },
          { title: 'Youth Development', value: 'youth-development' },
          { title: 'Agricultural Development', value: 'agriculture' },
          { title: 'Small Business Growth', value: 'small-business' },
          { title: 'Education & Training', value: 'education' },
          { title: 'Healthcare Access', value: 'healthcare' },
          { title: 'Technology Adoption', value: 'technology' },
          { title: 'Community Building', value: 'community' },
          { title: 'Environmental Impact', value: 'environment' }
        ]
      }
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    // Publication Settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Should this story be visible on the website?',
      initialValue: true
    }),
    
    defineField({
      name: 'isFeatured',
      title: 'Featured Story',
      type: 'boolean',
      description: 'Mark as featured to highlight prominently',
      initialValue: false
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in story listings (lower number shows first)',
      validation: Rule => Rule.min(1),
      initialValue: 1
    }),
    
    // Related Content
    defineField({
      name: 'relatedEvent',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Link to related event if applicable'
    }),
    
    defineField({
      name: 'relatedNews',
      title: 'Related News',
      type: 'reference',
      to: [{ type: 'news' }],
      description: 'Link to related news article if applicable'
    }),
    
    // Admin Fields
    defineField({
      name: 'author',
      title: 'Story Author/Writer',
      type: 'string',
      description: 'Who wrote this story?'
    }),
    
    defineField({
      name: 'verifiedBy',
      title: 'Verified By',
      type: 'string',
      description: 'Staff member who verified this story'
    }),
    
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this success story',
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      storyType: 'storyType',
      featuredImage: 'featuredImage',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
      storyDate: 'storyDate',
      protagonistName: 'protagonist.name'
    },
    prepare(selection) {
      const { title, storyType, featuredImage, isPublished, isFeatured, storyDate, protagonistName } = selection
      
      const typeIcons: Record<string, string> = {
        'member': '👤',
        'cooperative': '🏢',
        'community': '🌱',
        'business': '💼',
        'education': '🎓',
        'financial': '💰',
        'award': '🏆',
        'partnership': '🤝',
        'innovation': '💡',
        'social': '🌍'
      }
      
      const featured = isFeatured ? ' ⭐' : ''
      const status = !isPublished ? ' (Draft)' : ''
      const formattedDate = storyDate ? new Date(storyDate).toLocaleDateString() : ''
      
      return {
        title: `${typeIcons[storyType] || '🌟'} ${title}${featured}${status}`,
        subtitle: `${protagonistName || 'Unknown'} • ${formattedDate}`,
        media: featuredImage
      }
    }
  },
  
  orderings: [
    {
      title: 'Story Date (Newest)',
      name: 'storyDateDesc',
      by: [{ field: 'storyDate', direction: 'desc' }]
    },
    {
      title: 'Published Date (Newest)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'storyDate', direction: 'desc' }
      ]
    },
    {
      title: 'Story Type',
      name: 'storyType',
      by: [{ field: 'storyType', direction: 'asc' }]
    }
  ]
})