// Script to update existing board member data to match new schema
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'w4d9v3bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Create a proper update transaction
async function updateBoardMemberPositions() {
  try {
    console.log('🔄 Updating board member positions...');
    
    // Get all board members
    const boardMembers = await client.fetch('*[_type == "boardMember"]');
    console.log(`Found ${boardMembers.length} board members to update`);
    
    // Create transaction for bulk update
    let transaction = client.transaction();
    
    for (const member of boardMembers) {
      // Update post field based on current position
      let newPost = member.post;
      
      // Map old values to new values
      if (member.post === 'vice_chairman') {
        newPost = 'vice-chairman';
      }
      
      // Update the document
      transaction = transaction.patch(member._id, {
        set: {
          post: newPost
        }
      });
      
      console.log(`📝 Will update ${member.name}: ${member.post} → ${newPost}`);
    }
    
    // Commit the transaction
    await transaction.commit();
    console.log('✅ All board member positions updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating board member positions:', error);
  }
}

updateBoardMemberPositions();