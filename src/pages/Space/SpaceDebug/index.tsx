import React from 'react';
import { Form, Card, Row, Col, Input, Button, Select, Radio, message } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { querySpaceList } from '@/services/space';
import { queryDistance, SetPowerStatu, SetLightValue, SetManualSpace } from './service';
import styles from './index.less';

const DistanceDebug: React.FC = () => {
  const [form] = Form.useForm();

  const handleQueryDistance = async () => {
    try {
      const response = await queryDistance();
      if (response.success) {
        message.success('查询距离成功');
      }
      form.setFieldsValue({ distance1: response.distance1, distance2: response.distance2 });
    } catch {
      message.error('查询距离失败');
      form.setFieldsValue({ distance1: 0, distance2: 0 });
    }
  };

  return (
    <Form form={form} layout={'horizontal'} initialValues={{ distance1: 0, distance2: 0 }}>
      <Card title="测距调试" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item label={'巷道外测距距离'} name="distance1">
              <Input readOnly addonAfter="mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'巷道内测距距离'} name="distance2">
              <Input readOnly addonAfter="mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={handleQueryDistance}>
              查询
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
const PowerDebug: React.FC<{ options: any }> = (props) => {
  const [form] = Form.useForm();
  const { options } = props;

  const handlePowerStatu = async (params: {
    spaceName: string;
    powerIndex: string;
    powerStatu: boolean;
  }) => {
    const operationText = params.powerStatu ? `上电` : '断电';

    try {
      await form.validateFields();
      const response = await SetPowerStatu(params);
      if (response.success) {
        message.success(`设置库位【${params.spaceName}】【${operationText}】成功`);
      }
    } catch {
      message.error(`设置库位【${params.spaceName}】【${operationText}】失败`);
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      layout={'horizontal'}
      initialValues={{ powerIndex: '11' }}
    >
      <Card title="供电调试" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item
              labelAlign={'left'}
              label={'请选择一个库位'}
              name="spaceName"
              rules={[{ required: true, message: '请选择一个库位' }]}
            >
              <Select placeholder="请选一个库位" showSearch allowClear options={options}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'请选择电源端口'} name="powerIndex">
              <Radio.Group>
                <Radio value="11">所有电源口</Radio>
                <Radio value="10">1号电源口</Radio>
                <Radio value="01">2号电源口</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                const spaceName = form?.getFieldValue('spaceName');
                const powerIndex = form?.getFieldValue('powerIndex');
                handlePowerStatu({
                  spaceName,
                  powerIndex,
                  powerStatu: true,
                });
              }}
            >
              通电
            </Button>
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Button
              type="primary"
              onClick={() => {
                const spaceName = form?.getFieldValue('spaceName');
                const powerIndex = form?.getFieldValue('powerIndex');
                handlePowerStatu({
                  spaceName,
                  powerIndex,
                  powerStatu: false,
                });
              }}
            >
              断电
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
const LightDebug: React.FC = () => {
  const [form] = Form.useForm();

  const handleSetLightValue = async (params: { lightValue: string; lightIndex: string }) => {
    try {
      await form.validateFields();
      const response = await SetLightValue(params);
      if (response.success) {
        message.success(`设置光源亮度成功`);
      }
    } catch {
      message.error(`设置光源亮度失败`);
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      layout={'horizontal'}
      initialValues={{ lightValue: 10, lightIndex: '0' }}
    >
      <Card title="光源调试" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item
              label={'光亮值'}
              name="lightValue"
              rules={[{ required: true, message: '请输入光亮值 [0-255]' }]}
            >
              <Input placeholder="请输入光亮值 [0-255]" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'选择光源'} name="lightIndex">
              <Radio.Group>
                <Radio value="0">所有光源</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                const lightValue = form?.getFieldValue('lightValue');
                const lightIndex = form?.getFieldValue('lightIndex');
                handleSetLightValue({
                  lightValue,
                  lightIndex,
                });
              }}
            >
              设置
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
/*
const MoveSpace: React.FC<{ options: any }> = (props) => {
  const [form] = Form.useForm();
  const { options } = props;

  const handleMoveSpace = async (params: { originSpaceName: string; destSpaceName: string }) => {
    try {
      await form.validateFields();
      const response = await SetMoveSpace(params);
      if (response.success) {
        message.success(`移动库位成功`);
      }
    } catch {
      message.error(`移动库位失败`);
    }
  };

  return (
    <Form requiredMark={false} form={form} layout={'horizontal'}>
      <Card title="库位移动" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item
              label={'选择起始库位'}
              name="originSpaceName"
              rules={[{ required: true, message: '请选择一个库位' }]}
            >
              <Select placeholder="请选一个库位" showSearch allowClear options={options}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={'选择目的库位'}
              name="destSpaceName"
              rules={[{ required: true, message: '请选择一个库位' }]}
            >
              <Select placeholder="请选一个库位" showSearch allowClear options={options}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                const originSpaceName = form?.getFieldValue('originSpaceName');
                const destSpaceName = form?.getFieldValue('destSpaceName');
                handleMoveSpace({
                  originSpaceName,
                  destSpaceName,
                });
              }}
            >
              移动
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
*/
const ManualSpace: React.FC<{ options: any }> = (props) => {
  const [form] = Form.useForm();
  const { options } = props;

  const handleManualSpace = async (params: { spaceName: string; statu: boolean }) => {
    try {
      await form.validateFields();
      const response = await SetManualSpace(params);
      if (response.success) {
        message.success(`手动设置库位成功`);
      }
    } catch {
      message.error(`手动设置库位失败`);
    }
  };

  return (
    <Form requiredMark={false} form={form} layout={'horizontal'}>
      <Card title="手动设置库位状态" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item
              label={'选择库位'}
              name="spaceName"
              rules={[{ required: true, message: '请选择一个库位' }]}
            >
              <Select placeholder="请选一个库位" showSearch allowClear options={options}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                const spaceName = form?.getFieldValue('spaceName');
                handleManualSpace({
                  spaceName,
                  statu: true,
                });
              }}
            >
              设置为通过
            </Button>
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Button
              type="primary"
              onClick={() => {
                const spaceName = form?.getFieldValue('spaceName');
                handleManualSpace({
                  spaceName,
                  statu: false,
                });
              }}
            >
              设置为失败
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

const SpaceDebug: React.FC = () => {
  const [options, setOptions] = React.useState<any>([]);

  const getSpaceList = async () => {
    try {
      const response = await querySpaceList('');
      if (response.success) {
        setOptions(
          response.data.map((item: any) => {
            return {
              title: item.spaceName,
              value: item.spaceName,
            };
          }),
        );
      }
    } catch {
      setOptions(null);
    }
  };

  React.useEffect(() => {
    getSpaceList();
  }, []);

  return (
    <PageContainer>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <DistanceDebug />
        </Col>
        <Col span={8}>
          <PowerDebug options={options} />
        </Col>
        <Col span={8}>
          <LightDebug />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <ManualSpace options={options} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SpaceDebug;
