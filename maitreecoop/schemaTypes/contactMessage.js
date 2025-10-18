export default {
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'isRead',
      title: 'Read Status',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' }
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for admin use'
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      description: 'email',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, description, status } = selection
      const statusEmoji = {
        'new': '🆕',
        'in_progress': '⏳',
        'resolved': '✅',
        'archived': '📁'
      }
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle: subtitle,
        description: description
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Status',
      name: 'byStatus',
      by: [{ field: 'status', direction: 'asc' }, { field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Priority',
      name: 'byPriority',
      by: [{ field: 'priority', direction: 'desc' }, { field: 'submittedAt', direction: 'desc' }]
    }
  ]
}