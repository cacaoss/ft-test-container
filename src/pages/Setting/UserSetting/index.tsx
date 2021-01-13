import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import type { UserListItem } from './data.d';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

import { queryRule, updateRule, addRule, removeRule } from './service';

const handleAdd = async (fields: UserListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
const handleUpdate = async (fields: Partial<UserListItem>) => {
  const hide = message.loading('正在修改');

  try {
    await updateRule({
      userName: fields.userName,
      userPassword: fields.userPassword,
      key: fields.key,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};
const handleRemove = async (record: UserListItem) => {
  const hide = message.loading('正在删除');

  try {
    await removeRule({
      key: record.key,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败请重试！');
    return false;
  }
};

const UserSetting: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<UserListItem>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '用户角色',
      dataIndex: 'userLevel',
      valueType: 'text',
      search: false,
      valueEnum: {
        '0': {
          text: '管理员',
          status: 'Success',
        },
        '1': {
          text: '操作员',
          status: 'Processing',
        },
      },
    },
    {
      title: '用户密码',
      dataIndex: 'userPassword',
      valueType: 'password',
      search: false,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            await handleRemove(record);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleCreateModalVisible(false)}
        createModalVisible={createModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value as UserListItem);

            if (success) {
              handleCreateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default UserSetting;
