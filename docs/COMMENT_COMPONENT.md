# 评论区组件文档

## 概述

这是一个可切换主题的精美评论区组件，支持樱花、油菜花、春意盎然三种春日主题。

## 功能特性

- 三种主题切换（樱花🌸 / 油菜花🌼 / 春意盎然🌿）
- SVG 树藤时间线样式
- 泡泡氛围背景
- 评论折叠/展开
- 空评论验证
- 主题记忆（sessionStorage）
- 响应式设计
- 深色模式支持

## 完整代码

### HTML 结构

```html
<!-- Comments Section -->
<section class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
  <div id="commentSection" class="relative py-6 px-6 rounded-2xl transition-all duration-500 overflow-hidden" style="background: linear-gradient(135deg, rgba(252,231,243,0.6) 0%, rgba(252,249,241,0.4) 100%);">
    
    <!-- 泡泡氛围背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="bubble absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/30 to-pink-100/20 blur-2xl -top-10 -left-10 animate-pulse"></div>
      <div class="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-pink-300/20 to-pink-200/10 blur-xl top-1/4 -right-8 animate-pulse" style="animation-delay: 0.5s;"></div>
      <div class="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-100/30 to-pink-50/10 blur-lg bottom-10 left-1/4 animate-pulse" style="animation-delay: 1s;"></div>
      <div class="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-pink-200/25 to-pink-100/15 blur-xl top-1/2 right-1/4 animate-pulse" style="animation-delay: 1.5s;"></div>
      <div class="bubble absolute w-12 h-12 rounded-full bg-white/20 blur-md bottom-1/4 left-1/3 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="bubble absolute w-8 h-8 rounded-full bg-white/30 blur-sm top-1/3 left-1/2 animate-pulse" style="animation-delay: 2.5s;"></div>
    </div>
    
    <!-- 标题和主题切换 -->
    <div class="mb-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-full border border-pink-100 dark:border-pink-800/30 shadow-sm">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-200 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-pink-600 dark:text-pink-300">评论</h2>
          <span id="commentCount" class="text-sm font-normal text-pink-400 dark:text-pink-500"></span>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-500 dark:text-slate-400">主题</span>
          <div class="flex gap-3">
            <button onclick="setCommentTheme('sakura')" class="theme-btn active w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-200 shadow-sm hover:scale-110 transition-transform flex items-center justify-center text-base ring-2 ring-offset-2" style="--tw-ring-color: #f9a8d4;" title="樱花">🌸</button>
            <button onclick="setCommentTheme('canola')" class="theme-btn w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-200 shadow-sm hover:scale-110 transition-transform flex items-center justify-center text-base" title="油菜花">🌼</button>
            <button onclick="setCommentTheme('spring')" class="theme-btn w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-300 shadow-sm hover:scale-110 transition-transform flex items-center justify-center text-base" title="春意盎然">🌿</button>
          </div>
          
          <button id="toggleComments" onclick="toggleComments()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all text-sm text-pink-500 dark:text-pink-400">
            <span id="toggleText">收起</span>
            <svg id="toggleIcon" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 评论内容和时间线 -->
    <div class="relative">
      <svg id="timelineSvg" class="absolute left-1/2 top-0 bottom-0 w-20 -translate-x-1/2 pointer-events-none" viewBox="0 0 80 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#f9a8d4;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#f9a8d4;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <path d="M 40 0 Q 45 50 38 100 T 42 200 Q 36 250 40 300 T 40 400" stroke="url(#vineGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 40 80 Q 55 85 65 82" stroke="#f9a8d4" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>
        <path d="M 38 160 Q 22 168 14 165" stroke="#f9a8d4" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>
        <path d="M 42 240 Q 58 248 68 244" stroke="#f9a8d4" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>
        <path d="M 38 320 Q 20 328 12 324" stroke="#f9a8d4" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>
      </svg>
      
      <div id="commentsContent">
        <!-- 评论表单 -->
        <div id="commentFormContainer" class="mb-6">
          <form id="commentForm" class="hidden">
            <input type="hidden" name="slug" value={tutorial.slug} />
            <input type="hidden" name="username" id="commentUsername" />
            <div class="relative">
              <textarea 
                name="content" 
                rows="3" 
                id="commentInput"
                class="w-full px-4 py-3 rounded-xl border-2 border-pink-100 dark:border-pink-800 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none resize-none transition-all placeholder:text-slate-400"
                placeholder="写下你的评论..."
              ></textarea>
            </div>
            <div class="flex justify-end mt-3">
              <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-pink-900 dark:text-pink-100 font-medium rounded-lg shadow-lg shadow-pink-200/50 dark:shadow-pink-800/30 hover:shadow-pink-300/50 dark:hover:shadow-pink-300/50 transition-all flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                发表评论
              </button>
            </div>
          </form>
        </div>
        
        <!-- 登录提示 -->
        <div id="loginPrompt" class="mb-6 p-5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-pink-100/50 dark:border-pink-800/30 text-center backdrop-blur-sm hidden">
          <p class="text-pink-600 dark:text-pink-300 mb-3 text-sm">登录后发表评论</p>
          <a href={`${basePath}/login`} class="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-400 to-pink-300 text-pink-900 dark:text-pink-100 font-medium rounded-lg hover:shadow-lg transition-all text-sm">
            去登录
          </a>
        </div>
        
        <!-- 评论列表 -->
        <div id="commentsContainer" class="pl-0 space-y-8"></div>
      </div>
    </div>
  </div>
</section>
```

