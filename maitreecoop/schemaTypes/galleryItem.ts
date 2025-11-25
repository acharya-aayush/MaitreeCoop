import { defineField, defineType } from 'sanity'
import { BulkMediaInput } from '../components/BulkMediaInput'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for this gallery item',
      validation: Rule => Rule.required().min(3).max(100).error('Title must be between 3-100 characters')
    }),

    defineField({
      name: 'titleNepali',
      title: 'Title (Nepali)',
      type: 'string',
      description: 'Title in Nepali language'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the photo/video',
      rows: 3,
      validation: Rule => Rule.max(500).error('Description should not exceed 500 characters')
    }),

    defineField({
      name: 'descriptionNepali',
      title: 'Description (Nepali)',
      type: 'text',
      description: 'Description in Nepali language',
      rows: 3
    }),

    // Media Items (Multiple Images/Videos for Events)
    defineField({
      name: 'mediaItems',
      title: 'Event Photos & Videos',
      type: 'array',
      components: {
        input: BulkMediaInput
      },
      description: 'Upload multiple photos and videos for this event/gallery item',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          title: 'Media Item',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Photo/Image', value: 'image' },
                  { title: 'Video', value: 'video' }
                ]
              },
              validation: Rule => Rule.required(),
              initialValue: 'image'
            }),

            // Image Field
            defineField({
              name: 'image',
              title: 'Photo/Image',
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
              hidden: ({ parent }) => parent?.mediaType !== 'image',
              validation: Rule => Rule.custom((image, context) => {
                const mediaType = (context as any)?.parent?.mediaType
                if (mediaType === 'image' && !image) {
                  return 'Image is required when media type is "Photo/Image"'
                }
                return true
              })
            }),

            // Video Field
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
              validation: Rule => Rule.custom((video, context) => {
                const mediaType = (context as any)?.parent?.mediaType
                if (mediaType === 'video' && !video) {
                  return 'Video is required when media type is "Video"'
                }
                return true
              })
            }),

            // Video Thumbnail
            defineField({
              name: 'videoThumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              options: {
                hotspot: true
              },
              hidden: ({ parent }) => parent?.mediaType !== 'video'
            }),

            // Video URL
            defineField({
              name: 'videoUrl',
              title: 'Video URL (Optional)',
              type: 'url',
              description: 'YouTube or external video URL instead of file upload',
              hidden: ({ parent }) => parent?.mediaType !== 'video'
            }),

            // Individual Media Caption
            defineField({
              name: 'caption',
              title: 'Media Caption',
              type: 'string',
              description: 'Caption for this specific photo/video'
            }),

            // Display Order within the event
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Order within this event (1, 2, 3...)',
              validation: Rule => Rule.required().min(1),
              initialValue: 1
            })
          ],
          preview: {
            select: {
              mediaType: 'mediaType',
              image: 'image',
              videoThumbnail: 'videoThumbnail',
              caption: 'caption',
              order: 'order'
            },
            prepare(selection) {
              const { mediaType, image, videoThumbnail, caption, order } = selection
              const media = mediaType === 'video' ? (videoThumbnail || image) : image
              const typeIcon = mediaType === 'video' ? '🎥' : '📷'

              return {
                title: `${typeIcon} ${caption || 'Media Item'} (${order})`,
                subtitle: mediaType,
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('At least one photo or video is required for the event')
    }),

    // Category/Tags
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Events', value: 'events' },
          { title: 'Meetings', value: 'meetings' },
          { title: 'Community', value: 'community' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Celebrations', value: 'celebrations' },
          { title: 'Training', value: 'training' },
          { title: 'Awards', value: 'awards' },
          { title: 'Other', value: 'other' }
        ]
      },
      initialValue: 'events'
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Add relevant tags for better organization',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    // Date and Location
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      description: 'When was this photo/video taken?'
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where was this photo/video taken?'
    }),

    defineField({
      name: 'locationNepali',
      title: 'Location (Nepali)',
      type: 'string',
      description: 'Location in Nepali language'
    }),

    // Publication Settings
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Should this item be visible in the gallery?',
      initialValue: true
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Item',
      type: 'boolean',
      description: 'Mark as featured to highlight in gallery',
      initialValue: false
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in gallery display (lower number shows first)',
      validation: Rule => Rule.min(1),
      initialValue: 1
    }),

    // Link to News (optional)
    defineField({
      name: 'relatedNews',
      title: 'Related News Article',
      type: 'reference',
      to: [{ type: 'news' }],
      description: 'Link this gallery item to a news article if applicable'
    }),

    // Admin Fields
    defineField({
      name: 'uploadedBy',
      title: 'Uploaded By',
      type: 'string',
      description: 'Who uploaded this item?'
    }),

    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this gallery item',
      rows: 2
    })
  ],

  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      image: 'image',
      videoThumbnail: 'videoThumbnail',
      category: 'category',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured'
    },
    prepare(selection) {
      const { title, mediaType, image, videoThumbnail, category, isPublished, isFeatured } = selection

      const media = mediaType === 'video' ? (videoThumbnail || image) : image
      const typeIcon = mediaType === 'video' ? '🎥' : '📷'
      const status = !isPublished ? ' (Draft)' : isFeatured ? ' (Featured)' : ''

      return {
        title: `${typeIcon} ${title}${status}`,
        subtitle: `${category} - ${mediaType}`,
        media: media
      }
    }
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    },
    {
      title: 'Date Taken (Newest)',
      name: 'dateTakenDesc',
      by: [{ field: 'dateTaken', direction: 'desc' }]
    },
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }]
    }
  ]
})