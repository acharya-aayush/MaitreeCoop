import {defineField, defineType} from 'sanity'

export const financialDocument = defineType({
  name: 'financialDocument',
  title: 'Financial Documents',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: Rule => Rule.required().max(100).error('Title is required and should be under 100 characters')
    }),
    
    defineField({
      name: 'titleNepali',
      title: 'Title in Nepali',
      type: 'string',
      description: 'कागजातको शीर्षक नेपालीमा'
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'This will be the URL path for this document',
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
      description: 'Brief description of this document',
      validation: Rule => Rule.max(300).error('Keep description under 300 characters')
    }),
    
    defineField({
      name: 'descriptionNepali',
      title: 'Description in Nepali',
      type: 'text',
      description: 'कागजातको विवरण नेपालीमा'
    }),
    
    defineField({
      name: 'category',
      title: 'Document Category',
      type: 'string',
      options: {
        list: [
          {title: 'Annual Reports', value: 'annual-reports'},
          {title: 'Financial Statements', value: 'financial-statements'},
          {title: 'Audit Reports', value: 'audit-reports'},
          {title: 'Balance Sheets', value: 'balance-sheets'},
          {title: 'Profit & Loss', value: 'profit-loss'},
          {title: 'Cash Flow', value: 'cash-flow'},
          {title: 'Budget Documents', value: 'budget'},
          {title: 'Tax Documents', value: 'tax'},
          {title: 'Loan Portfolios', value: 'loan-portfolios'},
          {title: 'Interest Rates', value: 'interest-rates'},
          {title: 'Policies & Procedures', value: 'policies'},
          {title: 'Board Resolutions', value: 'resolutions'},
          {title: 'Meeting Minutes', value: 'minutes'},
          {title: 'Notices & Circulars', value: 'notices'},
          {title: 'Other Documents', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'documentFile',
      title: 'Document File',
      type: 'file',
      description: 'Upload the PDF or document file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx'
      },
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'File Description'
        }
      ],
      validation: Rule => Rule.required().error('Document file is required')
    }),
    
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Optional cover image for the document',
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
      name: 'fiscalYear',
      title: 'Fiscal Year',
      type: 'string',
      description: 'e.g., 2024-25, 2023-24',
      validation: Rule => Rule.regex(/^\d{4}-\d{2}$/).error('Format should be YYYY-YY (e.g., 2024-25)')
    }),
    
    defineField({
      name: 'reportPeriod',
      title: 'Report Period',
      type: 'string',
      options: {
        list: [
          {title: 'Annual', value: 'annual'},
          {title: 'Quarterly (Q1)', value: 'q1'},
          {title: 'Quarterly (Q2)', value: 'q2'},
          {title: 'Quarterly (Q3)', value: 'q3'},
          {title: 'Quarterly (Q4)', value: 'q4'},
          {title: 'Half-Yearly (H1)', value: 'h1'},
          {title: 'Half-Yearly (H2)', value: 'h2'},
          {title: 'Monthly', value: 'monthly'},
          {title: 'One-time', value: 'one-time'}
        ]
      }
    }),
    
    defineField({
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'e.g., 2.5 MB, 1.2 MB (will be auto-calculated if possible)'
    }),
    
    defineField({
      name: 'pageCount',
      title: 'Number of Pages',
      type: 'number',
      description: 'How many pages in this document?'
    }),
    
    defineField({
      name: 'language',
      title: 'Document Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Nepali', value: 'np'},
          {title: 'Both (Bilingual)', value: 'both'}
        ]
      },
      initialValue: 'en'
    }),
    
    defineField({
      name: 'isConfidential',
      title: 'Confidential Document',
      type: 'boolean',
      description: 'Is this document confidential/restricted?',
      initialValue: false
    }),
    
    defineField({
      name: 'requiresLogin',
      title: 'Requires Login to Download',
      type: 'boolean',
      description: 'Should users be logged in to download this document?',
      initialValue: false
    }),
    
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      description: 'Number of times this document has been downloaded',
      initialValue: 0,
      readOnly: true
    }),
    
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      description: 'When was this document officially published?',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'When does this document expire? (optional)'
    }),
    
    defineField({
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string',
      description: 'Who approved this document for publication?'
    }),
    
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Keywords to help search this document'
    }),
    
    defineField({
      name: 'relatedDocuments',
      title: 'Related Documents',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'financialDocument'}]
        }
      ],
      description: 'Link to other related financial documents'
    }),
    
    defineField({
      name: 'isPinned',
      title: 'Pin to Top',
      type: 'boolean',
      description: 'Pinned documents appear first in the list',
      initialValue: false
    }),
    
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published documents appear on the website',
      initialValue: true
    }),
    
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (important docs = 1-10)',
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
      media: 'coverImage',
      fiscalYear: 'fiscalYear'
    },
    prepare(selection) {
      const {title, subtitle, media, fiscalYear} = selection
      return {
        title: title,
        subtitle: `${subtitle}${fiscalYear ? ` (${fiscalYear})` : ''}`,
        media: media
      }
    }
  },
  
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedDesc',
      by: [
        {field: 'publishedDate', direction: 'desc'}
      ]
    },
    {
      title: 'Pinned First',
      name: 'pinnedFirst',
      by: [
        {field: 'isPinned', direction: 'desc'},
        {field: 'displayOrder', direction: 'asc'},
        {field: 'publishedDate', direction: 'desc'}
      ]
    },
    {
      title: 'By Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'fiscalYear', direction: 'desc'}
      ]
    },
    {
      title: 'By Fiscal Year',
      name: 'fiscalYearDesc',
      by: [
        {field: 'fiscalYear', direction: 'desc'},
        {field: 'publishedDate', direction: 'desc'}
      ]
    }
  ]
})