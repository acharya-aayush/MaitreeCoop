import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News & Announcements',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100).error('Title is required and should be under 100 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Title in Nepali',
      type: 'string',
      description: 'शीर्षक नेपालीमा'
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'This will be the URL path for this news article',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: Rule => Rule.required().error('Slug is required for the URL')
    }),
    
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief summary that appears in news lists',
      validation: Rule => Rule.max(200).error('Keep excerpt under 200 characters')
    }),
    
    defineField({
      name: 'excerptNepali',
      title: 'Excerpt in Nepali',
      type: 'text',
      description: 'संक्षिप्त सारांश नेपालीमा'
    }),
    
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The main content of the news article',
      of: [
        {
          type: 'block',
          // Rich text formatting options
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
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        // Allow images within content
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ]
    }),
    
    defineField({
      name: 'contentNepali',
      title: 'Content in Nepali',
      type: 'array',
      description: 'मुख्य सामग्री नेपालीमा',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General News', value: 'general'},
          {title: 'Financial Updates', value: 'financial'},
          {title: 'Member Services', value: 'services'},
          {title: 'Community Events', value: 'events'},
          {title: 'Announcements', value: 'announcements'},
          {title: 'Achievements', value: 'achievements'}
        ]
      }
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Maitree Cooperative'
    }),
    
    defineField({
      name: 'isPinned',
      title: 'Pin to Top',
      type: 'boolean',
      description: 'Pinned articles appear first in the news list',
      initialValue: false
    }),
    
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published articles appear on the website',
      initialValue: true
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage'
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
      title: 'Pinned First',
      name: 'pinnedFirst',
      by: [
        {field: 'isPinned', direction: 'desc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ]
})