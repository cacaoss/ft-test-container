import React from 'react';
import { Input, List, Card, Tag, Typography, Space, message } from 'antd';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-layout';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { querySpaceList, setSpaceClear, setSpaceSn } from './service';
import styles from './index.less';
import './contextmenu.css';
import InputDialog from './components/InputDialog';

const { Title, Text } = Typography;
const handleClick = async (e: any, data: any) => {
  const spaceName = data.name;
  if (data.action.toLowerCase() === 'clear') {
    try {
      await setSpaceClear(spaceName);
      message.success(`${spaceName} 清除库位状态成功`);
    } catch {
      message.error(`${spaceName} 清除库位状态失败`);
    }
  }
};
const calcClassName = (item: any) => {
  let className = styles.card;

  if (item.locationStatu === '就绪') {
    className = `${styles.card} ${styles.ready}`;
  } else if (item.locationStatu === '测试中') {
    className = `${styles.card} ${styles.running}`;
  } else if (item.locationStatu === '测试成功') {
    className = `${styles.card} ${styles.pass}`;
  } else if (item.locationStatu === '测试失败') {
    className = `${styles.card} ${styles.fail}`;
  } else if (item.locationStatu === '手动禁用' || item.locationStatu === '自动锁仓') {
    className = `${styles.card} ${styles.disable}`;
  }

  if (item.haveBoard) {
    className = `${className} ${styles.haveboard}`;
  }

  return className;
};

const CardTitle: React.FC<{ title: string }> = (props) => {
  const { title } = props;
  return (
    <Title level={3} style={{ color: 'black' }}>
      {title}
    </Title>
  );
};
const CardExtra: React.FC<{ haveBoard: boolean; havePower1: boolean; havePower2: boolean }> = (
  props,
) => {
  const { haveBoard, havePower1, havePower2 } = props;
  return (
    <>
      {haveBoard ? (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          库位有板
        </Tag>
      ) : (
        <Tag color="#bbb" icon={<MinusCircleOutlined />}>
          库位无板
        </Tag>
      )}
      {havePower1 ? (
        <Tag color="warning" icon={<ExclamationCircleOutlined />}>
          通电-1
        </Tag>
      ) : (
        <Tag color="#bbb" icon={<MinusCircleOutlined />}>
          断电-1
        </Tag>
      )}
      {havePower2 ? (
        <Tag color="warning" icon={<ExclamationCircleOutlined />}>
          通电-2
        </Tag>
      ) : (
        <Tag color="#bbb" icon={<MinusCircleOutlined />}>
          断电-2
        </Tag>
      )}
    </>
  );
};

const SpaceDashboard: React.FC = () => {
  const [inputDialogVisible, setInputDialogVisible] = React.useState<boolean>(false);
  const [inputSpaceName, setInputSpaceName] = React.useState<string>('');
  const [resData, setResData] = React.useState<any>(null);
  const searchSpaceName = React.useRef<string>('');

  const handleSearchSubmit = async (value: string) => {
    searchSpaceName.current = value;
    console.log(value);
  };
  const handleAddSnSubmit = async (values: {
    spaceName: string;
    productSn: string;
    tarySn: string;
  }) => {
    try {
      await setSpaceSn(values);
      message.success(`${values.spaceName} 库位添加条码成功`);
    } catch {
      message.error(`${values.spaceName} 库位添加条码失败`);
    }
  };

  const mainSearch = (
    <div style={{ textAlign: 'right' }}>
      <Input.Search
        placeholder="请输入库位名"
        enterButton="搜索"
        size="middle"
        onSearch={handleSearchSubmit}
        style={{ maxWidth: 300, width: '100%' }}
      />
    </div>
  );

  React.useEffect(() => {
    const timerId = setInterval(async () => {
      try {
        const response = await querySpaceList(searchSpaceName.current);
        if (response.success) {
          setResData(response.data);
          return;
        }
        clearInterval(timerId);
        setResData(null);
      } catch {
        console.log('关闭');
        clearInterval(timerId);
        setResData(null);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <PageContainer content={mainSearch}>
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
                    <Card
                      hoverable
                      className={calcClassName(item)}
                      bodyStyle={{ fontSize: 16 }}
                      title={<CardTitle title={item.spaceName} />}
                      extra={
                        <CardExtra
                          haveBoard={item.haveBoard}
                          havePower1={item.havePower1}
                          havePower2={item.havePower2}
                        />
                      }
                      onClick={() => {
                        if (!item.productSn) {
                          setInputSpaceName(item.spaceName);
                          setInputDialogVisible(true);
                        }
                      }}
                    >
                      <ContextMenuTrigger
                        id={'MENU_RIGHT'}
                        holdToDisplay={-1}
                        collect={(props) => ({ name: props.name })}
                        {...{ name: item.spaceName }}
                      >
                        <Space direction="vertical" size={5}>
                          <Text strong>产品条码：{item.productSn}</Text>
                          <Text strong>托盘条码：{item.traySn}</Text>
                          <Text strong>库位状态：{item.locationStatu}</Text>
                          <Text strong>调度状态：{item.locationControlStatu}</Text>
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
      <ContextMenu id={'MENU_RIGHT'}>
        <MenuItem onClick={handleClick} data={{ action: 'clear' }}>
          清除状态
        </MenuItem>
      </ContextMenu>
      <InputDialog
        value={inputSpaceName}
        inputDialogVisible={inputDialogVisible}
        onCancel={() => {
          setInputDialogVisible(false);
        }}
        onSubmit={async (values) => {
          setInputDialogVisible(false);
          handleAddSnSubmit({ spaceName: inputSpaceName, ...values });
        }}
      ></InputDialog>
    </PageContainer>
  );
};

export default SpaceDashboard;
