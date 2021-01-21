export type FaultSolveRecordParams = {
  faultUser?: string;
  startTime?: string;
  endTime?: string;

  pageSize?: number;
  current?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type FaultSolveRecordListItem = {
  key: number;
  faultUser: string;
  faultOperation: string;
  createTime: string;
};
