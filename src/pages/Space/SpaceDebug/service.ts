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

export async function SetLightValue(params: any) {
  return request('/api/debug/SetLightValue', {
    method: 'POST',
    data: { ...params },
  });
}

export async function SetMoveSpace(params: any) {
  return request('/api/debug/MoveSpace', {
    method: 'POST',
    data: { ...params },
  });
}

export async function SetManualSpace(params: any) {
  return request('/api/debug/ManualSpace', {
    method: 'POST',
    data: { ...params },
  });
}
