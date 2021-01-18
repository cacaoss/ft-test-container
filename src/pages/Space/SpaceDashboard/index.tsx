import React from 'react';
import { Input, List, Card, Typography, Space, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { querySpaceList } from './service';
import styles from './index.less';
import './contextmenu.css';
import InputDialog from './components/InputDialog';

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
  const [inputDialogVisible, setInputDialogVisible] = React.useState<boolean>(false);
  const [inputSpaceName, setInputSpaceName] = React.useState<string>('');
  const [resData, setResData] = React.useState<any>(null);
  const searchSpaceName = React.useRef<string>('');

  const handleFormSubmit = (value: string) => {
    searchSpaceName.current = value;
    console.log(value);
  };

  const mainSearch = (
    <div style={{ textAlign: 'right' }}>
      <Input.Search
        placeholder="请输入库位名"
        enterButton="搜索"
        size="middle"
        onSearch={handleFormSubmit}
        style={{ maxWidth: 300, width: '100%' }}
      />
    </div>
  );

  React.useEffect(() => {
    const timerId = setInterval(async () => {
      const response = await querySpaceList(searchSpaceName.current);
      if (response.success) {
        setResData(response.data);
        return;
      }
      setResData(null);
      clearInterval(timerId);
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
                      onClick={() => {
                        if (true) {
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
      <InputDialog
        value={inputSpaceName}
        inputDialogVisible={inputDialogVisible}
        onCancel={() => {
          setInputDialogVisible(false);
        }}
        onSubmit={async (values) => {
          setInputDialogVisible(false);
          console.log('values', values);
        }}
      ></InputDialog>
    </PageContainer>
  );
};

export default SpaceDashboard;
