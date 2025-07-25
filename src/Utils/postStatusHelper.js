import { postsService } from '../Services/api';

/**
 * Quick helper functions for changing post status
 */

export const publishPost = async (postId) => {
  try {
    // Get current post data
    const response = await postsService.getPostById(postId);
    const post = response.data;
    
    // Update status to published
    await postsService.updatePost(postId, {
      ...post,
      status: 'published'
    });
    
    return { success: true, message: 'Post published successfully!' };
  } catch (error) {
    console.error('Error publishing post:', error);
    return { success: false, message: 'Failed to publish post' };
  }
};

export const unpublishPost = async (postId) => {
  try {
    // Get current post data
    const response = await postsService.getPostById(postId);
    const post = response.data;
    
    // Update status to draft
    await postsService.updatePost(postId, {
      ...post,
      status: 'draft'
    });
    
    return { success: true, message: 'Post moved to draft successfully!' };
  } catch (error) {
    console.error('Error unpublishing post:', error);
    return { success: false, message: 'Failed to unpublish post' };
  }
};

export const schedulePost = async (postId, scheduledDate) => {
  try {
    // Get current post data
    const response = await postsService.getPostById(postId);
    const post = response.data;
    
    // Update status to scheduled
    await postsService.updatePost(postId, {
      ...post,
      status: 'scheduled',
      scheduledDate: scheduledDate
    });
    
    return { success: true, message: 'Post scheduled successfully!' };
  } catch (error) {
    console.error('Error scheduling post:', error);
    return { success: false, message: 'Failed to schedule post' };
  }
};

export const changePostStatus = async (postId, newStatus, scheduledDate = null) => {
  try {
    // Get current post data
    const response = await postsService.getPostById(postId);
    const post = response.data;
    
    const updateData = {
      ...post,
      status: newStatus
    };
    
    if (newStatus === 'scheduled' && scheduledDate) {
      updateData.scheduledDate = scheduledDate;
    }
    
    // Update post status
    await postsService.updatePost(postId, updateData);
    
    return { success: true, message: `Post status changed to ${newStatus} successfully!` };
  } catch (error) {
    console.error('Error changing post status:', error);
    return { success: false, message: 'Failed to change post status' };
  }
};