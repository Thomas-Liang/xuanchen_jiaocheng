import type { APIRoute } from 'astro';
import { getUserByUsername, updateUserAvatar, createAvatarUploadDir } from '../../../lib/auth';
import { validateImageType, validateImageSize, generateAvatarFilename } from '../../../lib/avatar';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request, cookies }) => {
  const username = cookies.get('username')?.value;
  
  if (!username) {
    return new Response(JSON.stringify({ error: '请先登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: '请选择图片' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!validateImageType(file.type)) {
      return new Response(JSON.stringify({ error: '仅支持 JPG、PNG、GIF、WebP 格式' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!validateImageSize(file.size)) {
      return new Response(JSON.stringify({ error: '图片大小不能超过 2MB' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const avatarsDir = createAvatarUploadDir();
    const filename = generateAvatarFilename(username);
    const filepath = path.join(avatarsDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    const avatarUrl = `/avatars/${filename}`;
    updateUserAvatar(username, avatarUrl);

    return new Response(JSON.stringify({ 
      success: true, 
      avatar: avatarUrl 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    return new Response(JSON.stringify({ error: '上传失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ cookies }) => {
  const username = cookies.get('username')?.value;
  
  if (!username) {
    return new Response(JSON.stringify({ error: '请先登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    updateUserAvatar(username, null);

    return new Response(JSON.stringify({ 
      success: true, 
      avatar: '/avatars/default.svg' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Avatar delete error:', error);
    return new Response(JSON.stringify({ error: '删除失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