### JavaScript 代码

```javascript
// 主题配置
const themes = {
  sakura: {
    bg: 'linear-gradient(135deg, rgba(252,231,243,0.5) 0%, rgba(252,249,241,0.3) 100%)',
    timeline: 'linear-gradient(to bottom, #f9a8d4, #fbcfe8, transparent)',
    border: 'border-pink-100 dark:border-pink-800',
    dot: 'from-pink-300 to-pink-200',
    input: 'border-pink-100 dark:border-pink-800 focus:border-pink-300 focus:ring-pink-300',
    button: 'from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 shadow-pink-200/50 dark:shadow-pink-800/30',
    buttonText: 'text-pink-900 dark:text-pink-100',
    card: 'bg-white/90 dark:bg-slate-800/90 border-pink-100/50 dark:border-pink-800/30',
    text: 'text-pink-600 dark:text-pink-300',
    dotColor: '#f9a8d4',
    emoji: '🌸'
  },
  canola: {
    bg: 'linear-gradient(135deg, rgba(254,249,195,0.5) 0%, rgba(254,252,154,0.3) 100%)',
    timeline: 'linear-gradient(to bottom, #fde047, #fef9c3, transparent)',
    border: 'border-yellow-200 dark:border-yellow-800',
    dot: 'from-yellow-400 to-yellow-300',
    input: 'border-yellow-200 dark:border-yellow-800 focus:border-yellow-400 focus:ring-yellow-300',
    button: 'from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 shadow-yellow-200/50 dark:shadow-yellow-800/30',
    buttonText: 'text-yellow-900 dark:text-yellow-100',
    card: 'bg-white/90 dark:bg-slate-800/90 border-yellow-200/50 dark:border-yellow-800/30',
    text: 'text-yellow-600 dark:text-yellow-300',
    dotColor: '#fde047',
    emoji: '🌼'
  },
  spring: {
    bg: 'linear-gradient(135deg, rgba(220,252,191,0.5) 0%, rgba(187,247,208,0.3) 100%)',
    timeline: 'linear-gradient(to bottom, #86efac, #bbf7d0, transparent)',
    border: 'border-green-200 dark:border-green-800',
    dot: 'from-green-400 to-emerald-300',
    input: 'border-green-200 dark:border-green-800 focus:border-green-400 focus:ring-green-300',
    button: 'from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 shadow-green-200/50 dark:shadow-green-800/30',
    buttonText: 'text-green-900 dark:text-green-100',
    card: 'bg-white/90 dark:bg-slate-800/90 border-green-200/50 dark:border-green-800/30',
    text: 'text-green-600 dark:text-green-300',
    dotColor: '#86efac',
    emoji: '🌿'
  }
};

window.currentTheme = 'sakura';
window.themes = themes;

// 主题切换函数
window.setCommentTheme = function(theme) {
  window.currentTheme = theme;
  const t = themes[theme];
  
  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active', 'ring-2', 'ring-offset-2'));
  event.target.classList.add('active', 'ring-2', 'ring-offset-2');
  event.target.style.setProperty('--tw-ring-color', t.dotColor);
  
  const section = document.getElementById('commentSection');
  if (section) section.style.background = t.bg;
  
  // 更新标题颜色
  const title = section?.querySelector('h2');
  if (title) title.className = title.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
  
  const count = document.getElementById('commentCount');
  if (count) count.className = count.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
  
  // 更新时间线颜色
  const timelineSvg = document.getElementById('timelineSvg');
  if (timelineSvg) {
    timelineSvg.querySelectorAll('path').forEach(p => {
      const stroke = p.getAttribute('stroke');
      if (stroke && stroke.includes('#')) p.setAttribute('stroke', t.dotColor);
    });
    const grad = timelineSvg.querySelector('#vineGrad');
    if (grad) {
      grad.querySelectorAll('stop').forEach((stop, i) => {
        stop.style.stopColor = t.dotColor;
        stop.style.stopOpacity = i === 0 ? 0.6 : 0.1;
      });
    }
  }
  
  // 更新输入框
  const input = document.getElementById('commentInput');
  if (input) {
    input.className = 'w-full px-4 py-3 rounded-xl border-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 focus:ring-2 outline-none resize-none transition-all placeholder:text-slate-400 ' + t.input;
  }
  
  // 更新所有按钮
  document.querySelectorAll('#commentSection button').forEach(btn => {
    if (btn.id === 'toggleComments') {
      btn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all text-sm ' + t.text;
    } else if (btn.type === 'submit') {
      btn.className = 'px-5 py-2.5 ' + t.button + ' font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm ' + t.buttonText;
    }
  });
  
  // 更新链接
  document.querySelectorAll('#commentSection a').forEach(a => {
    a.className = 'inline-flex items-center gap-2 px-5 py-2 ' + t.button + ' ' + t.buttonText + ' font-medium rounded-lg hover:shadow-lg transition-all text-sm';
  });
  
  // 更新登录提示
  const loginPrompt = document.getElementById('loginPrompt');
  if (loginPrompt) {
    loginPrompt.className = 'mb-6 p-5 rounded-xl bg-white/60 dark:bg-slate-800/60 border text-center backdrop-blur-sm ' + t.card + ' ' + t.text + ' hidden';
    loginPrompt.querySelectorAll('p').forEach(p => {
      p.className = 'mb-3 text-sm ' + t.text;
    });
  }
  
  // 更新泡泡背景
  document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.style.background = `radial-gradient(circle, ${t.dotColor}30, transparent)`;
  });
  
  sessionStorage.setItem('commentTheme', theme);
  loadComments();
};

// 折叠/展开评论
window.toggleComments = function() {
  const content = document.getElementById('commentsContent');
  const toggleText = document.getElementById('toggleText');
  const toggleIcon = document.getElementById('toggleIcon');
  const timelineSvg = document.getElementById('timelineSvg');
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    content.style.maxHeight = '2000px';
    content.style.opacity = '1';
    toggleText.textContent = '收起';
    toggleIcon.style.transform = 'rotate(0deg)';
    if (timelineSvg) {
      timelineSvg.style.maxHeight = '2000px';
      timelineSvg.style.opacity = '1';
    }
  } else {
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
    toggleText.textContent = '展开';
    toggleIcon.style.transform = 'rotate(180deg)';
    if (timelineSvg) {
      timelineSvg.style.maxHeight = '0';
      timelineSvg.style.opacity = '0';
      timelineSvg.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
    }
    setTimeout(() => content.classList.add('hidden'), 400);
  }
};

// 加载评论列表
async function loadComments() {
  const countEl = document.getElementById('commentCount');
  try {
    const res = await fetch(`${basePath}/api/comments?slug=${slug}`);
    const data = await res.json();
    const comments = data.comments || [];
    
    if (countEl) {
      countEl.textContent = comments.length > 0 ? `(${comments.length})` : '';
    }
    
    const container = document.getElementById('commentsContainer');
    if (!container) return;
    
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      if (diff < 60) return '刚刚';
      if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
      if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
      if (diff < 604800) return Math.floor(diff / 86400) + '天前';
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    };
    
    const t = window.themes[window.currentTheme] || window.themes.sakura;
    const badges = ['🌸 樱花使者', '🌼 油菜精灵', '🌿 春日访客', '✨ 暖心评论', '💫 见解独到'];
    
    if (comments.length > 0) {
      container.innerHTML = comments.map((c, i) => {
        const badge = badges[i % badges.length];
        const delay = i * 0.1;
        const isLeft = i % 2 === 0;
        
        return `
          <div class="relative mb-8 last:mb-0" style="animation: bubbleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both;">
            <div class="absolute left-1/2 -translate-x-1/2 -top-1 z-10">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br ${t.dot} shadow-lg shadow-${t.dot.split('-')[1]}-500/40 ring-4 ring-white dark:ring-slate-900 flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-110">
                ${c.username.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div class="${isLeft ? 'pr-[52%]' : 'pl-[52%]'}">
              <div class="relative group">
                <div class="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" style="background: radial-gradient(ellipse at center, ${t.dotColor}60, transparent 70%);"></div>
                <div class="relative ${t.card} rounded-2xl p-5 shadow-lg backdrop-blur-xl border-2 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                  <div class="absolute -top-3 ${isLeft ? '-right-3' : '-left-3'} w-6 h-6 rounded-full opacity-60 group-hover:scale-125 transition-transform" style="background: radial-gradient(circle at 30% 30%, white, ${t.dotColor});"></div>
                  
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <span class="font-bold ${t.text}">${c.username}</span>
                      <span class="px-2 py-0.5 rounded-full text-xs backdrop-blur-sm ${t.text} bg-opacity-20" style="background: ${t.dotColor}30;">${badge}</span>
                    </div>
                    <span class="text-xs ${t.text} opacity-50">${formatDate(c.created_at)}</span>
                  </div>
                  
                  <p class="text-slate-700 dark:text-slate-200 leading-relaxed text-sm">${c.content}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
      
      container.innerHTML += `
        <style>
          @keyframes bubbleIn {
            0% { opacity: 0; transform: scale(0.5) translateY(30px); }
            60% { transform: scale(1.05) translateY(-5px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        </style>
      `;
    } else {
      container.innerHTML = `
        <div class="text-center py-10">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/60 dark:bg-slate-800/60 flex items-center justify-center text-3xl" style="box-shadow: 0 4px 20px ${t.dotColor}40;">
            ${t.emoji}
          </div>
          <p class="${t.text} text-sm">暂无评论</p>
        </div>
      `;
    }
  } catch (e) {
    console.error('Load comments error:', e);
    if (container) {
      container.innerHTML = '<p class="text-slate-500 text-center py-8">评论加载失败</p>';
    }
  }
}

