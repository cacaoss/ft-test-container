import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

import type { UserListItem } from '../data.d';

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: Partial<UserListItem>) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<UserListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, onSubmit, updateModalVisible, values } = props;

  return (
    <Modal
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        name="basic"
        initialValues={{
          userName: values.userName,
        }}
        onFinish={(newValues) => onSubmit({ ...values, ...newValues })}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="userPassword"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
