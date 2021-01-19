import React from 'react';
import { Modal, Form, Input } from 'antd';

type InputDialogProps = {
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  value: string;
  inputDialogVisible: boolean;
};

const InputDialog: React.FC<InputDialogProps> = (props) => {
  const { onCancel, onSubmit, inputDialogVisible, value } = props;
  const refTraySnInput = React.useRef<any>(null);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleOk = async () => {
    try {
      const productSn = form.getFieldValue('productSn');
      const traySn = form.getFieldValue('traySn');
      await form.validateFields();

      form.resetFields();
      onSubmit({ value, productSn, traySn });
    } catch {
      console.log('');
    }
  };

  const onProductSnEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refTraySnInput.current!.focus();
    }
  };
  const onTraySnEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOk();
    }
  };

  return (
    <Modal
      title="扫描提示框"
      destroyOnClose
      centered
      closable={false}
      maskClosable={false}
      visible={inputDialogVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{
          productSn: '',
          traySn: '',
        }}
      >
        <Form.Item
          label="产品条码"
          {...formItemLayout}
          name="productSn"
          rules={[{ required: true, message: '产品条码不能为空' }]}
        >
          <Input
            placeholder="请输入产品条码"
            autoComplete="off"
            autoFocus={true}
            onPressEnter={onProductSnEnterHandle}
          />
        </Form.Item>
        <Form.Item
          label="托盘条码"
          {...formItemLayout}
          name="traySn"
          rules={[{ required: true, message: '托盘条码不能为空' }]}
        >
          <Input
            ref={refTraySnInput}
            placeholder="请输入托盘条码"
            autoComplete="off"
            onPressEnter={onTraySnEnterHandle}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InputDialog;
