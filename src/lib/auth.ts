import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'auth.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    avatar TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tutorial_slug TEXT NOT NULL,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tutorial_slug TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tutorial_slug, username)
  );
  
  CREATE TABLE IF NOT EXISTS pageviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    count INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    url TEXT,
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS workflows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    tags TEXT,
    url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    url TEXT,
    icon TEXT,
    image TEXT,
    slug TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS pinned_tutorials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    pinned_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS follows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower TEXT NOT NULL,
    following TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower, following)
  );
`);

// Migration: add slug column if not exists (for existing tables)
try {
  const result = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='products'").get() as { sql: string } | undefined;
  if (result && !result.sql.includes('"slug"')) {
    db.exec('ALTER TABLE products ADD COLUMN slug TEXT');
  }
} catch (e) {
  // Column might already exist
}

// Create default admin user if not exists
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', 'admin123');
}

export function createUser(username: string, password: string, email?: string) {
  const stmt = db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
  return stmt.run(username, password, email || null);
}

export function getUserByUsername(username: string) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username) as { id: number; username: string; password: string; email?: string; avatar?: string } | undefined;
}

export function getUserById(id: number) {
  const stmt = db.prepare('SELECT id, username, email FROM users WHERE id = ?');
  return stmt.get(id);
}

export function addComment(tutorialSlug: string, username: string, content: string) {
  const stmt = db.prepare('INSERT INTO comments (tutorial_slug, username, content) VALUES (?, ?, ?)');
  return stmt.run(tutorialSlug, username, content);
}

export function getComments(tutorialSlug: string) {
  const stmt = db.prepare(`
    SELECT c.*, u.avatar 
    FROM comments c 
    LEFT JOIN users u ON c.username = u.username 
    WHERE c.tutorial_slug = ? 
    ORDER BY c.created_at DESC
  `);
  return stmt.all(tutorialSlug);
}

export function deleteComment(commentId: number, username: string) {
  const stmt = db.prepare('DELETE FROM comments WHERE id = ? AND username = ?');
  return stmt.run(commentId, username);
}

export function editComment(commentId: number, username: string, content: string) {
  const stmt = db.prepare('UPDATE comments SET content = ? WHERE id = ? AND username = ?');
  return stmt.run(content, commentId, username);
}

export function addFavorite(tutorialSlug: string, username: string) {
  const stmt = db.prepare('INSERT OR IGNORE INTO favorites (tutorial_slug, username) VALUES (?, ?)');
  return stmt.run(tutorialSlug, username);
}

export function removeFavorite(tutorialSlug: string, username: string) {
  const stmt = db.prepare('DELETE FROM favorites WHERE tutorial_slug = ? AND username = ?');
  return stmt.run(tutorialSlug, username);
}

export function isFavorited(tutorialSlug: string, username: string) {
  const stmt = db.prepare('SELECT id FROM favorites WHERE tutorial_slug = ? AND username = ?');
  return !!stmt.get(tutorialSlug, username);
}

export function getUserFavorites(username: string) {
  const stmt = db.prepare('SELECT tutorial_slug FROM favorites WHERE username = ?');
  return stmt.all(username) as { tutorial_slug: string }[];
}

// Follow functions
export function followUser(follower: string, following: string) {
  if (follower === following) return { changes: 0 };
  const stmt = db.prepare('INSERT OR IGNORE INTO follows (follower, following) VALUES (?, ?)');
  return stmt.run(follower, following);
}

export function unfollowUser(follower: string, following: string) {
  const stmt = db.prepare('DELETE FROM follows WHERE follower = ? AND following = ?');
  return stmt.run(follower, following);
}

export function isFollowing(follower: string, following: string) {
  const stmt = db.prepare('SELECT id FROM follows WHERE follower = ? AND following = ?');
  return !!stmt.get(follower, following);
}

export function getFollowerCount(username: string) {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM follows WHERE following = ?');
  const result = stmt.get(username) as { count: number };
  return result?.count || 0;
}

export function getFollowingCount(username: string) {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM follows WHERE follower = ?');
  const result = stmt.get(username) as { count: number };
  return result?.count || 0;
}

export function getFollowers(username: string) {
  const stmt = db.prepare(`
    SELECT u.username, u.avatar 
    FROM follows f 
    JOIN users u ON f.follower = u.username 
    WHERE f.following = ? 
    ORDER BY f.created_at DESC
  `);
  return stmt.all(username) as { username: string; avatar?: string }[];
}

export function getFollowing(username: string) {
  const stmt = db.prepare(`
    SELECT u.username, u.avatar 
    FROM follows f 
    JOIN users u ON f.following = u.username 
    WHERE f.follower = ? 
    ORDER BY f.created_at DESC
  `);
  return stmt.all(username) as { username: string; avatar?: string }[];
}

export function getAllUsers() {
  const stmt = db.prepare('SELECT username, avatar, email, created_at FROM users ORDER BY created_at DESC');
  return stmt.all() as { username: string; avatar?: string; email?: string; created_at: string }[];
}

export function updateUserAvatar(username: string, avatar: string | null) {
  const stmt = db.prepare('UPDATE users SET avatar = ? WHERE username = ?');
  return stmt.run(avatar, username);
}

export function getUserAvatar(username: string) {
  const stmt = db.prepare('SELECT avatar FROM users WHERE username = ?');
  const result = stmt.get(username) as { avatar: string | null } | undefined;
  return result?.avatar || null;
}

export function createAvatarUploadDir() {
  const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
  }
  return avatarsDir;
}

export function getPageview(slug: string) {
  const stmt = db.prepare('SELECT count FROM pageviews WHERE slug = ?');
  const result = stmt.get(slug) as { count: number } | undefined;
  return result?.count || 0;
}

export function incrementPageview(slug: string) {
  const stmt = db.prepare(`
    INSERT INTO pageviews (slug, count, last_updated) VALUES (?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET count = count + 1, last_updated = CURRENT_TIMESTAMP
  `);
  return stmt.run(slug);
}

export function getAllPageviews() {
  const stmt = db.prepare('SELECT * FROM pageviews ORDER BY count DESC');
  return stmt.all() as { id: number; slug: string; count: number; last_updated: string }[];
}

export function resetPageview(slug: string) {
  const stmt = db.prepare('UPDATE pageviews SET count = 0, last_updated = CURRENT_TIMESTAMP WHERE slug = ?');
  return stmt.run(slug);
}

export function resetAllPageviews() {
  const stmt = db.prepare('UPDATE pageviews SET count = 0, last_updated = CURRENT_TIMESTAMP');
  return stmt.run();
}

// Pinned Tutorials
export function getPinnedTutorials(): string[] {
  const stmt = db.prepare('SELECT slug FROM pinned_tutorials ORDER BY pinned_at DESC');
  return (stmt.all() as { slug: string }[]).map(r => r.slug);
}

export function isTutorialPinned(slug: string): boolean {
  const stmt = db.prepare('SELECT id FROM pinned_tutorials WHERE slug = ?');
  return !!stmt.get(slug);
}

export function pinTutorial(slug: string) {
  const stmt = db.prepare('INSERT OR REPLACE INTO pinned_tutorials (slug, pinned_at) VALUES (?, CURRENT_TIMESTAMP)');
  return stmt.run(slug);
}

export function unpinTutorial(slug: string) {
  const stmt = db.prepare('DELETE FROM pinned_tutorials WHERE slug = ?');
  return stmt.run(slug);
}

// Projects CRUD
export function getAllProjects() {
  const stmt = db.prepare('SELECT * FROM projects ORDER BY order_index ASC, created_at DESC');
  return stmt.all() as { id: number; name: string; description: string; url: string; icon: string; order_index: number; created_at: string }[];
}

export function getProjectById(id: number) {
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
  return stmt.get(id);
}

export function createProject(name: string, description: string, url: string, icon?: string) {
  const stmt = db.prepare('INSERT INTO projects (name, description, url, icon) VALUES (?, ?, ?, ?)');
  return stmt.run(name, description, url, icon || '📦');
}

export function updateProject(id: number, name: string, description: string, url: string, icon?: string) {
  const stmt = db.prepare('UPDATE projects SET name = ?, description = ?, url = ?, icon = ? WHERE id = ?');
  return stmt.run(name, description, url, icon || '📦', id);
}

export function deleteProject(id: number) {
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
  return stmt.run(id);
}

// Workflows CRUD
export function getAllWorkflows() {
  const stmt = db.prepare('SELECT * FROM workflows ORDER BY order_index ASC, created_at DESC');
  return stmt.all() as { id: number; name: string; description: string; icon: string; tags: string; url: string; order_index: number; created_at: string }[];
}

export function getWorkflowById(id: number) {
  const stmt = db.prepare('SELECT * FROM workflows WHERE id = ?');
  return stmt.get(id);
}

export function createWorkflow(name: string, description: string, icon: string, tags: string, url?: string) {
  const stmt = db.prepare('INSERT INTO workflows (name, description, icon, tags, url) VALUES (?, ?, ?, ?, ?)');
  return stmt.run(name, description, icon, tags, url || null);
}

export function updateWorkflow(id: number, name: string, description: string, icon: string, tags: string, url?: string) {
  const stmt = db.prepare('UPDATE workflows SET name = ?, description = ?, icon = ?, tags = ?, url = ? WHERE id = ?');
  return stmt.run(name, description, icon, tags, url || null, id);
}

export function deleteWorkflow(id: number) {
  const stmt = db.prepare('DELETE FROM workflows WHERE id = ?');
  return stmt.run(id);
}

// Products CRUD
export function getAllProducts() {
  const stmt = db.prepare('SELECT * FROM products ORDER BY order_index ASC, created_at DESC');
  return stmt.all() as { id: number; name: string; description: string; url: string; icon: string; image: string; slug: string; order_index: number; created_at: string }[];
}

export function getProductById(id: number) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return stmt.get(id) as { id: number; name: string; description: string; url: string; icon: string; image: string; slug: string; order_index: number; created_at: string } | undefined;
}

export function getProductBySlug(slug: string) {
  const stmt = db.prepare('SELECT * FROM products WHERE slug = ?');
  return stmt.get(slug) as { id: number; name: string; description: string; url: string; icon: string; image: string; slug: string; order_index: number; created_at: string } | undefined;
}

export function createProduct(name: string, description: string, url: string, icon?: string, image?: string, slug?: string) {
  const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const stmt = db.prepare('INSERT INTO products (name, description, url, icon, image, slug) VALUES (?, ?, ?, ?, ?, ?)');
  return stmt.run(name, description, url, icon || '📦', image || null, productSlug);
}

export function updateProduct(id: number, name: string, description: string, url: string, icon?: string, image?: string, slug?: string) {
  const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const stmt = db.prepare('UPDATE products SET name = ?, description = ?, url = ?, icon = ?, image = ?, slug = ? WHERE id = ?');
  return stmt.run(name, description, url, icon || '📦', image || null, productSlug, id);
}

export function deleteProduct(id: number) {
  const stmt = db.prepare('DELETE FROM products WHERE id = ?');
  return stmt.run(id);
}

// Initialize default data for projects and workflows
const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
if (projectsCount.count === 0) {
  db.prepare('INSERT INTO projects (name, description, url, icon) VALUES (?, ?, ?, ?)').run(
    '泫晨云栖', '本教程网站源码，基于 Astro + React + TailwindCSS 构建', 'https://github.com/Thomas-Liang/xuanchen_jiaocheng', '🌐'
  );
  db.prepare('INSERT INTO projects (name, description, url, icon) VALUES (?, ?, ?, ?)').run(
    'xuanchen_image_bed', 'GitHub 图床仓库，用于存储网站图片资源', 'https://github.com/Thomas-Liang/xuanchen_image_bed', '🖼️'
  );
}

const workflowsCount = db.prepare('SELECT COUNT(*) as count FROM workflows').get() as { count: number };
if (workflowsCount.count === 0) {
  db.prepare('INSERT INTO workflows (name, description, icon, tags) VALUES (?, ?, ?, ?)').run(
    'AI 代码生成', '使用 AI 自动生成代码，提高开发效率', '🤖', 'AI,自动化'
  );
  db.prepare('INSERT INTO workflows (name, description, icon, tags) VALUES (?, ?, ?, ?)').run(
    'CI/CD 流水线', '自动化构建、测试和部署流程', '🔄', 'DevOps,自动化'
  );
  db.prepare('INSERT INTO workflows (name, description, icon, tags) VALUES (?, ?, ?, ?)').run(
    'API 集成', '快速集成第三方 API 服务', '🔗', 'API,后端'
  );
}

// Initialize default products
const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (productsCount.count === 0) {
  db.prepare('INSERT INTO products (name, description, url, icon, image, slug) VALUES (?, ?, ?, ?, ?, ?)').run(
    'Cursor AI', 
    '一款集成 AI 的代码编辑器，基于 VS Code 开发，支持代码补全、解释、调试等功能，大幅提升开发效率', 
    'https://cursor.sh',
    '🤖',
    'https://cursor.sh/og.png',
    'cursor-ai'
  );
  db.prepare('INSERT INTO products (name, description, url, icon, image, slug) VALUES (?, ?, ?, ?, ?, ?)').run(
    'Vercel', 
    '前端部署平台，支持 Next.js、React、Astro 等框架，免费额度充足，全球 CDN 加速', 
    'https://vercel.com',
    '▲',
    'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
    'vercel'
  );
  db.prepare('INSERT INTO products (name, description, url, icon, image, slug) VALUES (?, ?, ?, ?, ?, ?)').run(
    'GitHub Copilot', 
    'AI 代码助手，提供实时代码建议、自动补全和代码生成服务，支持多种编程语言', 
    'https://github.com/features/copilot',
    '💻',
    null,
    'github-copilot'
  );
  db.prepare('INSERT INTO products (name, description, url, icon, image, slug) VALUES (?, ?, ?, ?, ?, ?)').run(
    'Cloudflare', 
    '全球领先的 CDN 和网络安全服务商，提供免费 SSL、DDoS 防护、边缘计算等功能', 
    'https://cloudflare.com',
    '☁️',
    null,
    'cloudflare'
  );
}

// Migration: generate slug for existing products without slug
const productsWithoutSlug = db.prepare("SELECT id, name FROM products WHERE slug IS NULL OR slug = ''").all() as { id: number; name: string }[];
for (const product of productsWithoutSlug) {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  db.prepare('UPDATE products SET slug = ? WHERE id = ?').run(slug, product.id);
}

export default db;
