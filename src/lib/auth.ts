import Database from 'better-sqlite3';
import path from 'path';

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
`);

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
  const fs = require('fs');
  const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
  }
  return avatarsDir;
}

export default db;
