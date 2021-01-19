import { request } from 'umi';

export async function queryDistance() {
  return request('/api/debug/GetDistance');
}

export async function SetPowerStatu(params: any) {
  return request('/api/debug/SetPowerStatu', {
    method: 'POST',
    data: { ...params },
  });
}