// 提交评论
const commentInput = document.getElementById('commentInput');
const commentForm = document.getElementById('commentForm');

commentInput?.addEventListener('input', function() {
  this.classList.remove('!border-red-400', '!ring-2', '!ring-red-300', '!animate-pulse');
  this.placeholder = '写下你的评论...';
});

commentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const content = formData.get('content')?.toString().trim();
  const commentInputEl = document.getElementById('commentInput');
  
  if (!content) {
    commentInputEl.classList.add('!border-red-400', '!ring-2', '!ring-red-300', '!animate-pulse');
    commentInputEl.value = '';
    commentInputEl.placeholder = '请输入评论内容...';
    commentInputEl.focus();
    setTimeout(() => {
      commentInputEl.classList.remove('!border-red-400', '!ring-2', '!ring-red-300', '!animate-pulse');
      commentInputEl.placeholder = '写下你的评论...';
    }, 2000);
    return;
  }
  
  const res = await fetch(`${basePath}/api/comments`, {
    method: 'POST',
    body: formData
  });
  
  if (res.ok) {
    const userStr = sessionStorage.getItem('user');
    e.target.reset();
    if (userStr) {
      const user = JSON.parse(userStr);
      document.getElementById('commentUsername').value = user.username;
    }
    loadComments();
  }
});

