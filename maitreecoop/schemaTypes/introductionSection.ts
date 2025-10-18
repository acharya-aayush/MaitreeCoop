import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'introductionSection',
  title: 'Introduction Section',
  type: 'document',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Introduction Section',
      readOnly: true,
      description: 'This manages the introduction section content'
    }),
    
    // Introduction Heading
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading for the introduction section (e.g., "INTRODUCTION")',
      validation: Rule => Rule.required().error('Heading is required'),
      initialValue: 'INTRODUCTION'
    }),
    
    defineField({
      name: 'headingNepali',
      title: 'Section Heading (Nepali)',
      type: 'string',
      description: 'Section heading in Nepali',
      initialValue: 'परिचय'
    }),
    
    // Introduction Content
    defineField({
      name: 'content',
      title: 'Introduction Content',
      type: 'text',
      description: 'Main introduction text content (English)',
      validation: Rule => Rule.required().min(50).error('Introduction content must be at least 50 characters'),
      rows: 8,
      initialValue: 'The Maitri Multipurpose Cooperative Society was founded on September 12, 2000 (Bhadra 27, 2057 BS) under the leadership of the late Bom Bahadur Khadka by a group of young, business-minded locals. Our founding mission was to promote cooperative values through agricultural production, processing, and marketing, professionalize animal husbandry, create self-employment opportunities, build social capital through member unity, improve livelihoods with savings and subsidized loans, and advance the local cooperative movement.'
    }),
    
    defineField({
      name: 'contentNepali',
      title: 'Introduction Content (Nepali)',
      type: 'text',
      description: 'Introduction text content in Nepali',
      rows: 8,
      initialValue: 'मैत्री बहुउद्देश्यीय सहकारी संस्था सन् २०००, भाद्र २७ गते स्थापना भएको थियो। यो संस्था स्थानीय युवा व्यापारिक सोचका व्यक्तिहरूको नेतृत्वमा स्वर्गीय बोम बहादुर खड्काको नेतृत्वमा स्थापना भएको हो।'
    }),
    
    // Key Statistics or Highlights
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      description: 'Key achievements or statistics to highlight',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Highlight Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'titleNepali',
              title: 'Highlight Title (Nepali)',
              type: 'string'
            }),
            defineField({
              name: 'value',
              title: 'Value/Number',
              type: 'string',
              description: 'The key number or value (e.g., "14,800+", "Since 2001")'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Brief description of this highlight'
            }),
            defineField({
              name: 'descriptionNepali',
              title: 'Description (Nepali)',
              type: 'string'
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(1),
              initialValue: 1
            })
          ],
          preview: {
            select: {
              title: 'title',
              value: 'value',
              order: 'displayOrder'
            },
            prepare(selection) {
              const { title, value, order } = selection
              return {
                title: title,
                subtitle: `${value} - Order: ${order}`
              }
            }
          }
        }
      ]
    }),
    
    // Founding Vision/Quote
    defineField({
      name: 'foundingVision',
      title: 'Founding Vision/Quote',
      type: 'object',
      description: 'Special quote or vision statement',
      fields: [
        defineField({
          name: 'quote',
          title: 'Vision Quote',
          type: 'text',
          rows: 3,
          initialValue: 'To improve members\' living standards and foster social capital through cooperation.'
        }),
        defineField({
          name: 'quoteNepali',
          title: 'Vision Quote (Nepali)',
          type: 'text',
          rows: 3,
          initialValue: 'सहयोगको माध्यमबाट सदस्यहरूको जीवन स्तर सुधार गर्न र सामाजिक पूँजी बढाउन।'
        }),
        defineField({
          name: 'author',
          title: 'Quote Author',
          type: 'string',
          initialValue: 'Bom Bahadur Khadka, Founder'
        }),
        defineField({
          name: 'authorNepali',
          title: 'Quote Author (Nepali)',
          type: 'string',
          initialValue: 'बोम बहादुर खड्का, संस्थापक'
        })
      ]
    }),
    
    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When was the introduction content last updated',
      initialValue: () => new Date().toISOString()
    }),
    
    // Notes
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about introduction updates',
      rows: 3
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      heading: 'heading',
      content: 'content'
    },
    prepare(selection) {
      const { title, heading, content } = selection
      return {
        title: title || 'Introduction Section',
        subtitle: heading || 'No heading set',
        description: content ? content.substring(0, 100) + '...' : 'No content'
      }
    }
  }
})