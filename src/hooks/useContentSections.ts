import { useState, useEffect } from 'react'
import { client, queries } from '@/lib/sanity'

interface IntroductionSection {
  _id: string
  heading: string
  headingNepali?: string
  sectionImage?: any
  content: string
  contentNepali?: string
  highlights?: Array<{
    title: string
    titleNepali?: string
    value: string
    description?: string
    descriptionNepali?: string
    displayOrder: number
  }>
  foundingVision?: {
    quote: string
    quoteNepali?: string
    author: string
    authorNepali?: string
  }
  lastUpdated?: string
}

interface Announcement {
  _id: string
  title: string
  titleNepali?: string
  type: string
  priority: 'high' | 'medium' | 'normal' | 'low'
  contentType: 'text' | 'image' | 'rich'
  content?: string
  contentNepali?: string
  noticeImage?: any
  displaySettings: {
    showOnLoad: boolean
    delaySeconds: number
    allowDismiss: boolean
    rememberDismissal: boolean
    displayDuration: number
  }
  timing: {
    startDate: string
    endDate?: string
  }
  relatedLink?: {
    linkText: string
    linkTextNepali?: string
    url: string
    openInNewTab: boolean
  }
}

export const useIntroductionSection = () => {
  const [introSection, setIntroSection] = useState<IntroductionSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIntroductionSection = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(queries.introductionSection)
        setIntroSection(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching introduction section:', err)
        setError('Failed to load introduction section')
      } finally {
        setLoading(false)
      }
    }

    fetchIntroductionSection()
  }, [])

  return { introSection, loading, error }
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(queries.activeAnnouncements)
        setAnnouncements(data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching announcements:', err)
        setError('Failed to load announcements')
        // Don't show announcements if there's an error
        setAnnouncements([])
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  return { announcements, loading, error }
}