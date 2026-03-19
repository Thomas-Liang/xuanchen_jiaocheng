export const AVATAR_CONFIG = {
  maxSize: 2 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  defaultAvatar: '/avatars/default.svg',
  avatarSize: 500,
};

export function getAvatarUrl(username: string, avatar: string | null | undefined): string {
  if (avatar && avatar.startsWith('/')) {
    return avatar;
  }
  if (avatar && (avatar.startsWith('http://') || avatar.startsWith('https://'))) {
    return avatar;
  }
  return AVATAR_CONFIG.defaultAvatar;
}

export function generateAvatarFilename(username: string): string {
  const timestamp = Date.now();
  return `avatar-${username}-${timestamp}.webp`;
}

export function validateImageType(type: string): boolean {
  return AVATAR_CONFIG.allowedTypes.includes(type);
}

export function validateImageSize(size: number): boolean {
  return size <= AVATAR_CONFIG.maxSize;
}
