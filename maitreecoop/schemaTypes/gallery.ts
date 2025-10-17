import {defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: Rule => Rule.required().max(80).error('Title is required and should be under 80 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Title in Nepali',
      type: 'string',
      description: 'ग्यालरीको शीर्षक नेपालीमा'
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'This will be the URL path for this gallery',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: Rule => Rule.required().error('Slug is required for the URL')
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this gallery',
      validation: Rule => Rule.max(300).error('Keep description under 300 characters')
    }),
    
    defineField({
      name: 'descriptionNepali',
      title: 'Description in Nepali',
      type: 'text',
      description: 'ग्यालरीको विवरण नेपालीमा'
    }),
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Events & Ceremonies', value: 'events'},
          {title: 'Community Activities', value: 'community'},
          {title: 'Office & Infrastructure', value: 'office'},
          {title: 'Member Activities', value: 'members'},
          {title: 'Training & Workshops', value: 'training'},
          {title: 'Achievements & Awards', value: 'achievements'},
          {title: 'Cultural Programs', value: 'cultural'},
          {title: 'General', value: 'general'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image that represents this gallery',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text'
        }
      ],
      validation: Rule => Rule.required().error('Cover image is required')
    }),
    
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for accessibility'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for this image'
            },
            {
              name: 'captionNepali',
              type: 'string',
              title: 'Caption in Nepali',
              description: 'तस्बिरको नेपाली क्याप्सन'
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).error('At least one image is required')
    }),
    
    defineField({
      name: 'date',
      title: 'Gallery Date',
      type: 'date',
      description: 'When were these photos taken?',
      initialValue: () => new Date().toISOString().split('T')[0]
    }),
    
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where were these photos taken?'
    }),
    
    defineField({
      name: 'locationNepali',
      title: 'Location in Nepali',
      type: 'string',
      description: 'स्थान नेपालीमा'
    }),
    
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'Credit for the photographer'
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Tags to help organize and search galleries'
    }),
    
    defineField({
      name: 'isFeatured',
      title: 'Featured Gallery',
      type: 'boolean',
      description: 'Featured galleries appear prominently on the gallery page',
      initialValue: false
    }),
    
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published galleries appear on the website',
      initialValue: true
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    
    defineField({
      name: 'viewOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (featured galleries = 1-10)',
      initialValue: 100
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: `${subtitle} Gallery`,
        media: media
      }
    }
  },
  
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'viewOrder', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'By Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ]
})