// 恢复保存的主题
const savedTheme = sessionStorage.getItem('commentTheme');
if (savedTheme && themes[savedTheme]) {
  setTimeout(() => {
    const btn = document.querySelector(`button[onclick="setCommentTheme('${savedTheme}')"]`);
    if (btn) {
      btn.classList.add('active', 'ring-2', 'ring-offset-2');
      btn.style.setProperty('--tw-ring-color', themes[savedTheme].dotColor);
    }
    window.currentTheme = savedTheme;
    const t = themes[savedTheme];
    
    document.getElementById('commentSection').style.background = t.bg;
    
    const title = document.querySelector('#commentSection h2');
    if (title) title.className = title.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
    
    const count = document.getElementById('commentCount');
    if (count) count.className = count.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
    
    const toggleBtn = document.getElementById('toggleComments');
    if (toggleBtn) toggleBtn.className = toggleBtn.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
    
    document.querySelectorAll('#commentSection button').forEach(b => {
      if (b.id === 'toggleComments') {
        b.className = b.className.replace(/text-\w+-\d+/, '').trim() + ' ' + t.text;
      } else if (b.type === 'submit') {
        b.className = 'px-5 py-2.5 ' + t.button + ' font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm ' + t.buttonText;
      }
    });
    
    document.querySelectorAll('#commentSection a').forEach(a => {
      a.className = 'inline-flex items-center gap-2 px-5 py-2 ' + t.button + ' ' + t.buttonText + ' font-medium rounded-lg hover:shadow-lg transition-all text-sm';
    });
    
    document.querySelectorAll('.bubble').forEach(bubble => {
      bubble.style.background = `radial-gradient(circle, ${t.dotColor}30, transparent)`;
    });
  }, 100);
}

