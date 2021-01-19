import React from 'react';
import { Form, Card, Row, Col, Input, Button, Select, Radio, Space, message } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { querySpaceList } from '@/services/space';
import { queryDistance, SetPowerStatu } from './service';
import styles from './index.less';

const DistanceDebug: React.FC = () => {
  const [form] = Form.useForm();

  const handleQueryDistance = async () => {
    try {
      const response = await queryDistance();
      if (response.success) {
        message.success('查询距离成功');
      }

      form.setFieldsValue({ distance1: 10, distance2: 20 });
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
            <Form.Item label={'巷道内测距距离'} name="distance1">
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
          <Col span={24}>
            <Button type="primary" onClick={handleQueryDistance}>
              查询
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
const PowerDebug: React.FC = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = React.useState<any>([]);

  const handlePowerStatu = async (params: {
    spaceName: string;
    powerIndex: string;
    powerStatu: boolean;
  }) => {
    const operationText = params.powerStatu ? `上电` : '断电';

    try {
      const response = await SetPowerStatu(params);
      if (response.success) {
        message.success(`设置库位【${params.spaceName}】【${operationText}】成功`);
      }
    } catch {
      message.error(`设置库位【${params.spaceName}】【${operationText}】失败`);
    }
  };
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
    <Form form={form} layout={'horizontal'} initialValues={{ powerIndex: '0' }}>
      <Card title="供电调试" className={styles.card}>
        <Row>
          <Col span={24}>
            <Form.Item label={'请选择一个库位'} name="spaceName">
              <Select placeholder="请选一个库位" showSearch allowClear options={options}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'请选择电源端口'} name="powerIndex">
              <Radio.Group>
                <Radio value="0">所有电源口</Radio>
                <Radio value="1">1号电源口</Radio>
                <Radio value="2">2号电源口</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
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
          <Col span={4} style={{ marginLeft: 20 }}>
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

const SpaceDebug: React.FC = () => {
  return (
    <PageContainer>
      <Space direction={'horizontal'}>
        <DistanceDebug />
        <PowerDebug />
      </Space>
    </PageContainer>
  );
};

export default SpaceDebug;
