import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Cooperative Services',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required().max(80).error('Title is required and should be under 80 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Title in Nepali',
      type: 'string',
      description: 'सेवाको शीर्षक नेपालीमा'
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'This will be the URL path for this service',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: Rule => Rule.required().error('Slug is required for the URL')
    }),
    
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description that appears in service cards',
      validation: Rule => Rule.required().max(150).error('Short description is required and should be under 150 characters')
    }),
    
    defineField({
      name: 'shortDescriptionNepali',
      title: 'Short Description in Nepali',
      type: 'text',
      description: 'संक्षिप्त विवरण नेपालीमा'
    }),
    
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      description: 'Detailed description of the service',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'}
            ]
          }
        }
      ]
    }),
    
    defineField({
      name: 'fullDescriptionNepali',
      title: 'Full Description in Nepali',
      type: 'array',
      description: 'सेवाको विस्तृत विवरण नेपालीमा',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'}
            ]
          }
        }
      ]
    }),
    
    defineField({
      name: 'icon',
      title: 'Service Icon',
      type: 'image',
      description: 'Icon or image that represents this service',
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
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Financial Services', value: 'financial'},
          {title: 'Loan Services', value: 'loans'},
          {title: 'Savings & Deposits', value: 'savings'},
          {title: 'Insurance Services', value: 'insurance'},
          {title: 'Agricultural Services', value: 'agriculture'},
          {title: 'Training & Education', value: 'training'},
          {title: 'Community Development', value: 'community'},
          {title: 'Digital Services', value: 'digital'},
          {title: 'Other Services', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'featureNepali',
              title: 'Feature in Nepali',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text'
            }
          ],
          preview: {
            select: {
              title: 'feature'
            }
          }
        }
      ],
      description: 'Key features or benefits of this service'
    }),
    
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'requirement',
              title: 'Requirement',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'requirementNepali',
              title: 'Requirement in Nepali',
              type: 'string'
            },
            {
              name: 'isOptional',
              title: 'Is Optional',
              type: 'boolean',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'requirement',
              subtitle: 'isOptional'
            },
            prepare(selection) {
              const {title, subtitle} = selection
              return {
                title: title,
                subtitle: subtitle ? '(Optional)' : '(Required)'
              }
            }
          }
        }
      ],
      description: 'What members need to access this service'
    }),
    
    defineField({
      name: 'interestRate',
      title: 'Interest Rate',
      type: 'string',
      description: 'Interest rate if applicable (e.g., "12% per annum")'
    }),
    
    defineField({
      name: 'processingFee',
      title: 'Processing Fee',
      type: 'string',
      description: 'Any fees associated with this service'
    }),
    
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      description: 'Who to contact for this service'
    }),
    
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Phone number for inquiries about this service'
    }),
    
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email for inquiries about this service'
    }),
    
    defineField({
      name: 'isActive',
      title: 'Currently Available',
      type: 'boolean',
      description: 'Is this service currently being offered?',
      initialValue: true
    }),
    
    defineField({
      name: 'isPopular',
      title: 'Popular Service',
      type: 'boolean',
      description: 'Mark as popular to highlight on the services page',
      initialValue: false
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (popular services = 1-10)',
      initialValue: 100
    }),
    
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'icon'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: `${subtitle} Service`,
        media: media
      }
    }
  },
  
  orderings: [
    {
      title: 'Popular First',
      name: 'popularFirst',
      by: [
        {field: 'isPopular', direction: 'desc'},
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'By Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [
        {field: 'lastUpdated', direction: 'desc'}
      ]
    }
  ]
})