import { request } from 'umi';

export async function setSpaceSn(snParams: any) {
  return request('/api/space/SetSpaceSn', {
    method: 'POST',
    data: { ...snParams },
  });
}

export async function setSpaceClear(clearSpaceName: any) {
  return request('/api/space/SetSpaceClear', {
    method: 'POST',
    data: { spaceName: clearSpaceName },
  });
}
