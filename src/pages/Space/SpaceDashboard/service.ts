import { request } from 'umi';

export async function querySpaceList(searchSpaceName: string) {
  return await request('/api/space/GetSpaceList', {
    params: {
      spaceName: searchSpaceName,
    },
  });
}

export async function setSpaceSn(snParams: any) {
  return request<API.LoginStateType>('/api/space/SetSpaceSn', {
    method: 'POST',
    data: { ...snParams },
  });
}

export async function setSpaceClear(clearSpaceName: any) {
  return request<API.LoginStateType>('/api/space/SetSpaceClear', {
    method: 'POST',
    data: { spaceName: clearSpaceName },
  });
}
