import { client } from './src/lib/sanity.ts';

// Test script to check board member data
async function testBoardMembers() {
  try {
    console.log('Testing board member photo data...');
    
    const query = `*[_type == "boardMember" && isActive == true] | order(isChairman desc, isViceChairman desc, displayOrder asc) {
      _id,
      name,
      photo {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    }[0...5]`; // Just get first 5
    
    const members = await client.fetch(query);
    
    console.log('Raw data from Sanity:');
    console.log(JSON.stringify(members, null, 2));
    
    members.forEach((member, index) => {
      console.log(`\n${index + 1}. ${member.name}:`);
      console.log('  Has photo:', !!member.photo);
      console.log('  Photo data:', member.photo);
      if (member.photo?.asset) {
        console.log('  Asset ID:', member.photo.asset._id);
        console.log('  Asset URL:', member.photo.asset.url);
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testBoardMembers();