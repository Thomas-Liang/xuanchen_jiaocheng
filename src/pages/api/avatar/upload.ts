import type { APIRoute } from 'astro';
import { updateUserAvatar, createAvatarUploadDir } from '../../../lib/auth';
import { validateImageType, validateImageSize, generateAvatarFilename } from '../../../lib/avatar';
import fs from 'fs';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log('=== Avatar Upload Started ===');
  try {
    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;
    const username = formData.get('username')?.toString();

    console.log('Username:', username);
    console.log('File:', file);

    if (!username) {
      return new Response(JSON.stringify({ error: '请先登录' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!file) {
      return new Response(JSON.stringify({ error: '请选择图片' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('File type:', file.type);
    console.log('File size:', file.size);

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
    console.log('Avatars dir:', avatarsDir);
    console.log('CWD:', process.cwd());
    
    const filename = generateAvatarFilename(username);
    const filepath = path.join(avatarsDir, filename);
    console.log('Filepath:', filepath);
    
    // 确保目录存在
    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir, { recursive: true });
      console.log('Created avatars dir');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('Buffer size:', buffer.length);
    
    fs.writeFileSync(filepath, buffer);
    console.log('File written');
    console.log('File exists:', fs.existsSync(filepath));

    const avatarUrl = `/avatars/${filename}`;
    console.log('Avatar URL:', avatarUrl);
    
    updateUserAvatar(username, avatarUrl);
    console.log('Database updated');

    return new Response(JSON.stringify({ 
      success: true, 
      avatar: avatarUrl 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    return new Response(JSON.stringify({ error: '上传失败: ' + String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();

    if (!username) {
      return new Response(JSON.stringify({ error: '请先登录' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
