// Sanity Direct Query Test
// This is a standalone test to check what data we get from Sanity

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'w4d9v3bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const testQuery = async () => {
  try {
    console.log('Testing direct Sanity query...')
    
    // Simple query first
    const simpleQuery = `*[_type == "boardMember"][0...3] {
      _id,
      name,
      photo
    }`
    
    const simpleResult = await client.fetch(simpleQuery)
    console.log('Simple query result:', JSON.stringify(simpleResult, null, 2))
    
    // Enhanced query
    const enhancedQuery = `*[_type == "boardMember"][0...3] {
      _id,
      name,
      photo {
        asset-> {
          _id,
          url
        }
      },
      "directPhotoUrl": photo.asset->url
    }`
    
    const enhancedResult = await client.fetch(enhancedQuery)
    console.log('Enhanced query result:', JSON.stringify(enhancedResult, null, 2))
    
    // Check if any have photos
    const withPhotos = enhancedResult.filter(m => m.photo || m.directPhotoUrl)
    console.log(`Found ${withPhotos.length} members with photo data`)
    
    // Count total documents
    const countQuery = `count(*[_type == "boardMember"])`
    const totalCount = await client.fetch(countQuery)
    console.log(`Total boardMember documents: ${totalCount}`)
    
  } catch (error) {
    console.error('Query error:', error)
  }
}

export { testQuery }