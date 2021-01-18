import { request } from 'umi';

export async function querySpaceList(searchSpaceName: string) {
  return await request('/api/space/GetSpaceList', {
    params: {
      spaceName: searchSpaceName,
    },
  });
}
