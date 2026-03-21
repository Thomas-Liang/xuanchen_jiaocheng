import type { APIRoute } from 'astro';
import { updateProduct, getProductById } from '../../../lib/auth';

export const prerender = false;

const PRODUCT_IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

function validateImageType(type: string): boolean {
  return PRODUCT_IMAGE_CONFIG.allowedTypes.includes(type);
}

function validateImageSize(size: number): boolean {
  return size <= PRODUCT_IMAGE_CONFIG.maxSize;
}

export const POST: APIRoute = async ({ request }) => {
  console.log('=== Product Image Upload Started ===');
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const productId = formData.get('productId')?.toString();

    console.log('Product ID:', productId);
    console.log('File:', file);

    if (!productId) {
      return new Response(JSON.stringify({ error: '缺少产品ID' }), {
        status: 400,
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
      return new Response(JSON.stringify({ error: '图片大小不能超过 5MB' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString('base64');

    const token = import.meta.env.GITHUB_TOKEN || '';
    if (!token) {
      return new Response(JSON.stringify({ error: 'GitHub Token 未配置，请设置 GITHUB_TOKEN 环境变量' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const repo = 'Thomas-Liang/xuanchen_image_bed';
    const branch = 'main';

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const productPath = `product/${productId}`;
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${now.getTime()}.${ext}`;
    const path_ = `${year}/${month}/${day}/${productPath}/${filename}`;

    console.log('Upload path:', path_);

    const url = `https://api.github.com/repos/${repo}/contents/${path_}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Upload product image ${filename}`,
        content: base64Content,
        branch: branch,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      return new Response(JSON.stringify({ error: '上传失败: ' + response.status }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await response.json();
    const imageUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${path_}`;

    console.log('Image URL:', imageUrl);

    const product = getProductById(parseInt(productId));
    if (!product) {
      return new Response(JSON.stringify({ error: '产品不存在' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    updateProduct(product.id, product.name, product.description, product.url, product.icon, imageUrl);

    return new Response(JSON.stringify({
      success: true,
      image: imageUrl
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Product image upload error:', error);
    return new Response(JSON.stringify({ error: '上传失败: ' + String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
