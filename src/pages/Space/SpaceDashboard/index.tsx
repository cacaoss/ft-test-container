import React from 'react';
import { List, Card, Typography, Space, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './index.less';
import './contextmenu.css';

const { Title, Text } = Typography;

const handleClick = (e: any, data: any) => {
  if (data.action.toLowerCase() === 'addsn') {
    message.info(`${data.name} 添加条码`);
  } else if (data.action.toLowerCase() === 'clear') {
    message.info(`${data.name} 清除库位`);
  }
};

const calcClassName = (item: any) => {
  let className = styles.card;

  if (item.spaceStatu === '就绪') {
    className = `${styles.card} ${styles.ready}`;
  } else if (item.spaceStatu === '测试中') {
    className = `${styles.card} ${styles.running}`;
  } else if (item.spaceStatu === '测试成功') {
    className = `${styles.card} ${styles.pass}`;
  } else if (item.spaceStatu === '测试失败') {
    className = `${styles.card} ${styles.fail}`;
  } else if (item.spaceStatu === '手动禁用' || item.spaceStatu === '程序禁用') {
    className = `${styles.card} ${styles.disable}`;
  }

  if (item.haveBoard) {
    className = `${className} ${styles.haveboard}`;
  }

  return className;
};

const SpaceDashboard: React.FC = () => {
  const resData: {
    spaceName: string;
    isEnable: boolean;
    haveBoard: boolean;
    havePower1: boolean;
    havePower2: boolean;

    locationStatu?: number;
    contralStatu?: number;

    productSn?: string;
    traySn?: string;
    inputTime?: string;
  }[] = [
    {
      spaceName: '仓位1',
      isEnable: true,
      haveBoard: true,
      havePower1: true,
      havePower2: true,

      locationStatu: 1,
      contralStatu: 2,

      productSn: '123',
      traySn: '456',
      inputTime: '2021-01-12 10:30:00',
    },
    {
      spaceName: '仓位2',
      isEnable: true,
      haveBoard: false,
      havePower1: false,
      havePower2: false,
    },
  ];

  return (
    <PageContainer>
      <div className={styles.cardList}>
        {resData ? (
          <List
            rowKey="id"
            grid={{
              gutter: 16,
              column: 3,
            }}
            dataSource={[...resData]}
            renderItem={(item) => {
              if (item && item.spaceName) {
                return (
                  <List.Item key={item.spaceName}>
                    <Card hoverable className={calcClassName(item)} bodyStyle={{ fontSize: 16 }}>
                      <ContextMenuTrigger
                        id={'MENU_RIGHT'}
                        holdToDisplay={-1}
                        collect={(props) => ({ name: props.name })}
                        name={item.spaceName}
                      >
                        <Space direction="vertical" size={1}>
                          <Title level={4}>{item.spaceName}</Title>
                          <Text strong>产品条码：{item.productSn}</Text>
                          <Text strong>托盘条码：{item.traySn}</Text>
                          <Text strong>库位状态：{item.locationStatu}</Text>
                          <Text strong>调度状态：{item.contralStatu}</Text>
                          <Text strong>入库时间：{item.inputTime}</Text>
                        </Space>
                      </ContextMenuTrigger>
                    </Card>
                  </List.Item>
                );
              }
              return null;
            }}
          />
        ) : null}
      </div>
      <ContextMenu id={'MENU_RIGHT'} hideOnLeave={true}>
        <MenuItem onClick={handleClick} data={{ action: 'addSn' }}>
          添加条码
        </MenuItem>
        <MenuItem onClick={handleClick} data={{ action: 'clear' }}>
          清除状态
        </MenuItem>
      </ContextMenu>
    </PageContainer>
  );
};

export default SpaceDashboard;
