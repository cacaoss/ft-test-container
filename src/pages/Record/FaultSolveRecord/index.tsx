import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import type { FaultSolveRecordListItem } from './data.d';
import { queryRule } from './service';

const FaultSolveRecord: React.FC = () => {
  const columns: ProColumns<FaultSolveRecordListItem>[] = [
    {
      title: '操作人',
      dataIndex: 'faultUser',
      valueType: 'text',
    },
    {
      title: '操作内容',
      dataIndex: 'faultOperation',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      valueType: 'text',
      sorter: true,
      sortDirections: ['descend'],
      search: false,
    },
    {
      title: '日期区间',
      dataIndex: 'recordTimeRange',
      valueType: 'dateRange',
      search: {
        transform: (fields) => {
          return {
            startTime: fields[0],
            endTime: fields[1],
          };
        },
      },
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<FaultSolveRecordListItem>
        headerTitle={'操作记录'}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default FaultSolveRecord;
