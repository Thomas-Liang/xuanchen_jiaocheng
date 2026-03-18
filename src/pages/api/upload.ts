import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString('base64');
    
    const token = import.meta.env.GITHUB_TOKEN || '';
    if (!token) {
      return new Response(JSON.stringify({ error: 'GitHub Token 未配置，请设置 GITHUB_TOKEN 环境变量' }), { status: 500 });
    }
    const repo = 'Thomas-Liang/xuanchen_image_bed';
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${now.getTime()}.${ext}`;
    const path_ = `${year}/${month}/${day}/${filename}`;
    
    const url = `https://api.github.com/repos/${repo}/contents/${path_}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Upload ${filename}`,
        content: base64Content,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'Upload failed: ' + response.status }), { status: 500 });
    }

    const result = await response.json();
    const imageUrl = `https://raw.githubusercontent.com/${repo}/${year}/${month}/${day}/${filename}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      url: imageUrl,
      path: path_
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
};
