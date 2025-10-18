import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  icon: () => '🌟',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Hero Section Settings',
      readOnly: true,
      description: 'This manages the hero section content'
    }),
    
    // Hero Images
    defineField({
      name: 'heroImages',
      title: 'Hero Section Images',
      type: 'array',
      description: 'Upload images for the hero section carousel/background',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Hero Image',
              type: 'image',
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
              validation: Rule => Rule.required().error('Image is required')
            }),
            defineField({
              name: 'caption',
              title: 'Image Caption',
              type: 'string',
              description: 'Optional caption for the image'
            }),
            defineField({
              name: 'isActive',
              title: 'Display This Image',
              type: 'boolean',
              description: 'Toggle to show/hide this image in hero section',
              initialValue: true
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which to display (lower number shows first)',
              validation: Rule => Rule.required().min(1),
              initialValue: 1
            })
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              isActive: 'isActive',
              order: 'displayOrder'
            },
            prepare(selection) {
              const { title, media, isActive, order } = selection
              return {
                title: title || 'Hero Image',
                subtitle: `Order: ${order} ${isActive ? '(Active)' : '(Inactive)'}`,
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('At least one hero image is required')
    }),
    
    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When were the hero images last updated',
      initialValue: () => new Date().toISOString()
    }),
    
    // Notes
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about hero section updates',
      rows: 3
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      heroImages: 'heroImages'
    },
    prepare(selection) {
      const { title, heroImages } = selection
      const imageCount = heroImages ? heroImages.length : 0
      return {
        title: title || 'Hero Section',
        subtitle: `${imageCount} hero image${imageCount !== 1 ? 's' : ''}`,
        media: heroImages && heroImages[0] ? heroImages[0].image : null
      }
    }
  }
})