import React from 'react';
import { Modal } from 'antd';

export type CreateFormProps = {
  onCancel: () => void;
  createModalVisible: boolean;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={createModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