// 初始化加载评论
loadComments();

// 用户认证检查
const userStr = sessionStorage.getItem('user');
const currentUser = userStr ? JSON.parse(userStr) : null;
const loginPrompt = document.getElementById('loginPrompt');

if (currentUser) {
  if (commentForm && document.getElementById('commentUsername')) {
    document.getElementById('commentUsername').value = currentUser.username;
    commentForm.classList.remove('hidden');
  }
  if (loginPrompt) loginPrompt.classList.add('hidden');
} else {
  if (commentForm) commentForm.classList.add('hidden');
  if (loginPrompt) loginPrompt.classList.remove('hidden');
}
```

## 使用说明

### 1. 引入必要依赖

确保页面已引入 Tailwind CSS。

### 2. API 接口

组件依赖以下 API 接口：

- `GET /api/comments?slug={slug}` - 获取评论列表
- `POST /api/comments` - 提交评论（form-data: slug, username, content）

### 3. 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| basePath | string | 站点基础路径（用于 API 请求） |
| slug | string | 教程/文章的 slug（用于关联评论） |
| tutorial.slug | string | 同上，从 Astro 组件传入 |

### 4. 主题配置

可在 `themes` 对象中添加新的主题：

```javascript
myTheme: {
  bg: 'linear-gradient(...)',           // 背景渐变
  dotColor: '#hexcode',                  // 主题色（用于时间线、泡泡等）
  dot: 'from-colorA to-colorB',         // 头像渐变
  button: 'from-A to-B hover:from-C...', // 按钮渐变
  buttonText: 'text-dark dark:text-light', // 按钮文字颜色
  card: 'bg-white/... border-...',     // 卡片样式
  text: 'text-color dark:text-color',  // 文字颜色
  emoji: '🎨'                           // 空状态图标
}
```

## 自定义选项

### 修改泡泡效果

调整泡泡的大小、位置和动画延迟：

```html
<div class="bubble absolute w-32 h-32 rounded-full ... animate-pulse" style="animation-delay: 0.5s;"></div>
```

### 修改时间线

修改 SVG 中的 `d` 属性可以改变藤蔓形状。

### 修改评论称号

在 `badges` 数组中添加或修改称号：

```javascript
const badges = ['称号1', '称号2', ...];
```

## 兼容性

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持深色模式
- 需要 JavaScript 启用
