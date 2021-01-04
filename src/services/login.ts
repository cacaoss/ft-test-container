import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/login/login', {
    method: 'POST',
    data: params,
  });
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
