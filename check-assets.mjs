// Simple Sanity query to check assets
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'w4d9v3bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const checkAssets = async () => {
  console.log('Checking Sanity assets and board members...');
  
  try {
    // Check if we have any image assets
    const assets = await client.fetch(`*[_type == "sanity.imageAsset"] {
      _id,
      url,
      originalFilename,
      metadata {
        dimensions
      }
    }[0...10]`);
    
    console.log(`Found ${assets.length} image assets:`);
    assets.forEach((asset, i) => {
      console.log(`  ${i+1}. ${asset.originalFilename} - ${asset.url}`);
    });
    
    // Check board members with their photo references
    const boardMembers = await client.fetch(`*[_type == "boardMember"] {
      _id,
      name,
      photo,
      isActive
    }[0...5]`);
    
    console.log(`\nFound ${boardMembers.length} board members:`);
    boardMembers.forEach((member, i) => {
      console.log(`  ${i+1}. ${member.name} - Photo: ${member.photo ? 'Yes' : 'No'} - Active: ${member.isActive}`);
      if (member.photo) {
        console.log(`     Photo ref: ${JSON.stringify(member.photo)}`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function
checkAssets();