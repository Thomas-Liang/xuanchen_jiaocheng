import type { APIRoute } from 'astro';
import { followUser, unfollowUser, isFollowing, getFollowerCount, getFollowingCount, getFollowers, getFollowing } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get('username');
  const type = url.searchParams.get('type');
  
  if (!username) {
    return new Response(JSON.stringify({ error: '缺少 username 参数' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    if (type === 'followers') {
      const followers = getFollowers(username);
      return new Response(JSON.stringify({ followers }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (type === 'following') {
      const following = getFollowing(username);
      return new Response(JSON.stringify({ following }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (type === 'count') {
      const followerCount = getFollowerCount(username);
      const followingCount = getFollowingCount(username);
      return new Response(JSON.stringify({ followerCount, followingCount }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: '无效的 type 参数' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const follower = formData.get('follower')?.toString();
    const following = formData.get('following')?.toString();
    const action = formData.get('action')?.toString();
    
    if (!follower || !following) {
      return new Response(JSON.stringify({ error: '缺少参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (follower === following) {
      return new Response(JSON.stringify({ error: '不能关注自己' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (action === 'follow') {
      const result = followUser(follower, following);
      return new Response(JSON.stringify({ 
        success: true, 
        following: true,
        followerCount: getFollowerCount(following)
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (action === 'unfollow') {
      const result = unfollowUser(follower, following);
      return new Response(JSON.stringify({ 
        success: true, 
        following: false,
        followerCount: getFollowerCount(following)
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (action === 'check') {
      const isFollow = isFollowing(follower, following);
      return new Response(JSON.stringify({ following: isFollow }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: '无效的 action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '操作失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
