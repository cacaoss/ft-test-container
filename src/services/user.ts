import { request } from 'umi';

export async function queryCurrentUser() {
  return request<API.CurrentUser>('/api/user/getCurrentUser');
}

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
