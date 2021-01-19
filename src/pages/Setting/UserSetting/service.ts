import { request } from 'umi';
import type { UserListParams } from './data.d';

export async function queryRule(params: UserListParams) {
  return request('/api/user/GetUserList', {
    params,
  });
}

export async function addRule(params: UserListParams) {
  return request('/api/user/AddUser', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateRule(params: UserListParams) {
  return request('/api/user/UpdateUser', {
    method: 'POST',
    data: { ...params },
  });
}

export async function removeRule(params: UserListParams) {
  return request('/api/user/DeleteUser', {
    method: 'POST',
    data: { ...params },
  });
}
