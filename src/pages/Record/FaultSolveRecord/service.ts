import { request } from 'umi';
import type { FaultSolveRecordParams } from './data.d';

export async function queryRule(params?: FaultSolveRecordParams) {
  return request('/api/fault/GetFaultSolveRecordList', {
    method: 'POST',
    data: { ...params },
  });
}
