import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'site-config.json');

export const prerender = false;

interface SiteConfig {
  smtp?: {
    host: string;
    port: string;
    user: string;
    pass: string;
    from: string;
    enabled: boolean;
  };
  site?: {
    url: string;
    name: string;
  };
}

function loadConfig(): SiteConfig {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to load config:', e);
  }
  return {};
}

function saveConfig(config: SiteConfig): void {
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export const GET: APIRoute = async () => {
  const config = loadConfig();
  return new Response(JSON.stringify({
    smtp: config.smtp || { host: '', port: '587', user: '', pass: '', from: '', enabled: false },
    site: config.site || { url: 'http://localhost:4321', name: '泫晨云栖' }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const config = loadConfig();
    
    if (body.smtp) {
      config.smtp = {
        ...config.smtp,
        ...body.smtp,
        pass: body.smtp.pass ? body.smtp.pass : (config.smtp?.pass || '')
      };
    }
    
    if (body.site) {
      config.site = { ...config.site, ...body.site };
    }
    
    saveConfig(config);
    
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Save config error:', error);
    return new Response(JSON.stringify({ error: '保存失败' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const type = formData.get('type')?.toString();
    
    if (type === 'smtp') {
      const config = loadConfig();
      if (config.smtp) {
        config.smtp.pass = '';
      }
      saveConfig(config);
    }
    
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: '删除失败' }), { status: 500 });
  }
};
