import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'site-config.json');

interface SmtpConfig {
  host: string;
  port: string;
  user: string;
  pass: string;
  from: string;
  enabled: boolean;
}

interface SiteConfig {
  smtp?: SmtpConfig;
  site?: { url: string; name: string };
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

function createTransporter() {
  const config = loadConfig();
  const smtp = config.smtp;
  
  if (!smtp || !smtp.enabled || !smtp.host || !smtp.user || !smtp.pass) {
    return null;
  }
  
  return nodemailer.createTransport({
    host: smtp.host,
    port: parseInt(smtp.port) || 587,
    secure: parseInt(smtp.port) === 465,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const config = loadConfig();
  const smtp = config.smtp;
  
  if (!smtp?.enabled || !smtp.host || !smtp.user || !smtp.pass) {
    console.log('SMTP not configured or disabled, skipping email. Would send to:', options.to);
    return false;
  }
  
  const transporter = createTransporter();
  if (!transporter) return false;

  try {
    await transporter.sendMail({
      from: smtp.from ? `"${smtp.from}" <${smtp.user}>` : smtp.user,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log('Email sent to:', options.to);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export async function sendCommentNotification(params: {
  authorEmail: string | null;
  authorName: string;
  tutorialTitle: string;
  tutorialSlug: string;
  commenterName: string;
  commentContent: string;
  adminEmail?: string;
}): Promise<void> {
  const config = loadConfig();
  const siteUrl = config.site?.url || 'https://xuanchen.cloud';
  const { authorEmail, authorName, tutorialTitle, tutorialSlug, commenterName, commentContent, adminEmail } = params;
  
  const tutorialUrl = `${siteUrl}/xuanchen_content/tutorials/${tutorialSlug}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f472b6, #8b5cf6); padding: 24px; color: white; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 24px; }
        .tutorial-title { font-size: 18px; color: #1f2937; margin-bottom: 16px; font-weight: 600; }
        .comment-box { background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0; }
        .comment-author { font-weight: 600; color: #ec4899; margin-bottom: 8px; }
        .comment-content { color: #4b5563; line-height: 1.6; }
        .btn { display: inline-block; background: linear-gradient(135deg, #f472b6, #8b5cf6); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; }
        .footer { text-align: center; padding: 16px; color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 新评论提醒</h1>
        </div>
        <div class="content">
          <div class="tutorial-title">教程：${tutorialTitle}</div>
          <p>您好，<strong>${authorName}</strong>！</p>
          <p>您的教程收到了一条新评论：</p>
          <div class="comment-box">
            <div class="comment-author">${commenterName}</div>
            <div class="comment-content">${commentContent.substring(0, 200)}${commentContent.length > 200 ? '...' : ''}</div>
          </div>
          <a href="${tutorialUrl}" class="btn">查看评论 →</a>
        </div>
        <div class="footer">
          泫晨云栖 · 共同成长 · ${new Date().getFullYear()}
        </div>
      </div>
    </body>
    </html>
  `;

  const subject = `💬 您在"${tutorialTitle}"收到了新评论`;

  if (authorEmail) {
    await sendEmail({ to: authorEmail, subject, html });
  }

  if (adminEmail && adminEmail !== authorEmail) {
    await sendEmail({ to: adminEmail, subject: `[管理员通知] ${subject}`, html });
  }
}
