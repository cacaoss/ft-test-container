import { request } from 'umi';

export async function querySpaceList(searchSpaceName: string) {
  return request('/api/space/GetSpaceList', {
    params: {
      spaceName: searchSpaceName,
    },
  });
}
